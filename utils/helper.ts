const sanitizeKey = (key: string): string => key.replace(/\s+/g, '_').trim();

export const TYPEOF_STRING_ERROR_MESSAGE = "Invalid string value";

export const NAV_ITEMS = [
  {title: "Home", target_path: "/"},
  {title: "Post", target_path: "/post"},
  {title: "Manage", target_path:"/manage"},
  {title: "Nearest Bin", target_path:"/nearest-location"}
]

const TYPEOF_STRING_ERROR_MESSAGE = "Invalid string value";

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

export { sanitizeKey, TYPEOF_STRING_ERROR_MESSAGE, customIcon };
