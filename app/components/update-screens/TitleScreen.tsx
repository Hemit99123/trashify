import React, { useState } from 'react';
import LightBulb from '../../assets/regular/light-bulb.svg'
import Alert from '../../assets/regular/alert.svg'
import { useRouter } from 'next/navigation';

interface TitleScreenProps {
    isDesktop: boolean
}

const TitleScreen: React.FC<TitleScreenProps> = ({isDesktop}) => {
  const [inputValue, setInputValue] = useState('test');
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const maxLength = 36

  const handleNavigateToResource = () => {
    router.push('https://www.wix.com/blog/how-to-write-catchy-blog-titles')
  }

  return (
    <div className='flex items-center flex-col text-center'>
      {!inputValue &&
        <div className='flex items-center space-x-1 mb-px text-xxs text-alert-red'>
            <Alert />
            <p>This field is required. Please provide a value!</p>
        </div>
      }
      <p className={`text-xxs ${inputValue.length > maxLength ? 'text-alert-red' : 'text-gray-500'}`}><b>{inputValue.length > maxLength ? 'Exceeded' : maxLength-inputValue.length}</b> characters available</p>
      <input
        className='text-center text-8xl font-medium outline-none'
        value={inputValue}
        onChange={handleChange}
      />

      {isDesktop &&
        <button className='absolute bottom-16 bg-yellow-100 rounded-full py-3 px-3 w-10 h-10' onClick={handleNavigateToResource}>
          <LightBulb />
        </button>
      }

    </div>
  );
};

export default TitleScreen;
