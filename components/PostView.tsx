"use client";

import usePostStore from "@/store/usePostStore";
import { ItemsProp } from "@/types/PostState";
import React, { useState } from "react";
import Share from "@/assets/regular/share.svg";
import ShareModal from "./Modals/ShareModal";
import { useRouter } from "next/navigation";

const PostView = () => {
  const router = useRouter();
  const posts = usePostStore((state) => state.state);
  const [showShareModal, setShowShareModal] = useState(false);
  const toggleShareModalState = () => {
    setShowShareModal((prev) => !prev);
  };
  const handleNavigationToOne = (id: string) => {
    router.push(`/post/one?id=${id}`)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6 mt-4">
        {posts.map((item: ItemsProp, index: React.Key | null | undefined) => (
          <div key={index} className="cursor-pointer relative flex flex-col" onClick={() => handleNavigationToOne(item.id)}>
            <div>
              <div className="relative w-full aspect-w-16 md:aspect-w-14 aspect-h-12">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={item.photo}
                  alt="Main image"
                />
              </div>
              <button
                className="absolute top-2 right-2 rounded-full py-2 px-2 bg-gray-200 bg-opacity-95 z-10"
                onClick={toggleShareModalState}
              >
                <Share />
              </button>
            </div>
            <div className="mt-2">
              <p className="text-xs font-medium">{item.title}</p>
              <p className="text-gray-500 text-xs font-light">{item.bin} bin</p>
              <p className="text-xs font-medium">Posted by {item.userId}</p>
            </div>
          </div>
        ))}
      </div>

      {showShareModal && <ShareModal setShowShareModal={setShowShareModal} />}
    </>
  );
};

export default PostView;
