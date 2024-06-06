import React, { useState, useRef } from "react";

import {

  Autocomplete,
  Button,
  TextField,

} from "@mui/material";

import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import httpRequest from "./httpRequest";
import { GetCookie } from "./cookies";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Popconfirm, Select } from "antd";





async function bookBed(patientId, bedId) {

  let bed = {}

  bed.patientId = patientId
  bed.bedId = bedId


  const res = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/bed/bookBed", bed, "post")
  return res







}

async function addBed(bed) {




  const res = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/bed/addBed", bed, "post")
  return res



}


async function freeBed(id) {


  const res = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/bed/freeBed/" + id, {}, "delete")
  return res


}
const EditBed = (props) => {
  let data = props.data
  const navigate = useNavigate()
  const [addLoading, setAddLoading] = useState(false)


  const editFormRef = useRef()


  const userId = JSON.parse(GetCookie("user")).id
  const userRole = JSON.parse(GetCookie("user")).role






  return (
    <div>
      <Modal
        destroyOnClose
        closable={false}
        title={"Bed: " + data.bed.bedNumber}
        open={props.isOpen}
        footer={

          <div className='flex justify-end space-x-3'>


            <Button onClick={() => {
              props.setIsOpen(false)

            }}


              className='!rounded-xl' variant='outlined' color='error'>Cancel</Button>



            <Popconfirm

              okButtonProps={{ danger: true }}
              title={"are you sure"}
              okText={"Unbook"}
              onConfirm={async () => {
                setAddLoading(true)
                const res = await freeBed(data.bed._id)
                setAddLoading(false)
                if (res.sucess) {
                  toast.success("Unbooked successfully");
                  props.setIsOpen(false)
                  setTimeout(() => {
                    props.update()
                  }, 2000);
                }
                else {
                  toast.error(res.message);

                }

              }}
            >
              <LoadingButton
                loading={addLoading}
                variant="contained"
                className="w-40 "
                color="error"


              >

                <span>Unbook</span>
              </LoadingButton>
            </Popconfirm>




          </div>

        }
      >





        <div className='grid grid-cols-2 gap-3 p-5'>


          <div className="flex space-x-2">
            <p className='text-sm font-medium text-gray-500'> Room:</p>
            <p className='text-sm text-gray-900'> {data.bed.room}</p>


          </div>
          <div className="flex space-x-2">
            <p className='text-sm font-medium text-gray-500'> Patient Name:</p>
            <p className='text-sm text-gray-900'> {data.occupied ? data.patient.fullName : null}</p>


          </div>
          <div className="flex space-x-2">
            <p className='text-sm font-medium text-gray-500'> Sex:</p>
            <p className='text-sm text-gray-900'> {data.occupied ? data.patient.sex : null}</p>


          </div>
          <div className="flex space-x-2">
            <p className='text-sm font-medium text-gray-500'> Age:</p>
            <p className='text-sm text-gray-900'> {data.occupied ? data.patient.age : null}</p>


          </div>
          <div className="flex space-x-2">
            <p className='text-sm font-medium text-gray-500'> Admission Date:</p>
            <p className='text-sm text-gray-900'> {data.occupied ? data.admissionDate : null}</p>


          </div>
        </div>

      </Modal>

    </div>

  );
};
const AssignBed = (props) => {
  let data = props.data
  const navigate = useNavigate()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [patient, setPatient] = useState(null)


  const editFormRef = useRef()


  const userId = JSON.parse(GetCookie("user")).id
  const userRole = JSON.parse(GetCookie("user")).role






  return (
    <div>
      <Modal
        destroyOnClose
        closable={false}
        title={"Bed: " + data.bed.bedNumber}
        open={props.isOpen}
        footer={

          <div className='flex justify-end space-x-3'>


            <Button onClick={() => {
              props.setIsOpen(false)

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

              <span>Assign</span>
            </LoadingButton>


          </div>

        }
      >





        <div className='flex flex-col p-5 space-y-6'>


          <div className="grid grid-cols-2 gap-4">
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium text-gray-500'> Room</p>
              <p className='text-sm text-gray-900'> {data.bed.room}</p>
            </div>

          </div>
          <Form
            ref={editFormRef}
            className='p-5'
            onFinish={

              async (x) => {
                setAddLoading(true)
                const res = await bookBed(patient._id, data.bed._id)
                setAddLoading(false)
                if (res.sucess) {
                  toast.success("Assigned successfully");
                  props.setIsOpen(false)
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
                name="patient"
                rules={[{
                  message: 'Select a patient',
                  validator: (_, value) => {
                    if (patient) {
                      return Promise.resolve(); // Validation passed
                    } else {
                      return Promise.reject('Some custom error message'); // Validation failed
                    }
                  },
                },]}

              >

                <Autocomplete
                  options={props.patients}
                  autoHighlight
                  onChange={(event, newValue) => {

                    setPatient(newValue)

                  }}
                  getOptionLabel={(option) => option.fullName}

                  renderOption={(props, option) => {
                    props.className = ' !flex !flex-col border !space-y-1 p-1 bg-gray-50 rounded-lg m-2 hover:!bg-gray-300 '
                    return (
                      <div  {...props}>
                        <div className='flex hover: '>

                          <p className='text-gray-600'> Full name:</p>
                          <p className='text-[1.15rem]' >{option.fullName}</p>

                        </div>
                        <div className='flex'>

                          <p className='text-gray-600' >ART number:</p>
                          <p className='text-[1.15rem]'>{option.atrNumber}</p>

                        </div>
                      </div>
                    )
                  }}
                  defaultValue={null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Patient"
                    />
                  )}
                />

              </Form.Item>
            </div>





          </Form>
        </div>

      </Modal>

    </div>

  );
};
const AddBed = (props) => {
  let data = props.data
  const navigate = useNavigate()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [patient, setPatient] = useState(null)


  const editFormRef = useRef()


  const userId = JSON.parse(GetCookie("user")).id
  const userRole = JSON.parse(GetCookie("user")).role






  return (
    <div>
      <Modal
        destroyOnClose
        closable={false}
        title={"Add bed"}
        open={props.isOpen}
        footer={

          <div className='flex justify-end space-x-3'>


            <Button onClick={() => {
              props.setIsOpen(false)

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

              <span>Add</span>
            </LoadingButton>


          </div>

        }
      >





        <div className='flex flex-col p-5 space-y-6'>


          <Form
            ref={editFormRef}
            className='p-5'
            onFinish={

              async (x) => {
                setAddLoading(true)
                const res = await addBed(x)
                setAddLoading(false)
                if (res.sucess) {
                  toast.success("Added successfully");
                  props.setIsOpen(false)
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
                name="room"
                rules={[{ required: true }]}

              >
                <TextField label="Room" size="small"

                  className="w-full"
                  placeholder="Room" />



              </Form.Item>
              <Form.Item
                name="bedNumber"
                rules={[{ required: true }]}

              >
                <TextField label="Bed number" size="small"
                  className="w-full"


                  placeholder="Bed number" />



              </Form.Item>
            </div>





          </Form>
        </div>

      </Modal>

    </div>

  );
};

export { EditBed, AssignBed, AddBed };
