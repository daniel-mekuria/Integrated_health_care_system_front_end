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
  const [openAdd, setOpenAdd] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openBulkAdd, setOpenBulkAdd] = useState(false);
  const [bulkDrugs, setBulkDrugs] = useState('');
  const [openBulkRemove, setOpenBulkRemove] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [update, setupdate] = useState(false);
  const [openRefill, setOpenRefill] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState('');
  const [drugInfo, setDrugInfo] = useState({
    id: '',
    name: '',
    brandName: '',
    quantity: ''
  });
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [addLoading, setAddLoading] = useState(false);














  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenRefill = () => setOpenRefill(true);
  const handleCloseRefill = () => setOpenRefill(false);
  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);



  const handleCloseBulkAdd = () => setOpenBulkAdd(false);
  const handleOpenBulkAdd = () => setOpenBulkAdd(true);
  const handleCloseBulkRemove = () => setOpenBulkRemove(false);
  const handleOpenBulkRemove = () => setOpenBulkRemove(true);
  const handleBulkChange = (e) => setBulkDrugs(e.target.value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrugInfo({
      ...drugInfo,
      [name]: value,
    });
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#047857',
      },

    },
  });




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


  const handleEditDrug = () => {
    setDrugs(drugs.map((drug) =>
      drug.id === selectedDrug.id ? { ...selectedDrug, ...drugInfo } : drug
    ));
    setDrugInfo({ id: '', name: '', brandName: '', quantity: '' });
    handleCloseEdit();
  };

  const handleRefillDrug = () => {
    setDrugs(drugs.map((drug) =>
      drug.id === selectedDrug ? { ...drug, quantity: parseInt(drug.quantity) + parseInt(drugInfo.quantity) } : drug
    ));
    setDrugInfo({ id: '', name: '', brandName: '', quantity: '' });
    handleCloseRefill();
  };

  const handleRemoveDrug = () => {
    setDrugs(drugs.filter(drug => drug.id !== selectedDrug));
    handleCloseRemove();
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

  const handleBulkAddDrugs = () => {
    const newDrugs = bulkDrugs.split('\n').map(line => {
      const [id, name, brandName, quantity] = line.split(',');
      return { id, name, brandName, quantity: parseInt(quantity) };
    });
    setDrugs([...drugs, ...newDrugs]);
    setBulkDrugs('');
    handleCloseBulkAdd();
  };//adding bulk amount of drug

  const handleBulkRemoveDrugs = () => {
    setDrugs(drugs.filter(drug => !selectedDrugs.includes(drug.id)));
    setSelectedDrugs([]);
    handleCloseBulkRemove();
  };
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
          <Button variant="contained" color="primary" onClick={handleOpenAdd} style={{ marginRight: '8px' }}>
            Add Drug
          </Button>
          <Button variant="contained" color="secondary" onClick={handleOpenEdit} style={{ marginRight: '8px' }}>
            Edit Drug
          </Button>
          <Button variant="contained" onClick={handleOpenRefill} style={{ marginRight: '8px' }}>
            Refill Drug
          </Button>
          <Button variant="contained" color="error" onClick={handleOpenRemove}>
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
        <Dialog open={openAdd} onClose={handleCloseAdd}>
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
                    value={drugInfo.name}
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
                    value={drugInfo.quantity}
                  />
                </Form.Item>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAdd} color="primary">
                Cancel
              </Button>
              <Button onClick={handleOpenBulkAdd} style={{ marginRight: '8px' }}>
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
        <Dialog open={openBulkAdd} onClose={handleCloseBulkAdd}>
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
              value={bulkDrugs}
              onChange={handleBulkChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBulkAdd} color="primary">
              Cancel
            </Button>
            <Button onClick={handleBulkAddDrugs} color="primary">
              Add Drugs
            </Button>
          </DialogActions>
        </Dialog>


        {/* Edit Drug Dialog */}
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Edit Drug</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel>Select Drug</InputLabel>
              <Select
                value={selectedDrug}
                onChange={(e) => {
                  const selected = drugs.find(drug => drug.id === e.target.value);
                  setSelectedDrug(selected);
                  setDrugInfo(selected);
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
              value={drugInfo.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="brandName"
              label="Brand Name"
              type="text"
              fullWidth
              value={drugInfo.brandName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={drugInfo.quantity}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditDrug} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Refill Drug Dialog */}
        <Dialog open={openRefill} onClose={handleCloseRefill}>
          <DialogTitle>Refill Drug</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel>Select Drug</InputLabel>
              <Select
                value={selectedDrug}
                onChange={(e) => {
                  const selected = drugs.find(drug => drug.id === e.target.value);
                  setSelectedDrug(selected.id);
                  setDrugInfo({ ...selected, quantity: '' });
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
              value={drugInfo.quantity}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRefill} color="primary">
              Cancel
            </Button>
            <Button onClick={handleRefillDrug} color="primary">
              Refill
            </Button>
          </DialogActions>
        </Dialog>

        {/* Remove Drug Dialog */}
        <Dialog open={openRemove} onClose={handleCloseRemove}>
          <DialogTitle>Remove Drug</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel>Select Drug</InputLabel>
              <Select
                value={selectedDrug}
                onChange={(e) => setSelectedDrug(e.target.value)}
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
            <Button onClick={handleCloseRemove} color="primary">
              Cancel
            </Button>
            <Button onClick={handleOpenBulkRemove}>
              Bulk Remove Drugs
            </Button>
            <Button variant="contained" onClick={handleRemoveDrug} color="primary">
              Remove
            </Button>
          </DialogActions>
        </Dialog>

        {/* {bulk remove drugs} */}
        <Dialog open={openBulkRemove} onClose={handleCloseBulkRemove}>
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
            <Button onClick={handleCloseBulkRemove} color="primary">
              Cancel
            </Button>
            <Button onClick={handleBulkRemoveDrugs} color="primary">
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