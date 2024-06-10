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
import httpRequest from './httpRequest';
import useAsyncData from './useAsyncData';
import LoadingSpinners from './loadingSpinners';
import { GetCookie } from './cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Form,Radio } from "antd";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddDrug from "./addDrug";


function convertStringToArray(str) {
    return str.split(',').map(function (item) {
        return item.trim();
    }).filter(function (item) {
        return item !== '';
    });
}
async function addVisit(values, patientId, userId) {
   

    console.log(values)

    let newVisit = { ...values }
    newVisit.visitDate = values.visitDate ? values.visitDate : dayjs().format("DD / MMM / YYYY")
    newVisit.patientId = patientId
    newVisit.userId = userId
    if (newVisit.otherDrug)
        values.otherDrug = convertStringToArray(values.otherDrug)

    const response = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/visit/createVisitHistory", newVisit, "post")
    return response









}

async function getDrugs() {

    const drugs = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/getAllDrugs")
    return drugs.drugs







}

const NewVIsit = (props) => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false)
    const paitentId = props.paitent._id

    const userId = JSON.parse(GetCookie("user")).id
    const onFinish = async (values) => {
        setSubmitLoading(true)

        let res = await addVisit(values, paitentId, userId)
        setSubmitLoading(false)

        if (res.sucess) {
            toast.success("Sucessfully added visit")
            form.resetFields();
        }
        else {
            toast.error(res.message)
        }


    };

    const { data, isLoading, error } = useAsyncData(getDrugs, []);



    if (isLoading || error) {
        return (
            <LoadingSpinners size={3} className={"w-full h-full"} />
        )
    }



    return (
        <div className={props.className} style={props.style}>

            <div className='p-3 '>



                <Form form={form} name="visit_history_form" onFinish={onFinish}>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Form.Item
                                    name="visitDate"
                                    rules={[{ required: true }]}
                                    initialValue={dayjs()}

                                >
                                    <DatePicker className="w-full" label={"Visit date"} />





                                </Form.Item>
                            </LocalizationProvider>

                            <div className="grid grid-cols-2">

                                <div>
                                    <label htmlFor="reasonGroup">
                                        <p className="mb-3 text-[1rem] text-gray-600">Reason for Visit</p>
                                    </label>
                                   

                                    <Form.Item
                                        name="reason"
                                        rules={[{ required: true }]}
                                    >

                                        <Radio.Group  name="reasonGroup">
                                          
                                          <div className="flex flex-col">
                                          <Radio value="start" > Start</Radio>
                                            <Radio value="refill">Refill</Radio>
                                            <Radio value="switch">Switch</Radio>
                                          </div>
                                        </Radio.Group>
                                    </Form.Item>

                                </div>

                                <Form.Item
                                    name="weight"
                                    rules={[{ required: true }]}


                                >

                                    <TextField size="small" label="Weight" type="number" placeholder="Weight(Kg)" />

                                </Form.Item>


                                <div>
                                    <label htmlFor="inoutpaitentgroup">
                                        <p className="mb-3 text-[1rem] text-gray-600">In/Out paitent </p>
                                    </label>

                                    <Form.Item
                                        name="inout"
                                        rules={[{ required: true }]}
                                    >

                                        <Radio.Group name="inoutpaitentgroup">
                                        <div className="flex flex-col">

                                            <Radio value="start">Start</Radio>
                                            <Radio value="refill">Refill</Radio>
                                            </div>
                                        </Radio.Group>
                                        

                                    </Form.Item>
                                </div>
                                <Form.Item
                                    name="daysBeforeNextVisit"
                                    rules={[{ required: true }]}


                                >

                                    <TextField className="w-[90%]" size="small"   label="Days until next appointment" type="number" placeholder="Days" />

                                </Form.Item>


                                <Form.Item
                                    name="drugs"
                                    rules={[{ required: true }]}


                                >
                                    <AddDrug options={data} />
                                </Form.Item>

                                <Form.Item
                                    name="otherDrug"
                                    rules={[{ required: false }]}


                                >

                                    <TextField size="small" label="Other drugs" placeholder="Other drugs" />

                                </Form.Item>



                            </div>

                        </div>
                        <div className="flex flex-col space-y-3">
                            <Form.Item
                                name="priscriptionNumber"
                                rules={[{ required: true }]}



                            >

                                <TextField size="small" className="w-[70%]" label="Priscription NO" type="number" placeholder="Priscription NO" />

                            </Form.Item>
                            <Form.Item
                                name="monthOfSupply"
                                rules={[{ required: true }]}


                            >

                                <TextField size="small" className="w-[65%]" label="Month of supply" type="number" placeholder="Month of supply" />

                            </Form.Item>


                            <div className="grid grid-cols-2">
                                <div>
                                    <label htmlFor="TBPreventiveTherapygroup">
                                        <p className="mb-3 text-[1rem] text-gray-600">TB preventive therapy </p>
                                    </label>
                                    <Form.Item
                                        name="TBPreventiveTherapy"
                                        rules={[{ required: true }]}
                                    >

                                        <Radio.Group name="TBPreventiveTherapygroup">
                                        <div className="flex flex-col">

                                            <Radio value="Yes">Yes</Radio>
                                            <Radio value="No" >No</Radio>
                                            </div>
                                        </Radio.Group>

                                    </Form.Item>
                                </div>
                                <div>

                                    <label htmlFor="cotrimoxazoleProphylaxisgroup">
                                        <p className="mb-3 text-[1rem]  text-gray-600">Cotrimoxazole Prophylaxis </p>
                                    </label>
                                    <Form.Item

                                        name="cotrimoxazoleProphylaxis"
                                        rules={[{ required: true }]}
                                    >
                                        <Radio.Group name="cotrimoxazoleProphylaxisgroup">
                                        <div className="flex flex-col">

                                            <Radio value="Yes">Yes</Radio>
                                            <Radio value="No">No</Radio>
                                            </div>
                                        </Radio.Group>

                                    </Form.Item>
                                </div>

                            </div>
                            <Form.Item
                                name="serviceDelivery"
                                rules={[{ required: true }]}


                            >

                                <TextField size="small" className="w-[70%]" label="Service Delivery(Other, ASM, FTR,CAG,etc)" type="number" placeholder="Strength" />

                            </Form.Item>
                            <Form.Item
                                name="remarks"
                                rules={[{ required: false }]}


                            >

                                <TextField multiline size="small" className="w-[70%]" label="Additional notes" placeholder="Remarks" />

                            </Form.Item>
                        </div>



                    </div>
                    <Form.Item>
                        <div className='flex justify-center pt-2' >
                            <LoadingButton LoadingButton
                                loading={submitLoading}
                                variant="contained"
                                className="w-40 "
                                type="submit"

                            >

                                <span>SUBMIT</span>
                            </LoadingButton>
                        </div>
                    </Form.Item>


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

    );
};

export default NewVIsit;
