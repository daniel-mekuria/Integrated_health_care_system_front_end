import React from 'react'
import './navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import {faChartSimple} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {faHospitalUser} from '@fortawesome/free-solid-svg-icons';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import {faDesktop} from '@fortawesome/free-solid-svg-icons';
import {faPrescriptionBottleMedical} from '@fortawesome/free-solid-svg-icons';
import {faFlaskVial} from '@fortawesome/free-solid-svg-icons';
import {faCircleDot} from '@fortawesome/free-solid-svg-icons';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import avatarImage from '../assets/image.png'; // Import the image




const Navigation = () => {
  return (
    <div>
        <nav>
            <ul className='nav_link'>
                <li>
                  <a href="#">
                  <FontAwesomeIcon className='icon' icon={faCircleDot} />
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#">
                  <FontAwesomeIcon className='icon' icon={faFlaskVial} />
                    Laboratory
                  </a>
                </li>
                <li>
                  <a href="#">
                  <FontAwesomeIcon className='icon' icon={faPrescriptionBottleMedical} />
                    Pharmacy
                  </a>
                </li>
                <li>
                  <a href="#">
                  <FontAwesomeIcon className='icon' icon={faHospitalUser} />
                    Patient
                  </a>
                  </li>
                <li>
                  <a href="#">
                  <FontAwesomeIcon className='icon' icon={faDesktop} />
                    Monitor Patients
                  </a>
                </li>
                <li>
                  <a href="#">
                  <FontAwesomeIcon className='icon' icon={faChartSimple} />
                    Analytics
                  </a>
                </li>
                <li> 
                  <a href="#">
                    <FontAwesomeIcon className='icon' icon={faUserMd} />
                    Doctor
                  </a>
                  </li>
                <li>
                  <a href="#">
                  <FontAwesomeIcon className='icon' icon={faBell} />
                    Notifications
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon className='icon' icon={faGear} />
                    Settings
                  </a>
                </li>
            </ul>

            <div className='title-profile'>
              <h4>profile</h4>
            </div>
            
            <div className="profile">
              <img src={avatarImage} alt="Bisrat Mekonnen" />
              <div>
                <p className='name'>Bisrat Mekonnen</p>
                <p className='email'>doctor123@gmail.com</p>
              </div>
              
            </div>
            <div >
              <a href="">
              <button className='logout'>
              <FontAwesomeIcon className='icon' icon={faArrowRightFromBracket} />
                Logout
              </button>
              </a>
            </div>

        </nav>
    </div>
  )
}

export default Navigation