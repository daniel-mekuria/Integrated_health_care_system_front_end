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
    <div className="flex px-6 py-2 font-sans justify-normal">
      <GridToolbarFilterButton />
      <TextField className="relative font-sans left-5"
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
      {props.addNew ? <Button onClick={props.onAdd} variant="outlined" style={{ marginLeft: 'auto' }} startIcon={<AddIcon />}>
        New
      </Button> : null
      }

    </div>
  );
}









function DataTable(props) {
  console.log("Asddasd")
  const navigate = useNavigate()
  const [platform, setPlatform] = useState([]);

  const [rows, setRows] = useState([]);

let onSelect=props.onSelect




  function RenderView(props) {
 
  


    const { hasFocus, value } = props;
    const buttonElement = React.useRef(null);
    const rippleRef = React.useRef(null);
  
    React.useLayoutEffect(() => {
      if (hasFocus) {
        const input = buttonElement.current.querySelector('input');
        input?.unfocus();
      } else if (rippleRef.current) {
        // Only available in @mui/material v5.4.1 or later
        rippleRef.current.stop({});
      }
    }, [hasFocus]);
  
    return (
      <strong className='before:focus:!border-none   focus-within:!border-none'>
        
        <Button
          ref={buttonElement}
          touchRippleRef={rippleRef}
          variant="outlined"
          size="small"
          style={{ marginLeft: 16 }}
          // Remove button from tab sequence when cell does not have focus
          tabIndex={hasFocus ? 0 : -1}
          onClick={()=>{
            if (onSelect)
              onSelect(value)
          }}
          onKeyDown={(event) => {
           
              // Prevent key navigation when focus is on button
              event.stopPropagation();
            
          }}
        >
          View
        </Button>
      </strong>
    );
  }




  useEffect(() => {
    let rowsList = props.data.rows;
   

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
        try {
          return searchRegex.test(row[field].toString());
        }
        catch {
          return false
        }

      });
    });
    setRows(filteredRows);
  };




 if (columns[0].field!=="View"&&props.tableProps.checkboxSelection){
  columns.unshift(
    {
      field: 'View',
      headerName: '',
      width: 150,
      renderCell: RenderView,
      
    }
  )
 }
 
let newRows=rows.map((row)=>({... row,View:row}))
  return (
    <div className={props.className} style={props.style} >

      <div className="w-full h-full font-sans " >
        <DataGrid autoHeight
          className="font-sans"
          sx={{ fontFamily: "Poppins" }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          } 
          onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            let foundData = rows.find(item => item.id === ids[0]);
            if (props.onSelect)
              props.onSelect(foundData)

          }}
          checkboxSelection={false}
          disableRowSelectionOnClick={props.tableProps.disableRowSelectionOnClick}
          disableDensitySelector={props.tableProps.disableDensitySelector}
          disableMultipleRowSelection={props.tableProps.disableMultipleRowSelection}
          disableColumnSelector={props.tableProps.disableColumnSelector}

          slots={!props.noToolBar ? { toolbar: props.toolBar ? props.toolBar : QuickSearchToolbar } : null}


          slotProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(''),
              onAdd: () => {
                if (props.setIsAddModalOpen)
                  props.setIsAddModalOpen(true)

              },
              addNew: props.addNew
            },
          }}


          rows={newRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: props.pageSize ? props.pageSize : 10,

              },
            },
          }}

        />
      </div>
    </div>
  );
}

export default DataTable;
