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

import DataTable from "../components/DataTable";
import httpRequest from "../components/httpRequest";
import useAsyncData from "../components/useAsyncData";
import LoadingSpinners from "../components/loadingSpinners";
import { useNavigate } from "react-router-dom";
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



async function GetHistory(id="663a7d42d9dfeea5fdd27d4e") {
  let visits = [];
  const allvisits = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/visit/getPatientVisits/"+id)
  

  allvisits.visitHistories.forEach(async visit => {
    
    let NewVisit={...visit}
    NewVisit.id=visit._id
    NewVisit.onTime=visit.onTime?"Yes":"No"


    visits.push(  NewVisit  )
  });
console.log(visits)
  return visits


}
function strTODate(date) {
  

  return new Date(date)
}

function ViewHistory(props) {

  const navigate = useNavigate()
  const [isAddModalOpen,setIsAddModalOpen] =useState(false)


const x=httpRequest()
  const { data, isLoading, error } = useAsyncData(GetHistory,[]);



  const columns = [
   
    {
      field: 'user',
      headerName: 'Physician',
      minWidth: 100,
      flex: 1,
      editable: false,
    },
    
  
    {
      field: 'drug',
      headerName: 'Medicine',
      sortable: false,
      minWidth: 80,
      flex: 1,
      renderCell: renderMedicine
    },
    {
      field: 'otherMedicine',
      headerName: 'Other medicine',
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
      field: 'visitDate',
      type: "date",
      headerName: 'Visit date',
      sortable: true,
      minWidth: 140,
      valueGetter: strTODate,
      flex: 1,
    },
    {
      field: 'nextAppointmentDate',
      type: "date",
      headerName: 'Next apt.date',
      sortable: true,
      minWidth: 140,
      valueGetter: strTODate,
      flex: 1,
    },
  ];


  


let rows=[
    {
        "_id": "663a7ebed9dfeea5fdd27d6e",
        "user": "662538d6145fa9526ee24a85",
        "patient": "663a7d42d9dfeea5fdd27d4e",
        "drug": "66391e1aff4447a4c49949cb",
        "otherDrug": [
            "Panadol",
            "parastamol"
        ],
        "pillNumber": 30,
        "visitDate": "05 / Apr / 2024",
        "onTime": true,
        "nextAppointmentDate": "05 / May / 2024",
        "__v": 0
    }
]
  let tableData = { "columns": columns, "rows": data }

  if (isLoading || error) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }


  return (
    <div className={props.className} style={props.style}>
     
      <DataTable  getRowId={(row) => console.log} data={tableData} pageSize={9}  className={" w-full h-full"} />


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

export default ViewHistory;
