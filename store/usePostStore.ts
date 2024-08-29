import { create } from 'zustand';
import { StateObjPropsCut } from '@/types/PostState';

interface PostStoreState {
    state: StateObjPropsCut;
    setState: (newState: StateObjPropsCut) => void;
}

const usePostStore = create<PostStoreState>((set) => ({
    state: [] as unknown as StateObjPropsCut, // Provide an initial value as an empty object with the type of StateObjPropsCut
    setState: (newState) => set({ state: newState }),
}));

export default usePostStore;
