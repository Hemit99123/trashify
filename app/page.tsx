"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '@/components/SearchBar';
import usePostStore from '@/store/usePostStore';
import PostView from '@/components/PostView';
import Refresh from '@/assets/regular/refresh.svg'

const Page = () => {
  const setPosts = usePostStore((state) => state.setState)
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);

  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
          },
          (error) => {
            console.error('Geolocation error:', error);
          }
        );
      }
    };

    getCurrentPosition();
  }, []);

  const handleGetPosts = async () => {
    if (lat !== null && long !== null) {
      try {
        const result = await axios.get(`/api/post`, { params: { lat, long } });
        console.log('Fetched posts:', result.data);
        setPosts(result.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, [lat, long, handleGetPosts]);

  return (
    <div className='flex flex-col items-center'>
      <SearchBar />
      <button 
        className="mt-3 flex items-center border-2 border-green-600 text-green-800 text-lg font-bold rounded-xl px-3 py-2" 
        onClick={handleGetPosts}
      >
        <Refresh />
        Refresh
      </button>
      <hr className="w-full h-px my-5 bg-gray-300" />
      <div className='container mx-auto px-4 lg:px-16'>
        <PostView />
      </div>
    </div>
  );
}

export default Page;
