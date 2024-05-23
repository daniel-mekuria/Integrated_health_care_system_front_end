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



async function GetHistory(id) {
  let visits = [];
  const allvisits = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/visit/getPatientVisits/" + id)


  allvisits.visitHistories.forEach(async visit => {

    let NewVisit = { ...visit }
    NewVisit.id = visit._id
    NewVisit.onTime = visit.onTime ? "Yes" : "No"
    NewVisit.user = visit.user.name
    NewVisit.drug = visit.drug.drugName + `(dose:${visit.drug.dose} , amount:${visit.drug.amount} )`



    visits.push(NewVisit)
  });
  return visits


}
function strTODate(date) {


  return new Date(date)
}

function ViewHistory(props) {

  const navigate = useNavigate()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)


  const x = httpRequest()
  const { data, isLoading, error } = useAsyncData(async () => {
    return await GetHistory(props.paitent._id)
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
      minWidth: 80,
      flex: 1,
      renderCell: renderMedicine
    },
    {
      field: 'otherDrug',
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





  let rows = [

  ]
  let tableData = { "columns": columns, "rows": data }

  if (isLoading || error) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }

  return (
    <div className={props.className} style={props.style}>
      <div className="flex flex-col space-y-3">

        <div className='flex space-x-1'>
          <p className='text-sm font-medium text-gray-500'> Visit history of : </p>
          <p className='text-sm text-gray-900'> {props.paitent.fullName}</p>

        </div>
        <div className='flex space-x-1'>
          <p className='text-sm font-medium text-gray-500'> ATR NO : </p>
          <p className='text-sm text-gray-900'> {props.paitent.id}</p>
        </div>


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

export default ViewHistory;
