// Defined based interface to be used by Zustand for state management between inter-components!

export interface StateObjProps {
  bin?: "garbage" | "recycling" | "compost";
  title?: string;
  latitude?: string; 
  longitude?: string; 
  photo?: string | ArrayBuffer | null;
  setBin: (binType: 'garbage' | 'recycling' | 'compost') => void;
  setTitle: (title: string) => void;
  setLatitude: (latitude: string) => void;
  setLongitude: (longitude: string) => void;
  setPhoto: (photo: string | ArrayBuffer | null) => void;
}


// Reusing the StateObjProps but changing it for my speific use case through the use of TypeScript transformers (OMIT -> deleting types from interface)
export interface ItemsProp extends Omit<StateObjProps, 'photo' /* Delete photo key */> {
  /* Add photo key back with new type */
  id: string;
  photo: string;
  userId: string;
  city: string;
}