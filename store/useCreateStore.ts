import { create } from 'zustand';
import { StateObjProps } from '@/types/PostState';

// Create the Zustand store using the StateObjProps interface
const useCreateStore = create<StateObjProps>((set) => ({
  bin: undefined,
  title: undefined,
  latitude: undefined,
  longitude: undefined,
  photo: undefined,
  
  // Define your setter functions to update the state
  setBin: (bin: StateObjProps['bin']) => set((state) => ({ bin })),
  setTitle: (title: StateObjProps['title']) => set((state) => ({ title })),
  setLatitude: (latitude: StateObjProps['latitude']) => set((state) => ({ latitude })),
  setLongitude: (longitude: StateObjProps['longitude']) => set((state) => ({ longitude })),
  setPhoto: (photo: StateObjProps['photo']) => set((state) => ({ photo })),
}));

export default useCreateStore;
