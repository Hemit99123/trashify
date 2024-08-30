import React from 'react';
import Garbage from '../../assets/type-option-icon/garbage.svg';
import Recycle from '../../assets/type-option-icon/recycle.svg';
import Food from '../../assets/type-option-icon/food.svg';
import OptionsButton from './components/OptionsButton';
import withFadeIn from '@/wrapper/withFadeIn';
import useCreateStore from '@/store/useCreateStore'; // Import Zustand store

const Second = () => {
  // Access the Zustand store state and updater function
  const { setBin } = useCreateStore((state) => ({
    setBin: state.setBin,
  }));

  const handleOptionClick = (binType: 'garbage' | 'recycling' | 'compost') => {
    setBin(binType); // Update the bin type in Zustand store
  };

  return (
    <div>
      <div>
        <h1 className='text-3xl md:text-5xl font-medium'>What type of bin did you spot?</h1>
        <div className="max-w-sm md:max-w-xs lg:max-w-none">
          <p className='text-gray-400 text-sm lg:text-base font-light mb-6'>
            This ensures that users throw their trash in an appropriate bin. Resulting in a contribution to the green cause.
          </p>
        </div>
      </div>

      <OptionsButton
        title='Garbage'
        desc='Items meant for landfills'
        SVG={Garbage}
        handleClick={() => handleOptionClick('garbage')}
      />
      <div className='mt-4'>
        <OptionsButton
          title='Recycling'
          desc='Items that can be reused for other purposes'
          SVG={Recycle}
          handleClick={() => handleOptionClick('recycling')}
        />
      </div>
      <div className='mt-4'>
        <OptionsButton
          title='Compost'
          desc='Items that are meant to go back into the soil (food)'
          SVG={Food}
          handleClick={() => handleOptionClick('compost')}
        />
      </div>
    </div>
  );
};

export default withFadeIn(Second);
