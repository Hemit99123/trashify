export interface StateObjProps {
    bin?: "garbage" | "recycling" | "compost";
    title?: string;
    latitude?: string; 
    longtitude?: string; 
    photo?: string | ArrayBuffer | null;
}

// Reusing the StateObjProps but changing it for my speific use case through the use of TypeScript transformers (OMIT)
export interface ItemsProp extends Omit<StateObjProps, 'photo' /* Delete photo key */> {
  /* Add photo key back with new type */
  photo: string;
  userId: string;
}
