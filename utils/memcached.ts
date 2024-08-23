import Memcached from 'memcached';
import crypto from 'crypto';
import axios from 'axios';
import { cookies } from 'next/headers';

const memcached = new Memcached('localhost:11211');
const CACHE_EXPIRES = 60 * 60; // Cache expiration time in 3600 seconds (1 hour)

export const helperCacheFunctionCity = async () => {
    const cookieStore = cookies();
    const appSessionCookie = cookieStore.get('appSession');
    const appSession = appSessionCookie && typeof appSessionCookie === 'string' ? appSessionCookie : "";
    const accessTokenHash = crypto.createHash('sha256').update(appSession).digest('hex');

    // Creating a promise that should return the city name if no errors from either DB or cache
    return new Promise<string>(async (resolve, reject) => {
        memcached.get(`${accessTokenHash}:city`, async (err, data) => {
            if (err) {
                reject(err);
            } else if (data) {
                resolve(data);
            } else {
                try {
                    const ipResponse = await axios.get('https://api.ipify.org?format=json');
                    const ip = ipResponse.data.ip;
                    const geoResponse = await axios.get(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`);
                    const city = geoResponse.data.city;
                    memcached.add(`${accessTokenHash}:city`, city, CACHE_EXPIRES, () => {});
                    resolve(city);
                } catch (error) {
                    reject(error);
                }
            }
        });
    });
};
