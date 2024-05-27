import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import BedIcon from '@mui/icons-material/Hotel';
import PersonIcon from '@mui/icons-material/Person';
import EmptyBedIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';

const initialBeds = [
  { id: 1, status: 'In Use', patient: 'Michael Scott', admissionDate: '09/12/2019', age: 67, sex: 'Male', department: 'Oncology' },
  { id: 2, status: 'Reserved', patient: 'Steve Smith', admissionDate: '01/20/2020', age: 43, sex: 'Male', department: 'Neurology' },
  { id: 3, status: 'In Use', patient: 'James Smith', admissionDate: '12/27/2019', age: 73, sex: 'Male', department: 'Cardiology' },
  { id: 4, status: 'In Use', patient: 'Cindy Love', admissionDate: '12/12/2019', age: 36, sex: 'Female', department: 'Oncology' },
  { id: 5, status: 'In Use', patient: 'James Johnson', admissionDate: '11/12/2019', age: 37, sex: 'Male', department: 'Cardiology' },
  { id: 6, status: 'In Use', patient: 'Maria Garcia', admissionDate: '01/15/2020', age: 64, sex: 'Female', department: 'Neurology' },
  { id: 7, status: 'Empty', patient: '', admissionDate: '', age: '', sex: '', department: 'Oncology' },
  { id: 8, status: 'In Use', patient: 'Robert Scott', admissionDate: '01/01/2020', age: 84, sex: 'Male', department: 'Cardiology' },
];

const StyledButton = styled(Button)({
  backgroundColor: '#047857',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#065f46',
  },
});

const BedManagement = () => {
  const [beds, setBeds] = useState(initialBeds);
  const [department, setDepartment] = useState('All Departments');
  const [status, setStatus] = useState('All');
  const [openAddBed, setOpenAddBed] = useState(false);
  const [openAssignBed, setOpenAssignBed] = useState(false);
  const [newBed, setNewBed] = useState({ department: '', status: 'Empty' });
  const [assignDepartment, setAssignDepartment] = useState('');
  const [assignBedId, setAssignBedId] = useState('');
  const [atrNumber, setAtrNumber] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleStatusChange = (status) => {
    setStatus(status);
  };

  const handleOpenAddBed = () => {
    setOpenAddBed(true);
  };

  const handleCloseAddBed = () => {
    setOpenAddBed(false);
  };

  const handleOpenAssignBed = () => {
    setOpenAssignBed(true);
  };

  const handleCloseAssignBed = () => {
    setOpenAssignBed(false);
  };

  const handleAddBed = () => {
    setBeds([...beds, { id: beds.length + 1, ...newBed }]);
    handleCloseAddBed();
  };

  const handleAssignBed = () => {
    // Here you would fetch patient info based on the ATR number from your database
    const patientInfo = {
      patient: 'John Doe', // Example patient data
      admissionDate: '05/10/2023',
      age: 45,
      sex: 'Male',
    };

    const updatedBeds = beds.map((bed) => {
      if (bed.id === parseInt(assignBedId, 10)) {
        return {
          ...bed,
          status: 'In Use',
          ...patientInfo,
        };
      }
      return bed;
    });

    setBeds(updatedBeds);
    handleCloseAssignBed();
  };

  const filteredBeds = beds.filter((bed) => {
    const matchesDepartment = department === 'All Departments' || bed.department === department;
    const matchesStatus = status === 'All' || bed.status === status;
    const matchesSearch = searchTerm === '' || bed.patient.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDepartment && matchesStatus && matchesSearch;
  });

  const handleStatusToggle = (id) => {
    setSelectedBed(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmStatusChange = () => {
    const updatedBeds = beds.map((bed) => {
      if (bed.id === selectedBed) {
        if (bed.status === 'In Use') {
          return {
            ...bed,
            status: 'Empty',
            patient: '',
            admissionDate: '',
            age: '',
            sex: '',
          };
        } else if (bed.status === 'Empty' || bed.status === 'Reserved') {
          setAssignBedId(bed.id);
          setOpenAssignBed(true);
          return bed;
        }
      }
      return bed;
    });

    setBeds(updatedBeds);
    setConfirmDialogOpen(false);
    setSelectedBed(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box display="flex" height="100vh">
      <Box width="250px" bgcolor="#f5f5f5" p={2} flexShrink={0}>
        <FormControl fullWidth>
          <InputLabel>Room</InputLabel>
          <Select value={department} onChange={handleDepartmentChange}>
            <MenuItem value="All Departments">All Departments</MenuItem>
            <MenuItem value="Oncology">Oncology</MenuItem>
            <MenuItem value="Neurology">Neurology</MenuItem>
            <MenuItem value="Cardiology">Cardiology</MenuItem>
          </Select>
        </FormControl>
        <Box mt={2}>
          <StyledButton onClick={handleOpenAddBed} fullWidth>Add Bed</StyledButton>
          <StyledButton onClick={handleOpenAssignBed} fullWidth sx={{ mt: 2 }}>Assign Bed</StyledButton>
        </Box>
      </Box>
      <Box flexGrow={1} p={4} overflow="auto">
        <Box mb={4}>
          <TextField
            fullWidth
            label="Search by Patient Name"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>

        <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ mb: 4 }}>
          <StyledButton onClick={() => handleStatusChange('All')} variant={status === 'All' ? 'contained' : 'outlined'}>All</StyledButton>
          <StyledButton onClick={() => handleStatusChange('In Use')} variant={status === 'In Use' ? 'contained' : 'outlined'}>Occupied</StyledButton>
          <StyledButton onClick={() => handleStatusChange('Empty')} variant={status === 'Empty' ? 'contained' : 'outlined'}>Not Occupied</StyledButton>
          <StyledButton onClick={() => handleStatusChange('Reserved')} variant={status === 'Reserved' ? 'contained' : 'outlined'}>Reserved</StyledButton>
        </ButtonGroup>

        <Grid container spacing={4}>
          {filteredBeds.map((bed) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={bed.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Bed {bed.id}</Typography>
                    <IconButton onClick={() => handleStatusToggle(bed.id)}>
                      {bed.status === 'In Use' ? <PersonIcon color="error" /> : <EmptyBedIcon color="primary" />}
                    </IconButton>
                  </Box>
                  <Typography color="textSecondary">Status: {bed.status}</Typography>
                  {bed.patient && (
                    <>
                      <Typography color="textSecondary">Patient: {bed.patient}</Typography>
                      <Typography color="textSecondary">Admission Date: {bed.admissionDate}</Typography>
                      <Typography color="textSecondary">Age: {bed.age}</Typography>
                      <Typography color="textSecondary">Sex: {bed.sex}</Typography>
                      <Typography color="textSecondary">Department: {bed.department}</Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openAddBed} onClose={handleCloseAddBed}>
          <DialogTitle>Add Bed</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>Department</InputLabel>
              <Select
                value={newBed.department}
                onChange={(e) => setNewBed({ ...newBed, department: e.target.value })}
              >
                <MenuItem value="Oncology">Oncology</MenuItem>
                <MenuItem value="Neurology">Neurology</MenuItem>
                <MenuItem value="Cardiology">Cardiology</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddBed} color="primary">Cancel</Button>
            <StyledButton onClick={handleAddBed}>Add</StyledButton>
          </DialogActions>
        </Dialog>

        <Dialog open={openAssignBed} onClose={handleCloseAssignBed}>
          <DialogTitle>Assign Bed</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select the department and available bed, and enter the ATR number to assign a patient to a bed.
            </DialogContentText>
            <FormControl fullWidth margin="normal">
              <InputLabel>Department</InputLabel>
              <Select
                value={assignDepartment}
                onChange={(e) => setAssignDepartment(e.target.value)}
              >
                <MenuItem value="Oncology">Oncology</MenuItem>
                <MenuItem value="Neurology">Neurology</MenuItem>
                <MenuItem value="Cardiology">Cardiology</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Available Beds</InputLabel>
              <Select
                value={assignBedId}
                onChange={(e) => setAssignBedId(e.target.value)}
              >
                {beds.filter(bed => bed.department === assignDepartment && bed.status === 'Empty').map(bed => (
                  <MenuItem key={bed.id} value={bed.id}>Bed {bed.id}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              label="ATR Number"
              type="text"
              fullWidth
              value={atrNumber}
              onChange={(e) => setAtrNumber(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAssignBed} color="primary">Cancel</Button>
            <StyledButton onClick={handleAssignBed}>Assign</StyledButton>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
          <DialogTitle>Confirm Status Change</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to change the status of this bed?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialogOpen(false)} color="primary">Cancel</Button>
            <StyledButton onClick={handleConfirmStatusChange}>Confirm</StyledButton>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default BedManagement;