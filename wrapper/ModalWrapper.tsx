import React from 'react';
import Cancel from '../assets/regular/cancel.svg';

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, onClose }) => {
  return (
    <div
      className="flex items-center justify-center bg-black/50"
    >
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
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
