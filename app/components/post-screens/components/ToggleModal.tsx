import React from 'react';
import Cancel from '../../../assets/regular/cancel.svg'

interface InputProps {
    label: string;
}

interface ToggleModalProps {
  setShowToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleModalInput: React.FC<InputProps> = ({label}) => {
    return (
        <div className='flex flex-col'>
            <p className='text-sm text-gray-400 mb-1'>{label}</p>
            <input className='border rounded-lg py-1.5 mb-5 px-2' type='number'/>
        </div>
    )
}

const ToggleModal: React.FC<ToggleModalProps> = ({ setShowToggleModal }) => {
  return (
    <div id="static-modal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-6 overflow-y-auto overflow-x-hidden bg-blur backdrop-blur-xl">
      <div className="relative w-full max-w-lg max-h-full p-6">
        <div className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col">
            <button className='absolute top-2 right-2 hover:bg-gray-100 px-1 py-1 rounded-full' onClick={() => setShowToggleModal(false)}>
                <Cancel />
            </button>
            <ToggleModalInput label='Longtitude'/>
            <ToggleModalInput label='Latitude'/>
            <button className='bg-green-500 hover:bg-green-300 duration-1000 text-white text-base py-2.5 px-10 rounded-xl'>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ToggleModal;
