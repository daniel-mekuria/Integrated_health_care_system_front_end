import React, { useRef, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { countries } from 'countries-list';


import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,

  TextField,
  Select,
  MenuItem,
  InputLabel,

  Checkbox,

  Autocomplete
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { BarChart } from '@mui/x-charts';
import { Badge, Form, Modal, Tabs } from 'antd';
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
import EmergencyVisit from './emergencyVisit';
import EmergencyHistory from '../components/emergencyHistory';



async function getPharmacy() {
  let totaldrugs = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/DispencedDrugCount/" + dayjs().date())
  totaldrugs = totaldrugs.totalAmount

  let drugs = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/getAllDrugs")
  const allvisits = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/emergency/AllEmergencyPatients" )


  drugs = drugs.drugs

  const batchesArray = drugs.flatMap(drug =>
    drug.batch.map(batch => ({
      ...batch,
      _id: drug._id,
      id: drug._id + batch.batchNumber,
      drugName: drug.drugName,
      dose: drug.dose,
      manufacturer: drug.manufacturer,
      country: drug.country,
      combination: drug.combination,
      __v: drug.__v
    }))
  );
  drugs = drugs.map((drug) => {
    let quantity = 0
    let expireDate = null
    drug.batch.map((batch) => {
      expireDate = expireDate ? (dayjs(expireDate).isAfter(dayjs(batch.expireDate)) ? batch.expireDate : expireDate) : batch.expireDate
      quantity += Number(batch.quantity)
    })
    drug.quantity = quantity
    drug.expireDate = expireDate
    drug.id = drug._id
    return drug


  })

  return { emergencyCount:allvisits.emergency.length,drugs: drugs, batches: batchesArray, totaldrugs: totaldrugs }


}

function strTODate(date) {


  return new Date(date)
}



const PharmacyMain = (props) => {
  const [drugs, setDrugs] = useState(props.drugs);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [drugToEdit, setDrugToEdit] = useState(null);
  const [drugToRefill, setDrugToRefill] = useState(null);
  const [drugToRemove, setDrugToRemove] = useState(null);
  const [batchToRemove, setBatchToRemove] = useState(null);

  const [newDrugCountry, setNewDrugCountry] = useState(null);
  const [removeFully, setRemoveFully] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const addFormRef = useRef();
  const editFormRef = useRef();
  const refillFormRef = useRef();
  const removeFormRef = useRef();


  const [addLoading, setAddLoading] = useState(false);


  const countryCodes = Object.values(countries);

  let countryNames = countryCodes.map(code => code.name);

  countryNames = countryNames.sort();

















  async function handleEditDrug(x) {
    let newdrug = {};
    newdrug.drugName = x.name
    newdrug.country = x.countryOfOrigin
    newdrug.combination = x.combination
    newdrug.manufacturer=x.manufacturer
    const response = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/updateDrug/"+x._id, newdrug, "Put")
    return response;

  }

  
  async function handleRefillDrug(x) {
 

  let newRefill = {};
  newRefill.drugId = x._id
  newRefill.batch = {batchNumber:x.batchNumber,productionDate:x.productionDate,expireDate:x.expireDate,quantity:x.quantity}
  const response = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/refillDrug", newRefill, "post")
  return response;
  
  }
  async function handleRemoveDrug(x) {
    console.log(x)

    if (x.removeFully){
      const response = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/deleteDrug/"+x._id,{}, "delete")
      return response;

    }
    else{
      const response = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/removeBatch",{drugId:x._id,batchNumber:x.batchToRemove.batchNumber}, "delete")
      return response;
    }

  }

  const handleAddDrug = async (x) => {



    let newdrug = x;
    newdrug.drugName = x.name
    newdrug.country = x.countryOfOrigin
    const response = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/addDrug", newdrug, "post")
    return response;
  };






  const totalMedicine = drugs.reduce((acc, drug) => acc + parseInt(drug.quantity), 0);
  const totalEmergencyDrugs = 158; // Placeholder value, adjust as needed

  const filteredDrugs = drugs.filter((drug) => {
    if (filter === 'lowStock' && drug.quantity > 200) return false;
    if (filter === 'almostExpired' && ((dayjs(drug.expireDate).diff(dayjs(), 'month')) > 3)) return false;
    return (
      drug.drugName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });




  const tableData = {
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










  const columns = [


    {
      field: 'drugName',
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
      field: 'manufacturer',
      headerName: 'Manufacturer',
      sortable: true,
      minWidth: 140,
      flex: 1,
    },
    {
      field: 'country',
      headerName: 'Country of origin',
      sortable: true,
      minWidth: 140,
      flex: 1,
    },


  ];




  return (
    <div className='flex flex-col h-full space-y-3'>
      <div className='flex justify-end w-full'>
        <Button className='w-1/6' onClick={() => {
          setIsEmergencyModalOpen(true)
        }} variant="contained"  >
          Emergency Drug dispensing
        </Button>
      </div>

      <div className='flex w-full h-[30%] space-x-10'>
        <Card className='w-[30%]'>
          <CardContent>
            <Typography variant="h5" component="div" fontWeight="bold" color="textPrimary">
              Total drugs Available
            </Typography>
            <Typography variant="h2" component="div" fontWeight="bold" color="textPrimary">
              {totalMedicine}
            </Typography>
          </CardContent>
        </Card>
        <Card className='w-[30%]'>
          <CardContent>
            <Typography variant="h5" component="div" fontWeight="bold" color="textPrimary">
              Total Drugs Dispensed this month
            </Typography>
            <Typography variant="h2" component="div" fontWeight="bold" color="textPrimary">
              {props.totaldrugs}
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div className='flex space-x-3 ' >
        <TextField
          label="Search Drugs"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputLabel className='mt-4'>Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="lowStock">Low Stock</MenuItem>
        </Select>
      </div>

      <div className='flex' >
        <Button variant="contained" color="primary" onClick={() => {
          setIsAddModalOpen(true)
        }} style={{ marginRight: '8px' }}>
          Add Drug
        </Button>
        <Button variant="contained" color="secondary" onClick={() => {
          setIsEditModalOpen(true)
        }} style={{ marginRight: '8px' }}>
          Edit Drug
        </Button>
        <Button variant="contained" onClick={() => {
          setIsRefillModalOpen(true)
        }} style={{ marginRight: '8px' }}>
          Refill Drug
        </Button>
        <Button onClick={() => {
          setIsRemoveModalOpen(true)
        }} variant="contained" color="error">
          Remove Drug
        </Button>
      </div>



      <DataGrid autoHeight
       getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      } 
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
              pageSize: 4,
            },
          },
        }}

      />

      {/* Add Drug Dialog */}
      <Modal
        destroyOnClose
        closable={false}
        title={"Add drug"}
        open={isAddModalOpen}
        footer={

          <div className='flex justify-end space-x-3'>


            <Button onClick={() => {
              setIsAddModalOpen(false)

            }}


              className='!rounded-xl' variant='outlined' color='error'>Cancel</Button>



            <LoadingButton
              loading={addLoading}
              variant="contained"
              className="w-40 "

              onClick={
                () => {
                  addFormRef.current.submit()
                }
              }
            >

              <span>Add</span>
            </LoadingButton>

          </div>

        }
      >
        <Form
          ref={addFormRef}
          className='p-5'
          onFinish={

            async (x) => {
              setAddLoading(true)
              const res = await handleAddDrug({ ...x, countryOfOrigin: newDrugCountry, combination: x.combination ? true : false })
              setAddLoading(false)
              if (res.sucess) {
                toast.success("Added successfully");
                setIsAddModalOpen(false)
                setTimeout(() => {
                  props.update()

                }, 2000);
              }
              else {
                toast.error(res.message);

              }


            }
          }
        >


          <div className='flex flex-col '>
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
            <Form.Item
              name="manufacturer"
              rules={[{ required: true }]}

            >
              <TextField
                margin="dense"
                name="name"
                label="Manufacturer"
                type="text"
                fullWidth
              />
            </Form.Item>
            <Form.Item
              name="countryOfOrigin"
              rules={[{ required: true }]}

            >


              <Autocomplete
                options={countryNames}
                autoHighlight
                defaultValue={null}
                onChange={(x) => {
                  setNewDrugCountry(x.target.innerText)

                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country of origin"
                  />
                )}
              />



            </Form.Item>
            <div className='flex space-x-2'>
              <p className='font-sans text-[1rem] mt-2 text-gray-600'>
                combination
              </p>
              <Form.Item
                name="combination"

                rules={[{ required: false }]}

              >
                <Checkbox />
              </Form.Item>
            </div>




          </div>

        </Form>
      </Modal>



      {/* Edit Drug Dialog */}
      <Modal
        destroyOnClose
        closable={false}
        title={"Edit drug"}
        open={isEditModalOpen}
        footer={

          <div className='flex justify-end space-x-3'>


            <Button onClick={() => {
              setIsEditModalOpen(false)
              setDrugToEdit(null)
            }}


              className='!rounded-xl' variant='outlined' color='error'>Cancel</Button>



            <LoadingButton
              loading={addLoading}
              variant="contained"
              className="w-40 "

              onClick={
                () => {
                  editFormRef.current.submit()
                }
              }
            >

              <span>Save</span>
            </LoadingButton>

          </div>

        }
      >
        <Form
          ref={editFormRef}
          className='p-5'
          onFinish={

            async (x) => {
              setAddLoading(true)
              const res = await handleEditDrug({ ...x,_id:drugToEdit._id, countryOfOrigin: newDrugCountry, combination: x.combination ? true : false })
              setAddLoading(false)
              if (res.sucess) {
                toast.success("Saved successfully");
                setIsEditModalOpen(false)
                setTimeout(() => {
                  props.update()

                }, 2000);
              }
              else {
                toast.error(res.message);

              }


            }
          }
        >


          <div className='flex flex-col '>
            <Form.Item
              name="drug"
              rules={[{ required: true }]}

            >


              <Autocomplete
                options={drugs}
                autoHighlight
                onChange={(event, newValue) => {

                  setDrugToEdit(newValue)
                  setNewDrugCountry(newValue ? newValue.country : null)
                  console.log(newValue)
                }}
                getOptionLabel={(option) => option.drugName}

                renderOption={(props, option) => {
                  props.className = ' !flex !flex-col border !space-y-1 p-1 bg-gray-50 rounded-lg m-2 hover:!bg-gray-300 '
                  return (
                    <div  {...props}>
                      <div className='flex hover: '>

                        <p className='text-gray-600'> Name:</p>
                        <p className='text-[1.15rem]' >{option.drugName}</p>

                      </div>
                      <div className='flex'>

                        <p className='text-gray-600' >Manufacturer:</p>
                        <p className='text-[1.15rem]'>{option.manufacturer}</p>

                      </div>
                    </div>
                  )
                }}
                defaultValue={null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="drug"
                  />
                )}
              />



            </Form.Item>
            {drugToEdit ? <div className='flex flex-col ' >
              <Form.Item
                name="name"
                rules={[{ required: true }]}
                initialValue={drugToEdit.drugName}

              >
                <TextField
                  margin="dense"
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                />
              </Form.Item>
              <Form.Item
                name="manufacturer"
                rules={[{ required: true }]}
                initialValue={drugToEdit.manufacturer}


              >
                <TextField
                  margin="dense"
                  name="name"
                  label="Manufacturer"
                  type="text"
                  fullWidth
                />
              </Form.Item>
              <Form.Item
                name="countryOfOrigin"
                rules={[{
                  message: 'Enter country of origin',
                  validator: (_, value) => {
                    if (newDrugCountry) {
                      return Promise.resolve(); // Validation passed
                    } else {
                      return Promise.reject('Some custom error message'); // Validation failed
                    }
                  },
                },]}


              >


                <Autocomplete
                  defaultValue={newDrugCountry}
                  value={newDrugCountry}
                  options={countryNames}
                  autoHighlight
                  onChange={(x) => {
                    console.log(x.target.innerText)
                    setNewDrugCountry(x.target.innerText)

                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country of origin"
                    />
                  )}
                />



              </Form.Item>
              <div className='flex space-x-2'>
                <p className='font-sans text-[1rem] mt-2 text-gray-600'>
                  combination
                </p>
                <Form.Item
                  name="combination"
                  rules={[{ required: false }]}

                >
                  <Checkbox checked={drugToEdit.combination} />
                </Form.Item>
              </div>

            </div>
              : null
            }

          </div>

        </Form>
      </Modal>

      {/* Refill Drug Dialog */}
      <Modal
        destroyOnClose
        closable={false}
        title={"Refill drug"}
        open={isRefillModalOpen}
        footer={

          <div className='flex justify-end space-x-3'>


            <Button onClick={() => {
              setIsRefillModalOpen(false)
              setDrugToRefill(null)
            }}


              className='!rounded-xl' variant='outlined' color='error'>Cancel</Button>



            <LoadingButton
              loading={addLoading}
              variant="contained"
              className="w-40 "

              onClick={
                () => {
                  refillFormRef.current.submit()
                }
              }
            >

              <span>Save</span>
            </LoadingButton>

          </div>

        }
      >
        <Form
          ref={refillFormRef}
          className='p-5'
          onFinish={

            async (x) => {
              setAddLoading(true)
              const res = await handleRefillDrug({ ...x,_id:drugToRefill._id})
              setAddLoading(false)
              if (res.sucess) {
                toast.success("Saved successfully");
                setIsRefillModalOpen(false)
                setTimeout(() => {
                  props.update()

                }, 2000);
              }
              else {
                toast.error(res.message);

              }


            }
          }
        >


          <div className='flex flex-col '>
            <Form.Item
              name="drug"
              rules={[{ required: true }]}

            >


              <Autocomplete
                options={drugs}
                autoHighlight
                onChange={(event, newValue) => {

                  setDrugToRefill(newValue)

                }}
                getOptionLabel={(option) => option.drugName}

                renderOption={(props, option) => {
                  props.className = ' !flex !flex-col border !space-y-1 p-1 bg-gray-50 rounded-lg m-2 hover:!bg-gray-300 '
                  return (
                    <div  {...props}>
                      <div className='flex hover: '>

                        <p className='text-gray-600'> Name:</p>
                        <p className='text-[1.15rem]' >{option.drugName}</p>

                      </div>
                      <div className='flex'>

                        <p className='text-gray-600' >Manufacturer:</p>
                        <p className='text-[1.15rem]'>{option.manufacturer}</p>

                      </div>
                    </div>
                  )
                }}
                defaultValue={null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="drug"
                  />
                )}
              />



            </Form.Item>
            {drugToRefill ? <div className='flex flex-col ' >
              <Form.Item
                name="batchNumber"
                rules={[{ required: true }]}

              >
                <TextField
                  margin="dense"
                  name="name"
                  label="Batch number"
                  type="text"
                  fullWidth
                />
              </Form.Item>



              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Form.Item
                  name="productionDate"
                  rules={[{ required: true }]}

                >
                  <DatePicker className="w-full mt-0" label={"Production date"} />





                </Form.Item>
                <Form.Item
                  name="expireDate"
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

                  name="name"
                  label="quantity"
                  type="number"
                  fullWidth
                />
              </Form.Item>



            </div>
              : null
            }

          </div>

        </Form>
      </Modal>
      {/* Remove Drug Dialog */}
      <Modal
        destroyOnClose
        closable={false}
        title={"Remove drug"}
        open={isRemoveModalOpen}
        footer={

          <div className='flex justify-end space-x-3'>


            <Button onClick={() => {
              setIsRemoveModalOpen(false)
              setDrugToRemove(null)
            }}


              className='!rounded-xl' variant='outlined' color='error'>Cancel</Button>



            <LoadingButton
              loading={addLoading}
              variant="contained"
              className="w-40 "

              onClick={
                () => {
                  removeFormRef.current.submit()
                }
              }
            >

              <span>Save</span>
            </LoadingButton>

          </div>

        }
      >
        <Form
          ref={removeFormRef}
          className='p-5'
          onFinish={

            async (x) => {
              setAddLoading(true)
              const res = await handleRemoveDrug({ ...x,_id:drugToRemove._id,batchToRemove:batchToRemove,removeFully:removeFully})
              setAddLoading(false)
              if (res.sucess) {
                toast.success("removed successfully");
                setIsRemoveModalOpen(false)
                setTimeout(() => {
                  props.update()

                }, 2000);
              }
              else {
                toast.error(res.message);

              }


            }
          }
        >


          <div className='flex flex-col '>
            <Form.Item
              name="drug"
              rules={[{ required: true }]}

            >


              <Autocomplete
                options={drugs}
                autoHighlight
                onChange={(event, newValue) => {

                  setDrugToRemove(newValue)

                }}
                getOptionLabel={(option) => option.drugName}

                renderOption={(props, option) => {
                  props.className = ' !flex !flex-col border !space-y-1 p-1 bg-gray-50 rounded-lg m-2 hover:!bg-gray-300 '
                  return (
                    <div  {...props}>
                      <div className='flex hover: '>

                        <p className='text-gray-600'> Name:</p>
                        <p className='text-[1.15rem]' >{option.drugName}</p>

                      </div>
                      <div className='flex'>

                        <p className='text-gray-600' >Manufacturer:</p>
                        <p className='text-[1.15rem]'>{option.manufacturer}</p>

                      </div>
                    </div>
                  )
                }}
                defaultValue={null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="drug"
                  />
                )}
              />



            </Form.Item>
            {drugToRemove ? <div className='flex flex-col ' >
              <div className='flex space-x-2'>
                <p className='font-sans text-[1rem] mt-2 text-gray-600'>
                  Remove whole Drug
                </p>

                <Form.Item
                  name="RemoveFully"
                  rules={[{ required: false }]}

                >
                  <Checkbox onChange={(x) => {
                    setBatchToRemove(undefined)
                    setRemoveFully(x.target.checked)
                  }} />
                </Form.Item>

              </div>
              {
                <div>



                  <Form.Item
                    name="batch"
                    rules={[{
                      message: 'Select a batch',
                      validator: (_, value) => {
                        if (!removeFully && !batchToRemove) {
                          return Promise.reject('Some custom error message'); // Validation failed                        } else {
                        }
                        return Promise.resolve(); // Validation passed

                      },
                    },]}
                  >


                    <Autocomplete 
                    disabled={removeFully}
                      options={drugToRemove.batch}
                      autoHighlight
                      onChange={(event, newValue) => {

                        setBatchToRemove(newValue)
                      }}
                      getOptionLabel={(option) => option.batchNumber}

                      renderOption={(props, option) => {
                        props.className = ' !flex !flex-col border !space-y-1 p-1 bg-gray-50 rounded-lg m-2 hover:!bg-gray-300 '
                        return (
                          <div  {...props}>
                            <div className='flex hover: '>

                              <p className='text-gray-600'> Batch:</p>
                              <p className='text-[1.15rem]' >{option.batchNumber}</p>

                            </div>
                            <div className='flex'>

                              <p className='text-gray-600' >Quantity:</p>
                              <p className='text-[1.15rem]'>{option.quantity}</p>

                            </div>
                            <div className='flex'>

                              <p className='text-gray-600' >Expiry date:</p>
                              <p className='text-[1.15rem]'>{dayjs(option.expireDate).format("DD/MMM/YYYY")}</p>

                            </div>
                          </div>
                        )
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Batch"
                        />
                      )}
                    />



                  </Form.Item>




                </div> 

              }




            </div>
              : null
            }

          </div>

        </Form>
      </Modal>
      <EmergencyVisit isOpen={isEmergencyModalOpen} setIsOpen={setIsEmergencyModalOpen} />






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

function Batches(props) {


  const columns = [


    {
      field: 'batchNumber',
      headerName: 'Batch number',
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: 'drugName',
      headerName: 'Drug name',
      minWidth: 150,
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
      field: 'manufacturer',
      headerName: 'Manufacturer',
      sortable: true,
      minWidth: 140,
      flex: 1,
    },
    {
      field: 'country',
      headerName: 'Country of origin',
      sortable: true,
      minWidth: 140,
      flex: 1,
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

  let tableData = { "columns": columns, "rows": props.data }

  return (
    <div className='p-3'>


      <DataTable tableProps={{
        checkboxSelection: false,
        disableRowSelectionOnClick: true,
        disableDensitySelector: true,
        disableMultipleRowSelection: true,
        disableColumnSelector: true
      }} data={tableData} pageSize={11} className={" w-full h-full"} />

    </div>

  )

}
function ExpiredBatches(props) {


  const columns = [


    {
      field: 'batchNumber',
      headerName: 'Batch number',
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: 'drugName',
      headerName: 'Drug name',
      minWidth: 150,
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
      field: 'manufacturer',
      headerName: 'Manufacturer',
      sortable: true,
      minWidth: 140,
      flex: 1,
    },
    {
      field: 'country',
      headerName: 'Country of origin',
      sortable: true,
      minWidth: 140,
      flex: 1,
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
  let tableData = { "columns": columns, "rows": props.data }

  return (
    <div className='p-3'>


      <DataTable tableProps={{
        checkboxSelection: false,
        disableRowSelectionOnClick: true,
        disableDensitySelector: true,
        disableMultipleRowSelection: true,
        disableColumnSelector: true
      }} data={tableData} pageSize={11} className={" w-full h-full"} />

    </div>

  )

}


function Pharmacy(props) {


  const [expiringCount, setExpiringCount] = useState(0)
  const [emergencyCount, setEmergencyCount] = useState(0)
  const [update, setupdate] = useState(false);
  const [drugs, setDrugs] = useState(false);
function runUpdate(){
setupdate(!update)
}

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: "Drugs",

      children: <PharmacyMain update={runUpdate} drugs={drugs.drugs} totaldrugs={drugs.totaldrugs} />
    },
    {
      key: '2',
      label: "Batches",
      children: <Batches data={drugs.batches} />
      ,
    },
    {
      key: '3',
      label: <Badge color="red" showZero count={expiringCount} offset={[10, 0]}>Expiring drugs</Badge>,
      children: <ExpiredBatches data={drugs.expiring} />
      ,
    },
    {
      key: '4',
      label: <Badge color="orange" showZero count={emergencyCount} offset={[10, 0]}>Emergency dispensed</Badge>,
      children: < EmergencyHistory setCount={setEmergencyCount} />
      ,
    },

  ];

  const { data, isLoading, error } = useAsyncData(async () => {
    let result = await getPharmacy()
    let Expiringdrug = result.batches.filter((batch) => {
      if ((dayjs(batch.expireDate).diff(dayjs(), 'month')) > 6) return false;
      else return true
    })
    setExpiringCount(Expiringdrug.length)
    result.expiring = Expiringdrug
    setDrugs(result)
    setEmergencyCount(result.emergencyCount)

  }, [update]);

  if (isLoading || error) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }

  return (
    <div className={props.className} style={props.style}>

      <div className="p-4">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  )
}

export default Pharmacy;