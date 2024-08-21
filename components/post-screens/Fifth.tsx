import React, { useContext, useState } from 'react';
import Image from 'next/image';
import withFadeIn from '@/wrapper/withFadeIn'; // Adjust the import path as needed
import { PostDataContext } from '@/contexts/PostDataContext';
import imageCompression from 'browser-image-compression';

const FIFTH_MAX_FILE_SIZE_MB = 10; // Maximum file size in MB

const Fifth = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { setState } = useContext(PostDataContext);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if the file size exceeds the limit
      if (file.size / (1024 * 1024) > FIFTH_MAX_FILE_SIZE_MB) {
        alert(`File size exceeds ${FIFTH_MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`);
        return; // Exit the function if the file is too large
      }

      try {
        // Define options for image compression
        const options = {
          maxSizeMB: 1, // Maximum file size in MB after compression
          maxWidthOrHeight: 1024, // Maximum width or height
          useWebWorker: true,
        };

        // Compress the image
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();

        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setSelectedImage(reader.result);

            // Update the context with the base64 string
            setState(prevState => ({
              ...prevState,
              photo: reader.result // Update the context with base64 data
            }));
          }
        };

        // Read the compressed file as a Data URL (base64-encoded string)
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Image compression failed:', error);
      }
    }
  };

  return (
    <div className='flex flex-col'>
      <h1 className='font-medium text-5xl'>Add a photo of the bin</h1>
      <p className='text-gray-400 text-sm mb-6'>You'll need one photo to get started. This is what the user will first see!</p>
      <div className='border-2 border-gray-500 border-dashed py-30 bg-gray-100 rounded-xl flex items-center space-x-4'>
        <Image
          src={selectedImage || "/camera.png"}
          width={150}
          height={150}
          alt='A camera icon'
        />
        <div className='flex flex-col items-center'>
          <label className='text-xs px-2 py-2.5 rounded-lg font-medium bg-white border-2 border-black h-10 cursor-pointer'>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
            />
            Add your photo
          </label>
        </div>
      </div>
    </div>
  );
};

export default withFadeIn(Fifth);
