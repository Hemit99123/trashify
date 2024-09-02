"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ItemsProp } from '@/types/PostState';
import MultiPosts from '@/components/PostViews/MultiPost';
import SinglePost from '@/components/PostViews/SinglePost';

export const EcoPost = () => {
  const [posts, setPosts] = useState<ItemsProp[]>([]);
  const [showSingle, setShowSingle] = useState<boolean>(true);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        
        // Fetch the nearest posts using the user's coordinates
        try {
          const response = await axios.get('/api/nearest-location', {
            params: {
              lat: userLatitude,
              long: userLongitude
            }
          });
          setPosts(response.data.data);
        } catch (error) {
          console.error("Error fetching posts", error);
        }
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );
  }, []);

  const togglePosts = () => {
    setShowSingle(!showSingle);
  }

  return (
    <div className="flex items-center justify-center h-80 p-4 sm:w-full">
      <div className="w-full max-w-4xl">
        {posts.length === 1 ? (
          <SinglePost post={posts[0]} />
        ) : (
          <MultiPosts posts={posts} />
        )}
      </div>
    </div>
  )
}

export default EcoPost;