import dynamic from 'next/dynamic'; // Import dynamic if using Next.js or similar framework

export const sanitizeKey = (key: string): string => key.replace(/\s+/g, '_').trim();

export const TYPEOF_STRING_ERROR_MESSAGE = "Invalid string value";

// Dynamically import the Leaflet icon on the client side
const customIcon = dynamic(
  () => import('leaflet').then((module) =>
    module.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    })
  ),
  { ssr: false } // Disable server-side rendering for this module
);

export { customIcon };
