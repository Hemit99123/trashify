"use client";
import React, { useEffect, useState } from 'react';
import ShareModal from './components/ShareModal';
import Share from './assets/regular/share.svg';
import { authenticateClient } from './lib/auth';
import Search from './assets/regular/search-1.svg'
import { useRouter } from 'next/navigation';

const HomeView = () => {

  const router = useRouter();
  
  useEffect(() => {
    authenticateClient(router);
  }, []);

  const [showShareModal, setShowShareModal] = useState(false);
  const [email, setEmail] = useState('')

  const toggleShareModalState = () => {
    setShowShareModal((prev) => !prev);
  };

  const handleSearch = () => {
    alert(`You have searched ${email}`)
    setEmail('')
  }


  return (
    <div className='flex flex-col items-center'>
      <div className='cursor-pointer hover:bg-gray-100 duration-300 w-1/2 rounded-full py-2 border flex justify-between shadow-lg group'>
        <div className='flex-col text-left ml-5'>
          <p className='text-[10px] text-light'>Who?</p>
          <input 
            type='text' 
            placeholder='Search email' 
            value={email}
            className='text-xs placeholder:text-gray-400 text-light bg-transparent outline-none placeholder:font-light' 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className='flex items-center rounded-full bg-green-500 px-3 mr-2' onClick={handleSearch}>
          <Search />
          <p className='text-sm hidden group-hover:flex ml-1 text-white font-medium'>Search</p>
        </button>
      </div>
      <hr className="w-full h-px my-5 bg-gray-300" />
      <div className='container mx-auto px-4 lg:px-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6 mt-4'>
          {[...Array(12)].map((_, index) => (
            <div key={index} className='relative flex flex-col'>
              <div>
                <div className='relative w-full aspect-w-16 md:aspect-w-14 aspect-h-12'>
                  <img
                    className='w-full h-full object-cover rounded-lg'
                    src='https://loremflickr.com/cache/resized/65535_53060242254_5101d67715_500_150_nofilter.jpg'
                    alt='Main image'
                  />
                </div>
                <button
                  className='absolute top-2 right-2 rounded-full py-2 px-2 bg-gray-200 bg-opacity-95 z-10'
                  onClick={toggleShareModalState}
                >
                  <Share />
                </button>
              </div>
              <div className='mt-2'>
                <p className="text-xs font-medium">Join a living room session with Doja</p>
                <p className='text-gray-500 text-xs font-light'>Posted by Doja Cat</p>
                <p className='text-xs font-medium'>On January 2024</p>
              </div>
            </div>
          ))}
        </div>

        {showShareModal && (
          <ShareModal setShowShareModal={setShowShareModal} />
        )}
      </div>
    </div>
  );
}

export default HomeView;
