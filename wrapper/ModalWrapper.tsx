import React from 'react';
import Cancel from '@/assets/regular/cancel.svg';

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, onClose }) => {
  return (
    <div className="flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <button
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClose}
          aria-label="Close"
        >
          <Cancel className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
