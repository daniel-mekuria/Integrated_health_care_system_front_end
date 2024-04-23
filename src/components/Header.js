import React from 'react';

const Header = () => {
  return (
    <header className="p-4">
      <h1 className="text-2xl text-green-600 font-bold">Beijing Hospital</h1>
      <a href=""><button className="bg-green-800 text-white py-2 px-4 rounded-md mt-4">+ New Report</button></a>
    </header>
  );
};

export default Header;
