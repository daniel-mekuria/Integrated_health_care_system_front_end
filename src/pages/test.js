import * as React from 'react';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
function RenderDate(props) {
 
  


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
          console.log(value)
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

const columns = [
  {
    field: 'date',
    headerName: 'Year',
    width: 150,
    renderCell: RenderDate,
    
  },
];

const rows = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

export default function RenderCellGrid() {
  const ODD_OPACITY = 0.2;


  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&.Mui-selected': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity,
        ),
        '&:hover': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity,
          ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    },
    [`& .${gridClasses.row}.odd`]: {
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&.Mui-selected': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity,
        ),
        '&:hover': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity,
          ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    },
  }));

  return (
    <div style={{ height: 300, width: '100%' }}>
      <StripedDataGrid getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        } rowSelection={false} rows={rows} columns={columns} />
    </div>
  );
}
