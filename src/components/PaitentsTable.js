import React from "react";

import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DoneIcon from "@mui/icons-material/Done";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { jsx as _jsx } from "react/jsx-runtime";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
import { jsxs as _jsxs } from "react/jsx-runtime";

import DataTable from "./DataTable";

const Medicine = /*#__PURE__*/ React.memo(function Medicine(props) {
  const { value } = props;
  if (!value) {
    return null;
  }
  const valueStr = value.toString();
  const tooltip = valueStr.slice(
    valueStr.indexOf("(") + 1,
    valueStr.indexOf(")")
  );
  const code = valueStr.slice(0, valueStr.indexOf("(")).trim();
  return /*#__PURE__*/ _jsxs(Box, {
    sx: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    children: [
      /*#__PURE__*/ _jsx("span", {
        children: code,
      }),
      /*#__PURE__*/ _jsx(Tooltip, {
        title: tooltip,
        children: /*#__PURE__*/ _jsx(InfoIcon, {
          sx: {
            color: "#2196f3",
            alignSelf: "center",
            ml: "8px",
          },
        }),
      }),
    ],
  });
});
export function renderMedicine(params) {
  return /*#__PURE__*/ _jsx(Medicine, {
    value: params.value,
  });
}

const StyledChip = styled(Chip)(({ theme }) => ({
  justifyContent: "left",
  "& .icon": {
    color: "inherit",
  },
  "&.Yes": {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
  "&.No": {
    color: (theme.vars || theme).palette.error.dark,
    border: `1px solid ${(theme.vars || theme).palette.error.main}`,
  },
}));
const Status = /*#__PURE__*/ React.memo((props) => {
  const { status } = props;
  let icon = null;
  if (status === "No") {
    icon = /*#__PURE__*/ _jsx(ReportProblemIcon, {
      className: "icon",
    });
  } else if (status === "Yes") {
    icon = /*#__PURE__*/ _jsx(DoneIcon, {
      className: "icon",
    });
  }
  let label = status;

  return /*#__PURE__*/ _jsx(StyledChip, {
    className: status,
    icon: icon,
    size: "small",
    label: label,
    variant: "outlined",
  });
});
function renderStatus(params) {
  if (params.value == null) {
    return "";
  }
  return /*#__PURE__*/ _jsx(Status, {
    status: params.value,
  });
}

function strTODate(date) {
  return new Date(date);
}

function PaitentTable(props) {
  let rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 12,
      PhoneNumber: "0910000000",
      onTime: "No",
      Medicine: "cod(codine)",
      LastAptDate: "10/12/2020",
      NextAptDate: "10/12/2020",
    },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 12 },
    { id: 6, lastName: "Melisandre", firstName: "null", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const columns = [
    { field: "id", headerName: "ID", minWidth: 90 },
    {
      field: "firstName",
      headerName: "First name",
      minWidth: 100,
      flex: 1,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Last name",
      minWidth: 100,
      flex: 1,
      editable: false,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      minWidth: 40,
      flex: 1,
      editable: false,
    },

    {
      field: "ReasonForLastVisit",
      headerName: "reason for last visit",
      sortable: false,
      flex: 1,
      minWidth: 150,
    },
    {
      field: "PhoneNumber",
      headerName: "Phone number",
      minWidth: 120,
      flex: 1,
      editable: false,
    },

    {
      field: "Medicine",
      headerName: "Medicine",
      sortable: false,
      minWidth: 100,
      flex: 1,
      renderCell: renderMedicine,
    },
    {
      field: "onTime",
      headerName: "ontime",
      sortable: true,
      minWidth: 80,
      flex: 1,
      renderCell: renderStatus,
    },
    {
      field: "LastAptDate",
      type: "date",
      headerName: "Last apt.date",
      sortable: true,
      minWidth: 160,
      valueGetter: strTODate,
      flex: 1,
    },
    {
      field: "NextAptDate",
      type: "date",
      headerName: "Next apt.date",
      sortable: true,
      minWidth: 160,
      valueGetter: strTODate,
      flex: 1,
    },
  ];

  let data = { columns: columns, rows: rows };

  return (
    <div className={props.className} style={props.style}>
      <DataTable tableProps={{
          checkboxSelection: false,
          disableRowSelectionOnClick: true,
          disableDensitySelector: true,
          disableMultipleRowSelection: true,
          disableColumnSelector: true
        }}
      data={data} pageSize={5} className={" w-full h-full"} />
    </div>
  );
}

export default PaitentTable;
