import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCapsules, faUserDoctor, faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons';

const Buttons = () => {
  return (
    <div className="flex justify-center  items-center gap-4 ">
      <button className="flex flex-col items-center w-48 px-4 py-2 rounded-lg border-green-500 border-2 bg-white">
        <FontAwesomeIcon icon={faSuitcaseMedical} />
        <span>Emergency Supply</span>
      </button>
      <button className="flex flex-col items-center w-58 px-6 py-6 rounded-lg border-green-500 border-2 bg-white">
        <FontAwesomeIcon icon={faCapsules} />
        <span>ARV Drug Daily Dispensing Adult</span>
      </button>
      <button className="flex flex-col items-center w-48 px-4 py-2 rounded-lg border-green-500 border-2 bg-white">
        <FontAwesomeIcon icon={faUserDoctor} />
        <span>Doctor</span>
      </button>
    </div>
  );
};

export default Buttons;
