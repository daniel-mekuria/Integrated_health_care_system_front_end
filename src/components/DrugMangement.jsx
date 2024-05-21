import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
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
  Paper
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const initialDrugs = [
  { id: '1', name: 'Drug One', brandName: 'Brand A', quantity: 100 },
  { id: '2', name: 'Drug Two', brandName: 'Brand B', quantity: 200 },
];

const DrugManagement = () => {
  const [drugs, setDrugs] = useState(initialDrugs);
  const [openAdd, setOpenAdd] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [openEdit, setOpenEdit] = useState(false);
  const [openRefill, setOpenRefill] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState('');
  const [drugInfo, setDrugInfo] = useState({
    id: '',
    name: '',
    brandName: '',
    quantity: ''
  });

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenRefill = () => setOpenRefill(true);
  const handleCloseRefill = () => setOpenRefill(false);
  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrugInfo({
      ...drugInfo,
      [name]: value,
    });
  };

  const handleAddDrug = () => {
    setDrugs([...drugs, drugInfo]);
    setDrugInfo({ id: '', name: '', brandName: '', quantity: '' });
    handleCloseAdd();
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
    return (
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.id.includes(searchTerm)
    );
  });
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'med one',
        data: [20, 50, 30, 70, 40, 90],
        backgroundColor: '#3b82f6',
      },
      {
        label: 'med two',
        data: [30, 70, 40, 60, 80, 50],
        backgroundColor: '#f472b6',
      },
      {
        label: 'med three',
        data: [40, 60, 90, 50, 30, 20],
        backgroundColor: '#eab308',
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

      <Box mt={4}>
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
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleOpenAdd} style={{ marginRight: '8px' }}>
          Add Drug
        </Button>
        <Button variant="contained" color="secondary" onClick={handleOpenEdit} style={{ marginRight: '8px' }}>
          Edit Drug
        </Button>
        <Button variant="contained"  onClick={handleOpenRefill} style={{ marginRight: '8px' }}>
          Refill Drug
        </Button>
        <Button variant="contained" color="error" onClick={handleOpenRemove}>
          Remove Drug
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Brand Name</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDrugs.map((drug) => (
                <TableRow key={drug.id}>
                  <TableCell>{drug.id}</TableCell>
                  <TableCell>{drug.name}</TableCell>
                  <TableCell>{drug.brandName}</TableCell>
                  <TableCell>{drug.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add Drug Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Drug</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="id"
            label="ID"
            type="text"
            fullWidth
            value={drugInfo.id}
            onChange={handleChange}
          />
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
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddDrug} color="primary">
            Add
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
          <Button onClick={handleRemoveDrug} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    <div className="btns space-y-2">
        <Button variant="contained" className='bg-green'  style={{ marginRight: '8px' }}>
          Emergency Drug dispensing
        </Button>
        <Button variant="contained"  style={{ marginRight: '8px' }}>
          Local Patient dispensing 
        </Button>
    </div>
    </div>
  );
};

export default DrugManagement;
