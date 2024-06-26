import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate=useNavigate()
  return (
    <header className="p-4">
      <a href="/" className="flex items-center hover:text-green-700">
        <h1 className="text-2xl font-bold text-green-600">TB Hospital</h1>
      </a>

      <button onClick={()=>{
        navigate("/reports")
      }} className="px-4 py-2 mt-4 text-white bg-green-800 rounded-md">
          + New Report
        </button>
      
    </header>
  );
};

export default Header;
