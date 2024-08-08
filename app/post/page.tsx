  "use client";

  import React, { useState } from 'react'
  import First from '../components/post-screens/First'
  import Second from '../components/post-screens/Second'
  import Fourth from '../components/post-screens/Fourth'
  import { useRouter } from 'next/navigation';
  import Third from '../components/post-screens/Third';
  import Sixth from '../components/post-screens/Sixth';
  import Fifth from '../components/post-screens/Fifth';

  const Page = () => {

    const screens = [<First />, <Second />, <Third />, <Fourth />, <Fifth />, <Sixth />,  ] 
    const router = useRouter()
    const [currentScreen, setCurrentScreen] = useState<number | null>(0);


    const handleNext = () => {
      if (currentScreen !== null && currentScreen < screens.length - 1) {
        setCurrentScreen(currentScreen + 1);
      }
    }
    
    const handleBack = () => {
      if (currentScreen !== null) {
        setCurrentScreen(currentScreen - 1);
      }
    }

    const handlePost = () => {
        alert('POSTED!!!')
    }
    
    const handleNavigationToHome = () => {
      router.push('/');
    }

    const isLastScreen = currentScreen === screens.length - 1;
    const buttonText = isLastScreen ? "Post" : "Next";
    const handleClick = isLastScreen ? handlePost : handleNext;
    
    
    return (
      <div>
        <div className='flex justify-center mt-10 md:mt-[20vh] xl:mt-[10vh]'>
          {currentScreen !== null && screens[currentScreen]}
        </div>
        <div className='absolute bottom-2 left-0 right-0 flex justify-between px-4 py-2'>
          <button className='text-sm underline ml-5' onClick={currentScreen === 0 ? handleNavigationToHome : handleBack}>Back</button>
          <button 
            className='bg-black text-white px-7 rounded-lg py-2.5 text-sm mr-5' 
            onClick={handleClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    )
    
  }

  export default Page
