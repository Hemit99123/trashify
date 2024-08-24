import Memcached from 'memcached';
    import axios from 'axios';
import { getSession } from '@auth0/nextjs-auth0';

const memcached = new Memcached('localhost:11211');
const CACHE_EXPIRES = 60 * 60; // Cache expiration time in 3600 seconds (1 hour)

export const helperCacheFunctionCity = async (): Promise<string> => {
    let city = '';
    const session = await getSession()
    const email = session?.user.email

    try {
        // Check cache
        const cachedData = new Promise<string | null>((resolve, reject) => {
            memcached.get(`${email}:city`, (err, data) => {
                if (err) {
                    console.error('Error fetching from cache:', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        await cachedData
            .then((result) => {
                return result
            })

            .catch((error) => {
                return error
            })

        // Fetch from API
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const ip = ipResponse.data.ip;
        const geoResponse = await axios.get(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`);
        let city = geoResponse.data.city;

        // Cache the result
        await new Promise<void>((resolve, reject) => {
            memcached.set(`${email}:city`, city, CACHE_EXPIRES, (err) => {
                if (err) {
                    console.error('Error adding to cache:', err);
                    reject(new Error(`Failed to add cache: ${err.message}`));
                } else {
                    resolve();
                }
            });
        });

        return city;
    } catch (error) {
        console.error('Error in helperCacheFunctionCity:', error);
        throw error;
    }
};
