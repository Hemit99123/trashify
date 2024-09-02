import { ItemsProp } from "@/types/PostState";
import { Leaf } from "lucide-react";

const SinglePost: React.FC<{ post: ItemsProp }> = ({ post }) => (
  <div className="w-full p-6 bg-white rounded-lg shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-green-800">{post.title}</h2>
      <Leaf className="w-6 h-6 text-green-600" />
    </div>
    <p className="mb-4 text-green-700">{post.bin}</p>
    <div className="flex items-center justify-between pt-4 border-t border-green-200">
      <span className="text-sm text-green-500">Posted by: {post.userId}</span>
    </div>
  </div>
);

export default SinglePost;
