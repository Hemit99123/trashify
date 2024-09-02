import { ItemsProp } from '@/types/PostState';
import { Leaf } from 'lucide-react';

const MultiPosts: React.FC<{ posts: ItemsProp[] }> = ({ posts }) => (
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
);

export default MultiPosts;
