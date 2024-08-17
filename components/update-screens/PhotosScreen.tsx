import React, { useState, useCallback, useEffect } from 'react';
import Photos from '@/assets/regular/photos.svg';
import Delete from '@/assets/regular/delete-2.svg';

const PhotosScreen: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFile(selectedFiles[0]); // Only set the first selected file
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      setFile(droppedFiles[0]); // Only set the first dropped file
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(URL.createObjectURL(file));
      }
    };
  }, [file]);

  return (
    <div
      className={`flex flex-col items-center border-2 rounded-lg border-dashed w-1/2 py-12 ${isDragging ? 'border-blue-500' : 'border-gray-400'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Photos />
      <h2 className='font-semibold text-xl'>Drag and drop</h2>
      <p className='text-xs text-gray-500'>or find a photo</p>
      <input
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className='bg-black text-white px-5 py-2.5 rounded-lg font-light text-sm mt-2 cursor-pointer'>
        Browse
      </label>
      {file && (
        <div className='mt-4 text-center'>
          <h3 className='font-semibold text-sm'>Uploaded Photos</h3>
          <p className='text-gray-500 text-xxs'>One item to view</p>
          <div className='relative'>
            <button className='absolute top-4 right-2 bg-black rounded-full py-1.5 px-1.5' onClick={handleDeleteFile}>
              <Delete />
            </button>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className='w-44 h-48 rounded-lg object-cover'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosScreen;
