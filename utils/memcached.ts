import Memcached from "memcached";

export const memcached = new Memcached('localhost:11211');
export const CACHE_CITY_EXPIRES = 60 * 60; // Cache expiration time in 3600 seconds (1 hour)
export const CACHE_BOUNDS_EXPIRES = 60*60*24*30 // Same logic but for a longer time period of 30 days (expressed in days for most accuracy)