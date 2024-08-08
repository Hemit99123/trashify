import React, { useState, useEffect } from 'react';
import ToggleModal from './components/ToggleModal';
import withFadeIn from '@/app/wrapper/withFadeIn'; 

const Third = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className='font-medium text-5xl'>Confirm the location</h1>
      <p className='text-gray-400 text-base font-light'>Please provide an accurate location. This way it is easy for those looking for a bin.</p>
      <div className='mt-8'>
        <div className='rounded-lg border py-1 px-3'>
          <p className='text-xs text-gray-400'>Coordinates</p>
          <p className='text-base'>12,13</p>
        </div>
        <div className='rounded-lg border py-1 px-3 mt-7'>
          <p className='text-xs text-gray-400'>City</p>
          <p className='text-base'>Brampton</p>
          <div className="flex-grow border-t border-gray-400"></div>
          <p className='text-xs text-gray-400 mt-px'>Province/Region</p>
          <p className='text-base'>Ontario</p>
          <div className="flex-grow border-t border-gray-400"></div>
          <p className='text-xs text-gray-400 mt-px'>Postal Code</p>
          <p className='text-base'>L6P2RX</p>
        </div>
        <div className="flex-grow border-t border-gray-300 my-6"></div>
        <div className='flex items-center justify-between'>
          <div className='flex-col'>
            <p className='text-sm font-medium'>Want to change it?</p>
            <p className='text-xs text-gray-400 font-light'>If the current location is not correct, press the button to customize it!</p>
          </div>
          <label className='flex cursor-pointer select-none items-center'>
            <div className='relative'>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={handleCheckboxChange}
                className='sr-only'
              />
              <div
                className={`box block h-8 w-14 rounded-full ${isChecked ? 'bg-green-500' : 'bg-black'}`}
              ></div>
              <div
                className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform duration-300 ${
                  isChecked ? 'translate-x-full' : ''
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>

      {isChecked &&
        <ToggleModal setShowToggleModal={setIsChecked} />
      }
    </div>
  );
}

export default withFadeIn(Third);
