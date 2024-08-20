"use client";

import React, { useState } from 'react';
import ActionButton from '@/components/ActionButton';
import Plus from '@/assets/regular/plus.svg'
import Search from '@/assets/regular/search-2.svg'
import {useRouter} from 'next/navigation'
import ManageModal from '@/components/ManageModal';

const Page = () => {

    const [showManageModal, setShowManageModel] = useState(false)

    const toggleManageModelState = () => {
        setShowManageModel((prev) => !prev)
    }

    const router = useRouter();

    const handleNavigateToPost = () => {
        router.push('/post')
    }


    const handleSearch = () => {
        alert("YOU SEARCHED!!")
    }
  return (
    <div>
      <h1 className='text-4xl font-medium pl-8 pt-10'>My Bins</h1>
    
      <div className='flex top-28 right-10 absolute space-x-2'>
            <ActionButton SVG={Search}  action={handleSearch}/>
            <ActionButton SVG={Plus} action={handleNavigateToPost}/>
      </div>
      <div className='mt-7 p-4 pl-8'>
        <table className='max-w-screen-2xl w-full text-xs'>
            <thead>
            <tr>
                <th className='pb-4 px-2 text-left'>Name</th>
                <th className='pb-4 px-2 text-left'>Location</th>
                <th className='pb-4 px-2 text-left'>Type</th>
            </tr>
            </thead>
            <tbody>
            <tr className='hover:bg-special-grey cursor-pointer' onClick={toggleManageModelState}>
                <td className='py-4 px-2 flex items-center'>
                <img
                    src='https://loremflickr.com/cache/resized/65535_53060242254_5101d67715_500_150_nofilter.jpg'
                    className='w-12 h-12 object-cover rounded-sm'
                    alt='Profile'
                />
                <p className='ml-7 font-medium'>Test</p>
                </td>
                <td className='py-4 px-2 text-gray-500'>Brampton</td>
                <td className='py-4 px-2 text-gray-500'>Compost</td>
            </tr>

            <tr className='hover:bg-special-grey cursor-pointer' onClick={toggleManageModelState}>
                <td className='py-4 px-2 flex items-center'>
                <img
                    src='https://loremflickr.com/cache/resized/65535_53060242254_5101d67715_500_150_nofilter.jpg'
                    className='w-12 h-12 object-cover rounded-sm'
                    alt='Profile'
                />
                <p className='ml-7 font-medium'>Test</p>
                </td>
                <td className='py-4 px-2 text-gray-500'>Brampton</td>
                <td className='py-4 px-2 text-gray-500'>Recycling</td>
            </tr>
            
            
            </tbody>
        </table>
      </div>

      {showManageModal &&
          <ManageModal setShowManageModal={setShowManageModel} />
      }

    </div>
  );
};

export default Page;
