// We are "sanitizing" the key by removing whitespaces which might be resulted within the GCP API (GOOGLE MAPS)

export const sanitizeKey = (key: string): string => key.replace(/\s+/g, '_').trim();