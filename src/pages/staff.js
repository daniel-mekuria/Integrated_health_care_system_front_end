import React, { useEffect, useState } from "react";


import httpRequest from "../components/httpRequest";
import useAsyncData from "../components/useAsyncData";
import LoadingSpinners from "../components/loadingSpinners";
import { useNavigate } from "react-router-dom";
import PaitentInfo from "../components/paitentInfo";
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

import { Badge, Tabs } from 'antd';
import UpComingAppointments from "../components/upcomingAppointments";
import MissedAppointments from "../components/missedAppointments";
import Users from "../components/users";
import PendingUsers from "../components/pendingUsers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';












const getAge = (birthDate) => {
  let today = dayjs();
  let birth = dayjs(birthDate);

  let age = today.year() - birth.year();
  let monthDiff = today.month() - birth.month();

  // If the current month is before the birth month, or it's the birth month but the day is before the birth day, subtract a year from the age
  if (monthDiff < 0 || (monthDiff === 0 && today.date() < birth.date())) {
    age--;
  }

  return age;
}

async function Getusers() {
  let users = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/user/getUsers" )
  let pendingUsers = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/user/getUnverifiedUsers" )
  users = users.users
  pendingUsers=pendingUsers.unverifiedUsers
  

 
  return {users:users,pendingUsers:pendingUsers }



}
function strTODate(date) {


  return new Date(date)
}

function Staff(props) {



  const navigate = useNavigate()
  const [update, SetUpdate] = useState(false)
  const [userCount, setUserCount]=useState(0)
  const [pendingCount, setPendingCount]=useState(0)


function runUpdate(){
  SetUpdate(!update)
}

  const { data, isLoading, error } = useAsyncData(async () => {

    const x = await Getusers()
    setUserCount(x.users.length)
    setPendingCount(x.pendingUsers.length)

    return x
  }, [update])

  
  
    const onChange = (key) => {
      console.log(key);
    };
  
   


  if (isLoading) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }

  const items = [
    {
      key: '1',
      label: <Badge color="green"  showZero count={userCount} offset={[10,0]}>
        Users </Badge>,
      children: <Users update={runUpdate} data={data.users}/>
    },
    {
      key: '2',
      label:  <Badge color="orange"  showZero count={pendingCount} offset={[10,0]}>Pending users</Badge>,
      children: <PendingUsers update={runUpdate} data={data.pendingUsers}   />
      ,
    },
 
  ];

  return (
    <div className={props.className} style={props.style}>

      <div className="p-4">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
      
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}















export default Staff;