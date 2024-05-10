import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faChartSimple,
  faBell,
  faHospitalUser,
  faGear,
  faDesktop,
  faPrescriptionBottleMedical,
  faFlaskVial,
  faCircleDot,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import PersonIcon from '@mui/icons-material/Person';import Header from "./Header";
import { GetCookie, RemoveCookie, SetCookie } from "./cookies";

const Navigation = () => {

  const user =GetCookie("user")?JSON.parse(GetCookie("user")):{"name":null}
  return (
    <div className="w-64 h-full py-4 mx-2 mt-0 text-black text-lg">
      <div className="px-4 py-2 bg-white rounded-lg shadow-lg">
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
            <a
              href="/pharmacy"
              className="flex items-center hover:text-green-700"
            >
              <FontAwesomeIcon
                className="mr-2"
                icon={faPrescriptionBottleMedical}
              />
              Pharmacy
            </a>
          </li>
          <li>
            <a
              href="/paitents"
              className="flex items-center hover:text-green-700"
            >
              <FontAwesomeIcon className="mr-2" icon={faHospitalUser} />
              Patient
            </a>
          </li>
          <li>
            <a href="/visit" className="flex items-center hover:text-green-700">
              <FontAwesomeIcon className="mr-2" icon={faDesktop} />
              Monitor Patients
            </a>
          </li>
          <li>
            <a href="/analytics" className="flex items-center hover:text-green-700">
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
            <PersonIcon
              
              className="w-8 h-8 rounded-full"
            />
            <div className="ml-2">
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
        </div>

        <div className="mt-0">
          <a
            href="/login"
            onClick={()=>{
              RemoveCookie("accessToken")
              RemoveCookie("refreshToken")
              RemoveCookie("user")
            }}
            className="block px-4 py-2 font-bold text-black bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <FontAwesomeIcon className="mr-2" icon={faArrowRightFromBracket} />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
