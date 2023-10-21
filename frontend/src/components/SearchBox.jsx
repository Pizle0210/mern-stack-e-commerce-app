import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function SearchBox() {
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault()
    if (keyword.trim()) {
        navigate(`/search/${keyword}`)
        setKeyword('')
    }else{
        navigate('/')
    }
  };

  return (
    <form onSubmit={submitHandler} className="relative">
      <input
        type="search"
        placeholder="Search products..."
        className=" text-black outline-none border-none focus:ring-2 focus:ring-slate-500 focus:shadow-2xl mr-3"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="absolute right-0 top-1 ml-4 px-2 p-2 font-bold bg-white text-black  mr-5 md:mr-10">
        <FaSearch />
      </button>
    </form>
  );
}
