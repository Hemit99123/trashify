"use client";

import { ItemsProp } from "@/types/poststate";
import React, { useState } from "react";
import ManageModal from "./ManageModal";

interface DeleteItemsProps {
  index: number;
  item: ItemsProp;
}

const DeleteItem: React.FC<DeleteItemsProps> = ({ index, item }) => {
  const [showManageModal, setShowManageModal] = useState(false);

  const toggleManageModalState = () => {
    setShowManageModal(true);
  };

  return (
    <>
      <tr
        key={index}
        className="cursor-pointer"
        onClick={toggleManageModalState}
      >
        <td className="py-4 px-2 flex items-center p-10">
          <p className="ml-7 font-medium">{item.title}</p>
        </td>
        <td className="py-4 px-2 text-gray-500">{item.city}</td>
        <td className="py-4 px-2 text-gray-500">{item.bin}</td>
      </tr>
      {showManageModal && (
        <ManageModal setShowManageModal={setShowManageModal} id={item.id} />
      )}
    </>
  );
};

export default DeleteItem;
