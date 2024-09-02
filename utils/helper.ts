// Removing whitespaces from the key-value pair in the memcached server

export const sanitizeKey = (key: string): string => key.replace(/\s+/g, '_').trim();

export const TYPEOF_STRING_ERROR_MESSAGE = "Invalid string value";

export const NAV_ITEMS = [
  {title: "Home", target_path: "/"},
  {title: "Post", target_path: "/post"},
  {title: "Manage", target_path:"/manage"},
  {title: "Nearest Bin", target_path:"/nearest-location"}
]