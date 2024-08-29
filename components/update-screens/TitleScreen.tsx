import React from 'react';
import LightBulb from '@/assets/regular/light-bulb.svg';
import Alert from '@/assets/regular/alert.svg';
import { useRouter } from 'next/navigation';
import useUpdateStore from '@/store/useUpdateStore'; // Import the updated store

interface TitleScreenProps {
  isDesktop: boolean;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ isDesktop }) => {
  const { title, setTitle } = useUpdateStore(state => ({
    title: state.title,
    setTitle: state.setTitle
  }));
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const maxLength = 36;

  const handleNavigateToResource = () => {
    router.push('https://www.wix.com/blog/how-to-write-catchy-blog-titles');
  };

  const titleLength = title?.length ?? 0; // Default to 0 if title is undefined (TypeScript error validation)

  return (
    <div className='flex items-center flex-col text-center'>
      {!title &&
        <div className='flex items-center space-x-1 mb-px text-xxs text-alert-red'>
          <Alert />
          <p>This field is required. Please provide a value!</p>
        </div>
      }
      <p className={`text-xxs ${titleLength > maxLength ? 'text-alert-red' : 'text-gray-500'}`}>
        <b>{titleLength > maxLength ? 'Exceeded' : maxLength - titleLength}</b> characters available
      </p>
      <input
        className='text-center text-8xl font-medium outline-none'
        value={title ?? ''} // Default to empty string if title is undefined
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
