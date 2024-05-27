// src/components/Statistics.jsx
import React from 'react';

const Statistics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="items-center justify-between">
          <div className='flex items-center justify-between '>
            <div>
              <h2 className="text-2xl font-bold">92.0%</h2>
              <p className="text-gray-500">In Use</p>
            </div>
            <div className="mt-6">
              <p className="text-gray-600">210 Total</p>
            </div>
          </div>
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </div>
        </div>
        
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">85.0%</h2>
            <p className="text-gray-500">Oncology</p>
          </div>
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-600">42 Total</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">98.0%</h2>
            <p className="text-gray-500">Neurology</p>
          </div>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14"
              />
            </svg>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-600">50 Total</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">89.0%</h2>
            <p className="text-gray-500">Cardiology</p>
          </div>
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-600">62 Total</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
