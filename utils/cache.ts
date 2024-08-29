import axios from 'axios';
import { Session } from '@auth0/nextjs-auth0';
import { memcached, CACHE_CITY_EXPIRES, CACHE_BOUNDS_EXPIRES } from './memcached';
import { sanitizeKey } from './helper';

// Utility function to get data from Memcached
const getFromCache = (key: string): Promise<string | null> => {
    key = sanitizeKey(key);
    return new Promise((resolve, reject) => {
        memcached.get(key, (err, data) => {
            if (err) {
                reject(err); // Reject the promise with the error
            } else {
                resolve(data); // Resolve the promise with the data
            }
        });
    });
};

// Utility function to set data to Memcached
const setToCache = (key: string, value: string, expires: number): Promise<void> => {
    if (value === undefined || value === null) {
        return Promise.reject(new Error('Cannot cache undefined or null value'));
    }
    key = sanitizeKey(key);
    return new Promise((resolve, reject) => {
        memcached.set(key, value, expires, (err) => {
            if (err) {
                console.error('Error adding to cache:', err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Fetch city data and cache it in memcached
const fetchAndCacheCity = async (email: string, lat: string, long: string): Promise<string | Error> => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                latlng: `${lat},${long}`,
                key: process.env.GOOGLE_API_KEY
            }
        });
        const results = response.data.results;

        if (results.length === 0) {
            return new Error("No results found");
        }

        // Find the locality type 
        const localityComponent = results[0].address_components.find((component: { types: string[]; long_name: string; }) =>
            component.types.includes("locality") && component.long_name
        );

        if (!localityComponent) {
            return new Error("Couldn't find the city");
        }

        // Cache the locality and return the result
        await setToCache(`${email}:city`, localityComponent.long_name, CACHE_CITY_EXPIRES);
        return localityComponent.long_name;

    } catch (error: any) {
        console.error('Error fetching city data from API:', error.message);
        return new Error('Error fetching city data from API');
    }
};

// Fetch bounds data and cache it
const fetchAndCacheBounds = async (city: string): Promise<void> => {
    try {
        const boundsResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: city,
                    key: process.env.GOOGLE_API_KEY
                }
            }
        );

        const bounds = boundsResponse.data.results[0]?.geometry?.bounds;
        if (!bounds) {
            throw new Error('Bounds not found');
        }

        // Cache bounds data
        await setToCache(`${city}:bounds`, JSON.stringify(bounds), CACHE_BOUNDS_EXPIRES);
    } catch (error: any) {
        console.error('Error fetching bounds data from API:', error.message);
        throw error;
    }
};

// Main function to handle city lookup and caching
export const helperCacheFunctionCity = async (lat: string, long: string, session: Session | null | undefined): Promise<string | Error> => {
    const email = session?.user?.email;

    if (!email) {
        throw new Error('User email is not available in session');
    }

    try {
        // Check cache for city
        let city = await getFromCache(`${email}:city`);
        if (!city) {
            // Fetch and cache city data if not available in cache
            const newCity = await fetchAndCacheCity(email, lat, long);
            if (newCity instanceof Error) {
                throw newCity; // Propagate the error if needed
            }
            city = newCity;
        }

        // Check cache for bounds
        let cachedBounds = await getFromCache(`${city}:bounds`);
        if (!cachedBounds) {
            // Fetch and cache bounds data if not available in cache
            await fetchAndCacheBounds(city);
            cachedBounds = await getFromCache(`${city}:bounds`); // Re-check cache after setting
        }

        // Check if the coordinates (lat and long) are within the bounds of the city
        const isCoordinateInBBox = (lat: number, long: number, bbox: any) => {
            return (
                lat >= bbox.southwest.lat &&
                lat <= bbox.northeast.lat &&
                long >= bbox.southwest.lng &&
                long <= bbox.northeast.lng
            );
        };

        const isInside = isCoordinateInBBox(parseFloat(lat), parseFloat(long), JSON.parse(cachedBounds || ""));

        if (isInside) {
            return city;
        } else {
            // Re-fetch and cache city data if coordinates are not inside bounds
            const newCity = await fetchAndCacheCity(email, lat, long);
            if (newCity instanceof Error) {
                throw newCity; // Propagate the error if needed
            }
            return newCity;
        }
    } catch (error: any) {
        console.error('Error in helperCacheFunctionCity:', error.message);
        throw error;
    }
};
