import React from 'react';
import Image from 'next/image';
import withFadeIn from '@/wrapper/withFadeIn';

const First = () => {
  return (
    <div className='flex items-center flex-col md:flex-row'>
      <div className="flex flex-col items-start p-8 bg-white rounded-lg max-w-lg mx-auto">
        <div>
          <p className="text-sm text-gray-500 mb-2 font-semibold">Welcome message</p>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold mb-4">Tell us about your bin</h1>
          <p className="text-base text-gray-700 font-light">
            In this form, you will provide us with all the information needed to get started! Through this information, you will be able to register a new trashbin/recycling bin onto our systems!
          </p>
        </div>
      </div>
      <div className='mt-4 md:mt-0 md:ml-8 flex-shrink-0'>
        <Image
          src='/airbnb.png'
          alt='HeroImage'
          width={100}
          height={100}
          layout='responsive'
        />
      </div>
    </div>
  );
};

export default withFadeIn(First);
