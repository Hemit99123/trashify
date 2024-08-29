import React, { useState } from "react";
import Search from "@/assets/regular/search-1.svg";
import axios from "axios";
import usePostStore from "@/store/usePostStore";

const SearchBar= () => {
  const [email, setEmail] = useState("");
  const setState = usePostStore((state) => state.setState)

  const handleSearch = async () => {
    try {
      console.log('Searching for:', email);
      const result = await axios.get('/api/post/search', { params: { email } });
      console.log('Search results:', result.data);
      setState(result.data.data);
      setEmail("");
    } catch (err) {
      console.error('An error occurred:', err);
      alert('An error occurred');
    }
  };

  return (
    <div className="cursor-pointer hover:bg-gray-100 duration-300 w-1/2 rounded-full py-2 border flex justify-between shadow-lg group">
      <div className="flex-col text-left ml-5">
        <p className="text-[10px] text-light">Who?</p>
        <input
          type="text"
          placeholder="Search email"
          value={email}
          className="text-xs placeholder:text-gray-400 text-light bg-transparent outline-none placeholder:font-light"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        className="flex items-center rounded-full bg-green-500 px-3 mr-2"
        onClick={handleSearch}
      >
        <Search />
        <p className="text-sm hidden group-hover:flex ml-1 text-white font-medium">
          Search
        </p>
      </button>
    </div>
  );
};

export default SearchBar;
