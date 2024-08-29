import { create } from 'zustand';
import { ExtendedStateObjProps } from '@/types/PostState';

const useUpdateStore = create<ExtendedStateObjProps>((set) => ({
    bin: undefined,
    setBin: (binType: "garbage" | "recycling" | "compost") => set({ bin: binType }),

    title: "",
    setTitle: (title: string) => set({ title }),

    photoBuffer: null,  
    setPhotoBuffer: (photoBuffer: string | ArrayBuffer | null) => set({ photoBuffer }),

    photo: "",
    setPhoto: (photo: string) => set({ photo }),

    latitude: 0,
    setLatitude: (latitude) => set({latitude}),

    longitude: 0,
    setLongitude: (longitude) => set({longitude}),

    userId: "",
    setUserId: (userId: string) => set({ userId }),

    imagePublicID: "",
    setImagePublicID: (imagePublicID: string) => set({imagePublicID})
}));

export default useUpdateStore;
