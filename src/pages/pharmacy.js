import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { BarChart } from '@mui/x-charts';
import { Form } from 'antd';
import DataTable from '../components/DataTable';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LoadingButton } from '@mui/lab';
import httpRequest from '../components/httpRequest';
import useAsyncData from '../components/useAsyncData';
import LoadingSpinners from '../components/loadingSpinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

const initialDrugs = [
  { id: '1', name: 'CTG/DTG', expireDate: '02-12-2025', quantity: 100 },
  { id: '2', name: 'HIC/DGG', expireDate: '06-06-2024', quantity: 200 },
];

const Pharmacy = () => {
  const [drugs, setDrugs] = useState(initialDrugs);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrugs, setSelectedDrugs] = useState([]);

 
 
  const [update, setupdate] = useState(false);
  
  const [addLoading, setAddLoading] = useState(false);

















  async function  getPharmacy(){

  const drugs = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/getAllDrugs").drugs


}



  const handleAddDrug = async (x) => {

    console.log(x)


    let newdrug;
    newdrug.drugName = x.name
    newdrug.dose = "ds"
    newdrug.amount = x.quantity
    newdrug.expireDate = x.expiryDate
    const response = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/addDrug", newdrug, "post")
    return response;
  };



 


  const totalMedicine = drugs.reduce((acc, drug) => acc + parseInt(drug.quantity), 0);
  const totalEmergencyDrugs = 158; // Placeholder value, adjust as needed

  const filteredDrugs = drugs.filter((drug) => {
    if (filter === 'lowStock' && drug.quantity > 50) return false;
    if (filter === 'almostExpired' && ((dayjs(drug.expireDate).diff(dayjs(), 'month'))>3)) return false;
    return (
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.id.includes(searchTerm)
    );
  });

  const handleToggleDrug = (id) => {
    setSelectedDrugs((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((drugId) => drugId !== id) : [...prevSelected, id]
    );
  };


  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'CTG/DTG ',
        data: [20, 50, 30, 70, 40, 90],
        backgroundColor: '#3b82f6',
      },
      {
        label: 'HIC/DGG',
        data: [30, 70, 40, 60, 80, 50],
        backgroundColor: '#f472b6',
      },
     
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  
function strTODate(date) {


  return new Date(date)
}





  const columns = [


    {
      field: 'name',
      headerName: 'Drug name',
      minWidth: 200,
      flex: 1,
      editable: false,
    },
    {
      field: 'quantity',
      headerName: 'Drug quantity',
      minWidth: 100,
      flex: 1,
      editable: false,
    },
    {
      field: 'expireDate',
      type: "date",
      headerName: 'Expiry date',
      sortable: true,
      minWidth: 140,
      valueGetter: strTODate,
      flex: 1,
    },


  ];

  const { fetchedData, isLoading, error } = useAsyncData(getPharmacy, [update]);

  if (isLoading || error) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }


  return (
    <div className='flex'>
      <Box p={4}>
        <Grid container spacing={4}>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" fontWeight="bold" color="textPrimary">
                  Total Medicine Available
                </Typography>
                <Typography variant="h2" component="div" fontWeight="bold" color="textPrimary">
                  {totalMedicine}
                </Typography>
                <Bar data={data} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" fontWeight="bold" color="textPrimary">
                  Total Emergency Drugs Dispensed
                </Typography>
                <Typography variant="h2" component="div" fontWeight="bold" color="textPrimary">
                  {totalEmergencyDrugs}
                </Typography>
                <Bar data={data} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box mt={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>

              <TextField
                label="Search Drugs"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined">
                <InputLabel>Filter</InputLabel>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  label="Filter"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="lowStock">Low Stock</MenuItem>
                  <MenuItem value="almostExpired">Almost Expired</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box mt={3}>
          <Button variant="contained" color="primary" style={{ marginRight: '8px' }}>
            Add Drug
          </Button>
          <Button variant="contained" color="secondary"  style={{ marginRight: '8px' }}>
            Edit Drug
          </Button>
          <Button variant="contained"  style={{ marginRight: '8px' }}>
            Refill Drug
          </Button>
          <Button variant="contained" color="error">
            Remove Drug
          </Button>



          <DataGrid autoHeight
            className="font-sans"
            sx={{ fontFamily: "Poppins" }}
            checkboxSelection={false}
            disableRowSelectionOnClick
            disableDensitySelector
            disableMultipleRowSelection
            disableColumnSelector




            rows={filteredDrugs}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 2,
                },
              },
            }}

          />
        </Box>

        {/* Add Drug Dialog */}
        <Dialog >
          <DialogTitle>Add Drug</DialogTitle>
          <Form
            onFinish={

              async (x) => {
                setAddLoading(true)
                await handleAddDrug(x)
                setAddLoading(false)




              }
            }
          >

            <DialogContent>

              <div className='flex flex-col space-y-0'>
                <Form.Item
                  name="name"
                  rules={[{ required: true }]}

                >
                  <TextField
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                  />
                </Form.Item>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Form.Item
                    name="expiryDate"
                    rules={[{ required: true }]}

                  >
                    <DatePicker className="w-full mt-0" label={"Expiry date"} />





                  </Form.Item>
                </LocalizationProvider>
                <Form.Item
                  name="quantity"
                  rules={[{ required: true }]}

                >
                  <TextField
                    margin="dense"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    fullWidth
                  />
                </Form.Item>
              </div>
            </DialogContent>
            <DialogActions>
              <Button  color="primary">
                Cancel
              </Button>
              <Button  style={{ marginRight: '8px' }}>
                Bulk Add Drugs
              </Button>
              <LoadingButton LoadingButton
                loading={addLoading}
                variant="contained"
                className="w-40 "
                type="submit"

              >

                <span>Add</span>
              </LoadingButton>

            </DialogActions>
          </Form>

        </Dialog>

        {/* bulk add drugs */}
        <Dialog >
          <DialogTitle>Bulk Add Drugs</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Enter drugs in the format: id,name,brandName,quantity (one per line)
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              multiline
              rows={10}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button  color="primary">
              Cancel
            </Button>
            <Button color="primary">
              Add Drugs
            </Button>
          </DialogActions>
        </Dialog>


        {/* Edit Drug Dialog */}
        <Dialog>
          <DialogTitle>Edit Drug</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel>Select Drug</InputLabel>
              <Select
                onChange={(e) => {
                  const selected = drugs.find(drug => drug.id === e.target.value);
                }}
              >
                {drugs.map((drug) => (
                  <MenuItem key={drug.id} value={drug.id}>
                    {drug.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              name="brandName"
              label="Brand Name"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button  color="primary">
              Cancel
            </Button>
            <Button  color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Refill Drug Dialog */}
        <Dialog  >
          <DialogTitle>Refill Drug</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel>Select Drug</InputLabel>
              <Select
                onChange={(e) => {
                  const selected = drugs.find(drug => drug.id === e.target.value);
                }}
              >
                {drugs.map((drug) => (
                  <MenuItem key={drug.id} value={drug.id}>
                    {drug.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="quantity"
              label="Refill Quantity"
              type="number"
              fullWidth
             
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary">
              Cancel
            </Button>
            <Button color="primary">
              Refill
            </Button>
          </DialogActions>
        </Dialog>

        {/* Remove Drug Dialog */}
        <Dialog >
          <DialogTitle>Remove Drug</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel>Select Drug</InputLabel>
              <Select
                
              >
                {drugs.map((drug) => (
                  <MenuItem key={drug.id} value={drug.id}>
                    {drug.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button  color="primary">
              Cancel
            </Button>
            <Button>
              Bulk Remove Drugs
            </Button>
            <Button variant="contained"  color="primary">
              Remove
            </Button>
          </DialogActions>
        </Dialog>

        {/* {bulk remove drugs} */}
        <Dialog>
          <DialogTitle>Bulk Remove Drugs</DialogTitle>
          <DialogContent>
            <FormGroup>
              {drugs.map((drug) => (
                <FormControlLabel
                  key={drug.id}
                  control={
                    <Checkbox
                      checked={selectedDrugs.includes(drug.id)}
                      onChange={() => handleToggleDrug(drug.id)}
                    />
                  }
                  label={`${drug.name} (${drug.id})`}
                />
              ))}
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button color="primary">
              Cancel
            </Button>
            <Button  color="primary">
              Remove Drugs
            </Button>
          </DialogActions>
        </Dialog>


      </Box>
      <div className="space-y-2 btns">
        <Button variant="contained" className='bg-green' style={{ marginRight: '8px' }}>
          Emergency Drug dispensing
        </Button>

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
};

export default Pharmacy;