"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '@/components/SearchBar';
import usePostStore from '@/store/usePostStore';
import PostView from '@/components/PostView';

const HomeView = () => {
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

  useEffect(() => {
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

    handleGetPosts();
  }, [lat, long]);



  console.log('updated')

  return (
    <div className='flex flex-col items-center'>
      <SearchBar />
      <hr className="w-full h-px my-5 bg-gray-300" />
      <div className='container mx-auto px-4 lg:px-16'>
        <PostView />
      </div>
    </div>
  );
}

export default HomeView;
