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



async function GetHistory() {
  let visits = [];
  const allvisits = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/emergency/AllEmergencyPatients" )

  allvisits.emergency.forEach(async visit => {

    let NewVisit = { ...visit }
    NewVisit.id = visit._id
    NewVisit.user = visit.user.name
    NewVisit.drug = visit.drugs.length+"("+arrayTOstring(visit.drugs.map(item => item.drugName))+")";




    visits.push(NewVisit)
  });
  return visits


}
function arrayTOstring(arr) {
  let str = ""
  arr.forEach((x, index) => {
    str += x

    if ((index + 1) < arr.length)
      str += " , "

    str+=" "
  })
  return str

}
function strTODate(date) {


  return new Date(date)
}

function EmergencyHistory(props) {

  const navigate = useNavigate()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)


  const x = httpRequest()
  const { data, isLoading, error } = useAsyncData(async () => {
    return await GetHistory()
  }, []);



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
      minWidth: 50,
      flex: 1,
      renderCell: renderMedicine
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
   
  ];





  let tableData = { "columns": columns, "rows": data }

  if (isLoading || error) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }

  return (
    <div className={props.className} style={props.style}>
      <div className="flex flex-col w-full space-y-3">

        


        <DataTable tableProps={{
          checkboxSelection: false,
          disableRowSelectionOnClick: true,
          disableDensitySelector: true,
          disableMultipleRowSelection: true,
          disableColumnSelector: true
        }} data={tableData} pageSize={7} className={" w-full h-full"} />
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
  );
}

export default EmergencyHistory;
