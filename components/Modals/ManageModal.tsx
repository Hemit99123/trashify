"use client";

import React from 'react';
import Delete from '@/assets/regular/delete.svg';
import Update from '@/assets/regular/update.svg';
import ModalWrapper from '@/wrapper/ModalWrapper';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ShareModalProps {
  setShowManageModal: (show: boolean) => void;
  id: string;
}

const ManageModal: React.FC<ShareModalProps> = ({ setShowManageModal, id }) => {

  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete("/api/post", {
        data: {
          id
        }
      })
      alert("Deleted your post")
    } catch(err) {
      alert('There was an error!')
    }
  };

  const handleNavigateToUpdate = () => {
    router.push(`/manage/update?id=${id}`)
  };

  return (
    <ModalWrapper onClose={() => setShowManageModal(false)}>
      <h1 className="text-xl font-medium mb-4">Manage Your Bin</h1>
      <div className="space-y-4">
        <button
          className="w-full flex items-center text-sm font-semibold border rounded-lg bg-gray-100 py-2 px-4 hover:bg-gray-200"
          onClick={handleDelete}
        >
          <Delete className="w-5 h-5" />
          <p className="ml-2">Delete</p>
        </button>
        <button
          className="w-full flex items-center text-sm font-semibold border rounded-lg bg-gray-100 py-2 px-4 hover:bg-gray-200"
          onClick={handleNavigateToUpdate}
        >
          <Update className="w-5 h-5" />
          <p className="ml-2">Update</p>
        </button>
      </div>
    </ModalWrapper>
  );
};

export default ManageModal;
