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


import DataTable from "../components/DataTable";
import httpRequest from "../components/httpRequest";
import useAsyncData from "../components/useAsyncData";
import LoadingSpinners from "../components/loadingSpinners";
import { useNavigate } from "react-router-dom";
import AddPaitent from "./addpaitent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






const Medicine = /*#__PURE__*/React.memo(function Medicine(props) {
  const {
    value
  } = props;
  if (!value) {
    return null;
  }
  const valueStr = value.toString();
  const tooltip = valueStr.slice(valueStr.indexOf('(') + 1, valueStr.indexOf(')'));
  const code = valueStr.slice(0, valueStr.indexOf('(')).trim();
  return /*#__PURE__*/_jsxs(Box, {
    sx: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    children: [/*#__PURE__*/_jsx("span", {
      children: code
    }), /*#__PURE__*/_jsx(Tooltip, {
      title: tooltip,
      children: /*#__PURE__*/_jsx(InfoIcon, {
        sx: {
          color: '#2196f3',
          alignSelf: 'center',
          ml: '8px'
        }
      })
    })]
  });
});
export function renderMedicine(params) {
  return /*#__PURE__*/_jsx(Medicine, {
    value: params.value
  });
}






const StyledChip = styled(Chip)(({
  theme
}) => ({
  justifyContent: 'left',
  '& .icon': {
    color: 'inherit'
  },
  '&.Yes': {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`
  },
  '&.No': {
    color: (theme.vars || theme).palette.error.dark,
    border: `1px solid ${(theme.vars || theme).palette.error.main}`
  }
}));
const Status = /*#__PURE__*/React.memo(props => {
  const {
    status
  } = props;
  let icon = null;
  if (status === 'No') {
    icon = /*#__PURE__*/_jsx(ReportProblemIcon, {
      className: "icon"
    });
  } else if (status === 'Yes') {
    icon = /*#__PURE__*/_jsx(DoneIcon, {
      className: "icon"
    });
  }
  let label = status;

  return /*#__PURE__*/_jsx(StyledChip, {
    className: status,
    icon: icon,
    size: "small",
    label: label,
    variant: "outlined"
  });
});
function renderStatus(params) {
  if (params.value == null) {
    return '';
  }
  return /*#__PURE__*/_jsx(Status, {
    status: params.value
  });
}



async function GetPaitents() {
  let atrPaitents = [];
  const allPaitents = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/patient/allAtrPatients")

  allPaitents.patients.forEach(async paitent => {
    const today = new Date();
    const birthDate = new Date(paitent.birthDate)
    const age = today.getFullYear() - birthDate.getFullYear() - (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()));


    atrPaitents.push({
      _id:paitent._id,id: paitent.atrNumber, fullName:paitent.fullName, age: age, PhoneNumber: paitent.phoneNumber, onTime: "No", Medicine: "cod(codine)",  LastAptDate: paitent.visitDate, NextAptDate: paitent.nextAppointmentDate
    },

    )
  });

  return atrPaitents


}





function strTODate(date) {
  

  return new Date(date)
}

function ViewPaitents(props) {

  const navigate = useNavigate()
  const [isAddModalOpen,setIsAddModalOpen] =useState(false)
  const [update,setUpdate] =useState(false)

   async function saveNew (){
     toast.success(" Registered succesfuly");
     setTimeout(() => {
      setUpdate(!update)
     }, 3000);

    
  }

  function handleSelect(foundData){
    console.log(foundData)
    navigate('/paitentdetail',{state:{foundData:foundData}});
   }

  const { data, isLoading, error } = useAsyncData(GetPaitents,[update]);



  const columns = [
    { field: 'id', headerName: 'Atr No', minWidth: 90 },
    {
      field: 'fullName',
      headerName: 'Full name',
      minWidth: 100,
      flex: 1,
      editable: false,
    },
   
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      minWidth: 60,
      flex: 1,
      editable: false,
    },


    {
      field: 'PhoneNumber',
      headerName: 'Phone number',
      minWidth: 120,
      flex: 1,
      editable: false,
    },


    {
      field: 'Medicine',
      headerName: 'Medicine',
      sortable: false,
      minWidth: 80,
      flex: 1,
      renderCell: renderMedicine
    },
    {
      field: 'onTime',
      headerName: 'ontime',
      sortable: true,
      minWidth: 80,
      flex: 1,
      renderCell: renderStatus
    },
    {
      field: 'LastAptDate',
      type: "date",
      headerName: 'Last apt.date',
      sortable: true,
      minWidth: 140,
      valueGetter: strTODate,
      flex: 1,
    },
    {
      field: 'NextAptDate',
      type: "date",
      headerName: 'Next apt.date',
      sortable: true,
      minWidth: 140,
      valueGetter: strTODate,
      flex: 1,
    },
  ];






  let tableData = { "columns": columns, "rows": data }

  if (isLoading || error) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }


  return (
    <div className={props.className} style={props.style}>
      <AddPaitent isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} saveNew={saveNew} />
     
      <DataTable tableProps={{ checkboxSelection:true,
        disableRowSelectionOnClick:true,
        disableDensitySelector:true,
        disableMultipleRowSelection:true,
        disableColumnSelector:true}} onSelect={handleSelect} addNew data={tableData} pageSize={11} setIsAddModalOpen={setIsAddModalOpen} className={" w-full h-full"} />


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

export default ViewPaitents;
