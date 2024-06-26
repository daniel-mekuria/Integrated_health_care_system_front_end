import React, { useState } from "react";
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
import PersonIcon from '@mui/icons-material/Person'; import Header from "./Header";
import { GetCookie, RemoveCookie, SetCookie } from "./cookies";
import { Button, Divider, Menu, Popover } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateProfile from "./updateProfile";


const Navigation = () => {
  const navigate = useNavigate()

  const userRole = GetCookie("user")?JSON.parse(GetCookie("user")).role:null
const [isUpdateModalOpen,setIsUpdateModalOpen] =useState(false)

const location= useLocation()
  const user = GetCookie("user") ? JSON.parse(GetCookie("user")) : { "name": null }
  return (
    <div className="h-full py-0 mx-2 mt-0 font-sans text-black w-60">
      <UpdateProfile   isOpen={isUpdateModalOpen} setIsOpen={setIsUpdateModalOpen}/>

      <div className="font-sans h-[100%] py-2 bg-white rounded-lg shadow-lg">
        <Header />
        <Menu
          mode="inline"
          className="font-sans !border-none"
          onClick={(x) => {

            navigate('/' + x.key)
          }}
          defaultSelectedKeys={[location.pathname.slice(1)]}
          items={[

            {
              key: '',
              icon: <FontAwesomeIcon className="mr-2 font-sans" icon={faCircleDot} />,


              label: 'Overview',


            },
            {
              key: 'bed',
              icon: <FontAwesomeIcon className="mr-2 font-sans" icon={faFlaskVial} />
              ,
              label: 'Bed managment',
            },
            {
              key: 'pharmacy',
              icon: <FontAwesomeIcon
                className="mr-2 font-sans"
                icon={faPrescriptionBottleMedical}
              />
              ,
              label: 'Pharmacy',
            },
            {
              key: 'patients',
              icon: <FontAwesomeIcon className="mr-2 font-sans" icon={faHospitalUser} />
              ,
              label: 'Patients',
            },
            {
              key: 'monitor',
              icon: <FontAwesomeIcon className="mr-2 font-sans" icon={faDesktop} />

              ,
              label: 'Monitor Patients',
            },
           (userRole!=="Staff")?{
              key: 'staff',
              icon: <FontAwesomeIcon className="mr-2 font-sans" icon={faUserMd} />


              ,
              label: 'Staff',
            }:null,
            {
              key: 'analytics',
              icon: <FontAwesomeIcon className="mr-2 font-sans" icon={faChartSimple} />

              ,
              label: 'Analytics',
            },

          ]









          }
        />


<Divider/>
<div  className="flex flex-col p-4 space-y-4 font-sans ">

        <div>
          <div className="font-sans text-sm text-gray-600">Profile</div>
          <Popover content={<div className="flex w-full">
            <Button type="primary"  onClick={()=>{
              setIsUpdateModalOpen(true)
            }} className="!ml-auto" >Edit profile</Button>
            </div>} >
          <div className="flex items-center mt-2 font-sans">
            <PersonIcon

              className="w-8 h-8 font-sans rounded-full"
            />
            <div className="ml-2 font-sans">
              <p className="font-sans font-medium">{user.name}</p>
            </div>
          </div>
          </Popover>
        </div>

          <Button
            onClick={() => {
              RemoveCookie("accessToken")
              RemoveCookie("refreshToken")
              RemoveCookie("user")
              navigate("/login")
            }}
            icon={<FontAwesomeIcon className="mr-2 font-sans" icon={faArrowRightFromBracket} />
            }
          >
            Logout
          </Button>
      </div>
    </div>
    </div>

  );
};

export default Navigation;
