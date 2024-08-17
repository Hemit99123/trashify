import React from 'react';
import Cancel from '../assets/regular/cancel.svg'

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, onClose }) => {
  return (
    <div id="static-modal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-6 overflow-y-auto overflow-x-hidden bg-blur backdrop-blur-xl">
      <div className="relative w-full max-w-lg max-h-full p-6">
        <div className="relative bg-white rounded-lg shadow-lg p-6">
          <button className='absolute top-2 right-2 hover:bg-gray-100 px-1 py-1 rounded-full' onClick={onClose}>
            <Cancel />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
