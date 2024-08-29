  import React from 'react';
  import Alert from '../../assets/regular/alert.svg';
  import withFadeIn from '@/wrapper/withFadeIn';
  import useCreateStore from '@/store/useCreateStore'; // Import Zustand store

  const Sixth = () => {
    // Starting title with a defualt value so that TypeScript doesn't compile any errors (from it being undefined)
    // This happens due to the attributes we are requesting within the title like length which require it to be a string and not any other types such as undefined

    const { title = "", setTitle } = useCreateStore((state) => ({
      title: state.title,
      setTitle: state.setTitle,
    }));


    const maxLength = 32;

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTitle(event.target.value); // Update the title in Zustand store
    };

    return (
      <div>
        <h1 className='font-medium text-5xl'>Now, let's give your bin a title</h1>
        <p className='text-gray-400 text-base font-light mb-4'>
          Create short titles for the most maximum impact on your audience (users)!
        </p>
        <textarea 
          className={`border w-full h-40 rounded-lg px-2 pt-2 ${title?.length > maxLength ? 'border-alert-red outline-alert-red focus:bg-white bg-alert-red-light' : 'border-gray-400 outline-black'}`} 
          value={title || ''} 
          onChange={handleInputChange}
          aria-invalid={title?.length > maxLength}
          aria-describedby={title?.length > maxLength ? 'title-error' : undefined}
        ></textarea>
        <p className='text-xs font-medium'>
          {title?.length || 0}/{maxLength}
        </p>
        {title?.length > maxLength && (
          <div className='flex items-center mt-4'>
              <Alert className='w-5 h-5' />
              <p className='text-alert-red text-xxs ml-1'>The maximum number of characters allowed is {maxLength}</p>
          </div>
        )}
      </div>
    );
  };

  export default withFadeIn(Sixth);
