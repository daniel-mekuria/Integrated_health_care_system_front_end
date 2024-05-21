// src/components/Header.js
import React from 'react';
import { FaBell, FaCog } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl">Bed Management System</h1>
      <div className="flex items-center">
        <FaBell className="mx-4 text-gray-600" />
        <FaCog className="text-gray-600" />
      </div>
    </header>
  );
};

export default Header;
