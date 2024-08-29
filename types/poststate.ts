// Defined based interface to be used by Zustand for state management between inter-components!

export interface StateObjProps {
  bin?: "garbage" | "recycling" | "compost";
  title?: string;
  photo?: string | ArrayBuffer | null;
  setBin: (binType: 'garbage' | 'recycling' | 'compost') => void;
  latitude: number | undefined;
  longitude: number | undefined;
  setTitle: (title: string) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setPhoto: (photo: string | ArrayBuffer | null) => void;
}

export interface StateObjPropsCut extends Omit<StateObjProps, 'photo' | 'setBin' | 'setTitle' | 'setLatitude' | 'setLongitude' | 'setPhoto'> {
  map(arg0: (item: ItemsProp, index: import("react").Key | null | undefined) => import("react").JSX.Element): import("react").ReactNode;
  id: string;
  userId: string;
  city: string;
  photo: string;
  coor: [number, number] | undefined;
}

export interface ItemsProp extends Omit<StateObjProps, 'photo' | 'setBin' | 'setTitle' | 'setLatitude' | 'setLongitude' | 'setPhoto'> {
  id: string;
  userId: string;
  city: string;
  photo: string;
  coor: [number, number] | undefined; // Ensure it contains exactly two numbers or is undefined
}

export interface ExtendedStateObjProps extends Omit<StateObjProps, 'photo' | 'setPhoto'> {
  userId: string;
  photo: string;
  setPhoto: (photo: string) => void;
  setUserId: (data: string) => void;
  photoBuffer: string | ArrayBuffer | null;
  setPhotoBuffer: (photoBuffer: string | ArrayBuffer | null) => void;
  imagePublicID: string;
  setImagePublicID: (imagePublicID: string) => void;
}


