import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faChartSimple, faBell, faHospitalUser, faGear, faDesktop, faPrescriptionBottleMedical, faFlaskVial, faCircleDot, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import avatarImage from '../assets/image.png';
import Header from './Header';

const Navigation = () => {
  return (
    <div className="w-64 h-full py-4 mx-2 mt-0 text-black">
      <div className="h-[99%] px-4 py-2 bg-white rounded-lg shadow-lg">
      <Header />

        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center hover:text-green-700">
              <FontAwesomeIcon className="mr-2" icon={faCircleDot} />
              Overview
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:text-green-700">
              <FontAwesomeIcon className="mr-2" icon={faFlaskVial} />
              Laboratory
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:text-green-700">
              <FontAwesomeIcon className="mr-2" icon={faPrescriptionBottleMedical} />
              Pharmacy
            </a>
          </li>
          <li>
            <a href="/paitents" className="flex items-center hover:text-green-700">
              <FontAwesomeIcon className="mr-2" icon={faHospitalUser} />
              Patient
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:text-green-700">
              <FontAwesomeIcon className="mr-2" icon={faDesktop} />
              Monitor Patients
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:text-green-700">
              <FontAwesomeIcon className="mr-2" icon={faChartSimple} />
              Analytics
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:text-green-700">
              <FontAwesomeIcon className="mr-2" icon={faUserMd} />
              Doctor
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:text-green-700">
              <FontAwesomeIcon className="mr-2" icon={faBell} />
              Notifications
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center hover:text-green-700">
              <FontAwesomeIcon className="mr-2" icon={faGear} />
              Settings
            </a>
          </li>
        </ul>

        <div className="py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">Profile</div>
          <div className="flex items-center mt-2">
            <img src={avatarImage} alt="Bisrat Mekonnen" className="w-8 h-8 rounded-full" />
            <div className="ml-2">
              <p className="font-medium">Bisrat Mekonnen</p>
              <p className="text-xs text-gray-500">doctor123@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-0">
          <a href="/login" className="block px-4 py-2 font-bold text-black bg-gray-100 rounded-md hover:bg-gray-200">
            <FontAwesomeIcon className="mr-2" icon={faArrowRightFromBracket} />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
