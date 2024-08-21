'use client';

import React, { useState } from 'react';
import First from '@/components/post-screens/First';
import Second from '@/components/post-screens/Second';
import Third from '@/components/post-screens/Third';
import Fourth from '@/components/post-screens/Fourth';
import Fifth from '@/components/post-screens/Fifth';
import Sixth from '@/components/post-screens/Sixth';
import { useRouter } from 'next/navigation';
import { PostDataContext } from '@/contexts/PostDataContext';
import StateObjProps from '@/types/poststate';
import axios from 'axios'

const Page = () => {
  const screens = [<First />, <Second />, <Third />, <Fourth />, <Fifth />, <Sixth />];
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [state, setState] = useState<StateObjProps>({
    photo: undefined,
    title: undefined,
    bin: undefined,
    longtitude: undefined,
    latitude: undefined,
    city: undefined
  });
  
  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleNavigationToHome = () => {
    router.push('/');
  };

  const isLastScreen = currentScreen === screens.length - 1;
  const handleClick = isLastScreen 
  ? async () => {
      if (state.photo && state.title && state.bin && state.longtitude && state.latitude && state.city) {
        try {
          await axios.post('/api/post', {
            bin: state.bin,
            photo: state.photo,
            title: state.title,
            longtitude: state.longtitude,
            city: state.city
          })
          alert('Post created successfully!');
        } catch (error) {
          alert('Failed to create post.');
        }
      } else {
        alert('Please fill out all fields before submitting.');
      }
    }
  : handleNext;

  return (
    <PostDataContext.Provider value={{ state, setState }}>
      <div>
        <div className='flex justify-center mt-10 md:mt-[20vh] xl:mt-[10vh]'>
          {screens[currentScreen]}
        </div>
        <div className='absolute bottom-2 left-0 right-0 flex justify-between px-4 py-2'>
          <button
            className='text-sm underline ml-5'
            onClick={currentScreen === 0 ? handleNavigationToHome : handleBack}
          >
            Back
          </button>
          <button
            className='bg-black text-white px-7 rounded-lg py-2.5 text-sm mr-5'
            onClick={handleClick}
          >
            {isLastScreen ? "Post" : "Next"}
          </button>
        </div>
      </div>
    </PostDataContext.Provider>
  );
};

export default Page;
