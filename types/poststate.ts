// Example adjustment for StateObjProps
interface StateObjProps {
    bin?: "garbage" | "recycling" | "compost";
    title?: string;
    latitude?: string; // Change to string if you want to store it as a string
    longtitude?: string; // Change to string if you want to store it as a string
    photo?: string | ArrayBuffer | null;
    city: string | undefined;
  }

export default StateObjProps