"use client";

import React, { useEffect, useState } from 'react'
import { Leaf, Recycle, ThumbsUp } from "lucide-react"
import axios from 'axios';
import { ItemsProp } from '@/types/PostState';

export default function EcoPosts() {
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
          const response = await axios.get('/api/ai', {
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
    <div className="flex items-center justify-center h-screen bg-green-50 p-4">
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

function SinglePost({ post }: { post: ItemsProp }) {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-green-800">{post.title}</h2>
        <Leaf className="w-6 h-6 text-green-600" />
      </div>
      <p className="mb-4 text-green-700">{post.bin}</p>
      <div className="flex items-center justify-between pt-4 border-t border-green-200">
        <span className="text-sm text-green-500">Posted by: {post.userId}</span>
        <button className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          Share
        </button>
      </div>
    </div>
  )
}

function MultiPosts({ posts }: { posts: ItemsProp[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {posts.map(post => (
        <div key={post.id} className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-green-800">{post.title}</h2>
            <Leaf className="w-5 h-5 text-green-600" />
          </div>
          <p className="mb-4 text-green-700">{post.bin}</p>
          <div className="flex items-center justify-between pt-4 border-t border-green-200">
            <span className="text-sm text-green-500">Posted by: {post.userId}</span>
            <button className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Share
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
