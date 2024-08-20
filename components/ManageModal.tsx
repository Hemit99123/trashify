import React from 'react';
import ModalWrapper from '@/wrapper/ModalWrapper';
import Delete from '@/assets/regular/delete.svg'
import Update from '@/assets/regular/update.svg'
import {useRouter} from 'next/navigation';

interface ShareModalProps {
  setShowManageModal: React.Dispatch<React.SetStateAction<boolean>>;

}

const ManageModal: React.FC<ShareModalProps> = ({ setShowManageModal }) => {

    const router = useRouter()

    const handleDelete = () => {
        alert("YOU DELETED!!")
    }

    const handleNavigateToUpdate = () => {
        router.push('/manage/update')
    }
    
  return (
    <ModalWrapper onClose={() => setShowManageModal(false)}>
      <h1 className='text-xl font-medium mb-4'>Manage your bin</h1>
      
      <div className='mx-6'>
        <button className='w-full flex items-center text-sm font-semibold border rounded-lg bg-gray-50 py-1 px-2' onClick={handleDelete}>
            <Delete />
            <p className='ml-1'>Delete</p>
        </button>
        <button className='w-full flex items-center text-sm font-semibold border rounded-lg bg-gray-50 py-1 px-2 mt-4' onClick={handleNavigateToUpdate}>
            <Update />
            <p className='ml-1'>Update</p>
        </button>
      </div>
    </ModalWrapper>
  );
};

export default ManageModal;
