import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';


import IconButton from '@mui/material/IconButton';

import { DataGrid, GridToolbarFilterButton } from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function QuickSearchToolbar(props) {
  return (
    <div className="flex px-6 py-2 justify-normal">
      <GridToolbarFilterButton  />
      <TextField className="relative left-5"
        variant="standard"

        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
     { props.addNew?<Button onClick={props.onAdd} variant="outlined" style={{marginLeft: 'auto'}} startIcon={<AddIcon />}>
        New
        </Button>:null
}

    </div>
  );
}









 function DataTable( props) {
  const navigate=useNavigate()
  const [platform, setPlatform] = useState([]);
  
  const [rows, setRows] = useState([]);

 

  useEffect(() => {
    let rowsList  = props.data.rows;

    
    setPlatform(rowsList);
    setRows(rowsList);
  }, []);

 
const columns = props.data.columns;

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  const [searchText, setSearchText] = React.useState('');
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = platform.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };


  return (
    <div  className={props.className} style={props.style} >
     
      <div className="w-full h-full " >
        <DataGrid  autoHeight 
        

onRowSelectionModelChange={(ids) => {
  const selectedIDs = new Set(ids);
  let foundData = rows.find(item => item.id === ids[0]);

  navigate('/paitentdetail',{state:{atrNo:foundData.id}});

}}
        checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        disableMultipleRowSelection
        disableColumnSelector
        
        slots={{ toolbar:props.toolBar?props.toolBar :QuickSearchToolbar }}


        slotProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
            onAdd: ()=> { 
              if(props.setIsAddModalOpen)
              props.setIsAddModalOpen(true)
            
            },
            addNew:props.addNew
          },
        }}


          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: props.pageSize?props.pageSize:10,
              
              },
            },
          }}
        
        />
      </div>
    </div>
  );
}

export default DataTable;
