import React from 'react';
import { FaChartPie, FaUsers, FaEnvelope, FaBed, FaDoorOpen } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-green-600 text-white w-64 h-screen flex flex-col fixed">
      <div className="p-4 text-center">
        <img src="profile.jpg" alt="Profile" className="rounded-full w-24 mx-auto"/>
        <h2 className="mt-4 text-lg">Allie Simon</h2>
        <p className="text-gray-400">Admissions Officer</p>
      </div>
      <nav className="w-64">
        <ul className="mt-4">
          <li className="p-4 hover:bg-green-700">
            <FaChartPie className="inline mr-2" /> Dashboard
          </li>
          <li className="p-4 hover:bg-green-700">
            <FaChartPie className="inline mr-2" /> Insights
          </li>
          <li className="p-4 hover:bg-green-700">
            <FaUsers className="inline mr-2" /> Patients
          </li>
          <li className="p-4 hover:bg-green-700">
            <FaEnvelope className="inline mr-2" /> Messages
          </li>
          <li className="p-4 hover:bg-green-700">
            <FaBed className="inline mr-2" /> Manage beds
          </li>
          <li className="p-4 hover:bg-green-700">
            <FaDoorOpen className="inline mr-2" /> Manage rooms
          </li>
          <li className="p-4 hover:bg-green-700">
            <FaUsers className="inline mr-2" /> Users
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
