import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  Input,

} from "@mui/material";

import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import httpRequest from "../components/httpRequest";
import useAsyncData from "../components/useAsyncData";
import LoadingSpinners from "../components/loadingSpinners";
import { GetCookie } from "../components/cookies";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Radio } from "antd";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddDrug from "../components/addDrug";


function convertStringToArray(str) {
  return str.split(',').map(function (item) {
    return item.trim();
  }).filter(function (item) {
    return item !== '';
  });
}
async function addVisit(values, userId) {


  console.log(values)

  let newVisit = { ...values }
  newVisit.visitDate = values.visitDate ? values.visitDate : dayjs().format("DD / MMM / YYYY")
  newVisit.userId = userId
  if (newVisit.otherDrug)
    values.otherDrug = convertStringToArray(values.otherDrug)

  const response = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/emergency/AddEmergencyPatient", newVisit, "post")
  return response









}

async function getDrugs() {

  const drugs = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/getAllDrugs")
  return drugs.drugs







}

const EmergencyVisit = (props) => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false)
  const [addLoading, SetAddLoading] = useState(false)

  const userId = JSON.parse(GetCookie("user")).id
  const onFinish = async (values) => {
    setSubmitLoading(true)

    let res = await addVisit(values, userId)
    setSubmitLoading(false)

    if (res.sucess) {
      toast.success("Sucessfully added Emergency visit")
      setTimeout(() => {
        // form.resetFields()
        props.setIsOpen(false)
        props.update()
      }, 2000);      
    }
    else {
      toast.error(res.message)
      setTimeout(() => {
        // form.resetFields()
        props.setIsOpen(false)
      }, 2000);
    }


  };

  const { data, isLoading, error } = useAsyncData(getDrugs, []);



  if (isLoading || error) {
    return (
      <div></div>
    )
  }



  return (
    <Modal
    destroyOnClose
    className="!w-[70vw]"
    closable={false}
    title={"Emergency dispensing"}
    open={props.isOpen}
    footer={

      <div className='flex justify-end space-x-3'>


        <Button onClick={() => {
          form.resetFields()
          
          props.setIsOpen(false)
        }}


          className='!rounded-xl' variant='outlined' color='error'>Cancel</Button>



        <LoadingButton
          loading={submitLoading}
          variant="contained"
          className="w-40 "

          onClick={
            () => {
              form.submit()
            }
          }
        >

          <span>Submit</span>
        </LoadingButton>

      </div>

    }
  >
    <div className={props.className} style={props.style}>

      <div className='p-3 '>



        <Form form={form} name="visit_history_form" onFinish={onFinish}>

          <div className="grid grid-cols-2 gap-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Form.Item
                name="Date"
                rules={[{ required: true }]}
                initialValue={dayjs()}

              >
                <DatePicker className="w-full" label={" date"} />





              </Form.Item>
            </LocalizationProvider>


            <Form.Item
              name="fullName"
              rules={[{ required: true }]}


            >

              <TextField className="w-[90%]" size="small" label="Full name"  placeholder="Full name" />

            </Form.Item>
            <Form.Item
              name="cardNumber"
              rules={[{ required: true }]}


            >

              <TextField className="w-[90%]" size="small" label="Card number"  placeholder="Card number" />

            </Form.Item>
            <Form.Item
              name="patientRegularHospital"
              rules={[{ required: true }]}


            >

              <TextField className="w-[90%]" size="small" label="Health Facility adress"  placeholder="Health Facility adress" />

            </Form.Item>


            <Form.Item
              name="drugs"
              rules={[{ required: true }]}


            >
              <AddDrug options={data} />
            </Form.Item>


          </div>

        </Form>
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
    </Modal>

  );
};

export default EmergencyVisit;
