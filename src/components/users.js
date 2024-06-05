import React, { useEffect, useState } from "react";

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { jsx as _jsx } from "react/jsx-runtime";
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import { jsxs as _jsxs } from "react/jsx-runtime";

import dayjs from 'dayjs';

import DataTable from "./DataTable";
import httpRequest from "./httpRequest";
import useAsyncData from "./useAsyncData";
import LoadingSpinners from "./loadingSpinners";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateUser from "./updateUser";







function Users(props) {

  const navigate = useNavigate()
  let data = props.data
  const [selectedUser, SetSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)



  const columns = [

    {
      field: 'name',
      headerName: 'Full name',
      minWidth: 100,
      flex: 1,
      editable: false,
    },



    {
      field: 'username',
      headerName: "User name",
      sortable: true,
      minWidth: 140,
      flex: 1,
    },
    {
      field: 'role',
      headerName: "Role",
      sortable: true,
      minWidth: 140,
      flex: 1,
    },
  ];




  let tableData = { "columns": columns, "rows": data }



  function handleSelect(foundData) {
    console.log(foundData)
    SetSelectedUser(foundData)
    setIsModalOpen(true)


  }
  return (
    <div className={props.className} style={props.style}>

      {selectedUser ? <UpdateUser  update={props.update} isOpen={isModalOpen} setIsOpen={setIsModalOpen} data={selectedUser} />
        : null}
      <DataTable tableProps={{
        checkboxSelection: true,
        disableRowSelectionOnClick: true,
        disableDensitySelector: true,
        disableMultipleRowSelection: true,
        disableColumnSelector: true
      }} data={tableData} pageSize={9} onSelect={handleSelect} className={" w-full h-full"} />

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
  );
}

export default Users;
