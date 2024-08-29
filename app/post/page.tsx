"use client";

import React, { useState } from "react";
import First from "@/components/post-screens/First";
import Second from "@/components/post-screens/Second";
import Third from "@/components/post-screens/Third";
import Fourth from "@/components/post-screens/Fourth";
import Fifth from "@/components/post-screens/Fifth";
import Sixth from "@/components/post-screens/Sixth";
import { useRouter } from "next/navigation";
import usePostHandler from "@/hooks/usePostHandler"; // Import the custom hook for better abstraction within codebase

const screens = [
  <First key="first" />,
  <Second key="second" />,
  <Third key="third" />,
  <Fourth key="fourth" />,
  <Fifth key="fifth" />,
  <Sixth key="sixth" />,
];

const Page = () => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const { handlePost } = usePostHandler(); // Use the custom hook

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleNavigationToHome = () => {
    router.push("/");
  };

  const isLastScreen = currentScreen === screens.length - 1;

  return (
    <div>
      <div className="flex justify-center">
        {screens[currentScreen]}
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 py-2">
        <button
          className="text-sm underline ml-5"
          onClick={currentScreen === 0 ? handleNavigationToHome : handleBack}
        >
          Back
        </button>
        {!isLastScreen ? (
          <button
            className="bg-black text-white px-7 rounded-lg py-2.5 text-sm mr-5"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-black text-white px-7 rounded-lg py-2.5 text-sm mr-5"
            onClick={handlePost}
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
