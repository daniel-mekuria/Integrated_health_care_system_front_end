import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCapsules, faUserDoctor, faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons';


const Buttons_Dashboard = () => {
  return (
    <div className="flex justify-start  items-center gap-4 ">
      <button className="flex flex-col items-center w-30 px-4 py-2 rounded-lg border-green-500 border-2 bg-white">
        <FontAwesomeIcon icon={faUserDoctor} />
        <span>Patient</span>
      </button>
      <button className="flex flex-col items-center w-30 px-4 py-2 rounded-lg border-green-500 border-2 bg-white">
        <FontAwesomeIcon icon={faSuitcaseMedical} />
        <span>Emergency </span>
      </button>
      <button className="flex flex-col items-center w-30 px-4 py-2 rounded-lg border-green-500 border-2 bg-white">
        <FontAwesomeIcon icon={faCapsules} />
        <span>Adult</span>
      </button>
      <button className="flex flex-col items-center w-30 px-4 py-2 rounded-lg border-green-500 border-2 bg-white">
        <FontAwesomeIcon icon={faUserDoctor} />
        <span>Doctor</span>
      </button>
    </div>
  )
}

export default Buttons_Dashboard