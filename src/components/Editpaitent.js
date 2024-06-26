import React, { useEffect, useState, useRef } from "react";


import httpRequest from "./httpRequest";
import useAsyncData from "./useAsyncData";
import LoadingSpinners from "./loadingSpinners";
import { useNavigate } from "react-router-dom";
import { Button, Divider, MenuItem, TextField } from '@mui/material';


import { Form, Modal, Popconfirm, Radio, Card } from 'antd';

import dayjs from 'dayjs';
import { LoadingButton } from "@mui/lab";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';










async function editPaitent(patient, atrNumber) {

    patient.patientStatus = patient.patientStatus.target ? patient.patientStatus.target.value : patient.patientStatus
    patient.previousExposure = patient.previousExposure.target ? patient.previousExposure.target.value : patient.previousExposure



    let res = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/patient/updateAtrPatient/" + atrNumber, patient, "put")
    if (res)
        return res.patient
    return 0



}
function strTODate(date) {


    return new Date(date)
}

function EditPaitent(props) {
   

    const navigate = useNavigate()

    const FormRef = useRef();
    const [previousARV, setPreviousARV] = useState(null)


    const [addLoading, setAddLoading] = useState(false)

    let patient = props.data

    return (
        <Modal
            destroyOnClose
            className="p-5 absolute top-[1vh] !w-[95vw] "


            title={"Edit Patient"}

            open={props.isEditModalOpen}


            closable={false}
            footer={

                <div className='flex justify-end space-x-3'>


                    <Button onClick={() => {
                        props.setIsEditModalOpen(false)
                        setPreviousARV(null)
                        setAddLoading(false)
                    }}


                        className='!rounded-xl' variant='outlined' color='error'>Cancel</Button>



                    <LoadingButton
                        loading={addLoading}
                        variant="contained"
                        className="w-40 "

                        onClick={
                            () => {
                                FormRef.current.submit()
                            }
                        }
                    >

                        <span>Save</span>
                    </LoadingButton>

                </div>

            }
        >

            <div className={props.className} style={props.style}>

                <div className="!p-5 !h-[75vh] overflow-y-scroll ">
                    <Form
                        onFinish={async (x) => {

                            setAddLoading(true)
                            const res = await editPaitent(x, patient.atrNumber)
                            setAddLoading(false)
                            if (res) {
                                props.setIsEditModalOpen(false)
                                props.saveEdit(res)

                            }
                            else {
                                toast.error("Regstration failed");

                            }




                            return 0

                        }}
                        ref={FormRef}
                    >


                        <div className="flex flex-col space-y-5">
                            <div className='flex space-x-1'>
                                <p className='text-sm font-medium text-gray-500'> Edit Profile of : </p>
                                <p className='text-sm text-gray-900'> {patient.fullName}</p>

                            </div>
                            <div className='flex space-x-1'>
                                <p className='text-sm font-medium text-gray-500'> ATR NO : </p>
                                <p className='text-sm text-gray-900'> {patient.atrNumber}</p>
                            </div>
                            <Card>
                                <p className="mb-6 text-[1.2rem] text-gray-600">Personal information</p>


                                <div className="grid grid-cols-6 gap-4">


                                    <Form.Item

                                        name="fullName"
                                        initialValue={patient.fullName}
                                        rules={[{ required: true }]}

                                    >
                                        <TextField label="fullname" size="small"


                                            placeholder="Full name" />

                                    </Form.Item>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Form.Item
                                            name="birthDate"
                                            initialValue={dayjs(patient.birthDate)}

                                            rules={[{ required: true }]}
                                        >
                                            <DatePicker size="small" label={"Birth date"} />





                                        </Form.Item>
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Form.Item
                                            name="dateEligible"
                                            initialValue={dayjs(patient.dateEligible)}

                                            rules={[{ required: true }]}
                                        >
                                            <DatePicker size="small" label={"Date eligible"} />





                                        </Form.Item>
                                    </LocalizationProvider>

                                    <Form.Item
                                        initialValue={patient.phoneNumber}

                                        name="phoneNumber"
                                        rules={[{ required: true }]}
                                    >
                                        <TextField size="small" label="Phonenumber"

                                            placeholder="Phonenumber" />

                                    </Form.Item>
                                    <Form.Item
                                        name="weight"
                                        initialValue={patient.weight}


                                        rules={[{ type: Number, required: true }]}
                                    >
                                        <TextField size="small" label="Weight on start"

                                            placeholder="Weight on start" />

                                    </Form.Item>

                                    <Form.Item
                                        name="subCity"
                                        initialValue={patient.subCity}

                                        rules={[{ required: true }]}
                                    >
                                        <TextField size="small" label="sub city"

                                            placeholder="sub city" />

                                    </Form.Item>
                                    <Form.Item
                                        name="wereda"
                                        initialValue={patient.wereda}

                                        rules={[{ required: true }]}
                                    >
                                        <TextField size="small" label="Wereda"

                                            placeholder="Wereda" />

                                    </Form.Item>
                                    <Form.Item

                                        name="kebele"
                                        initialValue={patient.kebele}

                                        rules={[{ required: true }]}
                                    >
                                        <TextField size="small" label="Kebele"

                                            placeholder="Kebele" />

                                    </Form.Item>
                                    <Form.Item
                                        name="houseNumber"
                                        initialValue={patient.houseNumber}

                                        rules={[{ required: true }]}
                                    >
                                        <TextField size="small" label="House number"

                                            placeholder="House number" />

                                    </Form.Item>

                                    <Form.Item
                                        initialValue={patient.sex}

                                        name="sex"
                                        rules={[{ required: true }]}
                                    >

                                        <TextField
                                            size="small"
                                            select
                                            label="Sex"
                                            className="w-full"
                                        >
                                            {[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }]
                                                .map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                        </TextField>








                                    </Form.Item>
                                    <Form.Item
                                        initialValue={patient.severityLevel}

                                        name="severityLevel"
                                        rules={[{ required: true }]}
                                    >

                                        <TextField
                                            size="small"
                                            select
                                            label="Severity"
                                            className="w-full"
                                        >
                                            {[{ value: 1, label: "Early" }, { value: 2, label: "Mild" }, { value: 3, label: "Severe" }].map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>





                                    </Form.Item>


                                </div>
                            </Card>
                            <Card>
                                <div className="flex flex-col">
                                    <p className="mb-6 text-[1.2rem] text-gray-600">Support person's information</p>

                                    <div className="grid grid-cols-6 gap-4">


                                        <Form.Item
                                            initialValue={patient.supporterName}

                                            name="supporterName"
                                            rules={[{ required: true }]}
                                        >
                                            <TextField size="small" label="Name"

                                                placeholder="Name" />

                                        </Form.Item>


                                        <Form.Item
                                            initialValue={patient.supporterPhone}

                                            name="supporterPhone"
                                            rules={[{ required: true }]}
                                        >
                                            <TextField size="small" label="Phonenumber"

                                                placeholder="Phonenumber" />

                                        </Form.Item>


                                        <Form.Item
                                            initialValue={patient.supporterSubCity}

                                            name="supporterSubcity"
                                            rules={[{ required: true }]}
                                        >
                                            <TextField size="small" label="Sub city"

                                                placeholder="Sub city" />

                                        </Form.Item>
                                        <Form.Item
                                            initialValue={patient.supporterWereda}

                                            name="supporterWereda"
                                            rules={[{ required: true }]}
                                        >
                                            <TextField size="small" label="Wereda"

                                                placeholder="Wereda" />

                                        </Form.Item>
                                        <Form.Item
                                            initialValue={patient.supporterKebele}

                                            name="supporterKebele"
                                            rules={[{ required: true }]}
                                        >
                                            <TextField size="small" label="Kebele"

                                                placeholder="Kebele" />

                                        </Form.Item>
                                        <Form.Item
                                            initialValue={patient.supporterHouseNumber}

                                            name="supporterHouseNumber"
                                            rules={[{ required: true }]}
                                        >
                                            <TextField size="small" label="House number"

                                                placeholder="House number" />

                                        </Form.Item>





                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div className="flex flex-col space-y-14">
                                    <p className="mb-6 text-[1.2rem] text-gray-600">Clinical information</p>
                                    <div className="flex space-x-40">
                                        <div className="flex flex-col">
                                            <div>
                                                <label htmlFor="previousARVGroup">
                                                    <p className="mb-3 text-[1rem] text-gray-600">Previous exposure to ARVs</p>
                                                </label>
                                                <Form.Item
                                                    initialValue={patient.previousExposure}

                                                    name="previousExposure"
                                                    rules={[{ required: true }]}
                                                >

                                                    <Radio.Group onChange={(x) => {

                                                        setPreviousARV(x.currentTarget.value)
                                                    }} name="previousARVGroup">
                                                        <div className="flex flex-col">

                                                            <Radio size="sm" value="Naive" >Naive</Radio>
                                                            <Radio size="sm" value="Non-Naive">Non-Naive</Radio>
                                                        </div>
                                                    </Radio.Group>

                                                </Form.Item>
                                            </div>
                                            {
                                                previousARV === "Non-Naive" ?
                                                    <Form.Item

                                                        name="NonNaiveRegimen"
                                                        rules={[{ required: true }]}
                                                    >
                                                        <TextField size="small" label="Non-Naive regimen"

                                                            placeholder="Non-Naive regimen" />

                                                    </Form.Item>
                                                    : null

                                            }

                                            <div>

                                            </div>

                                        </div>

                                        <div>
                                            <label htmlFor="currentStatus">
                                                <p className="mb-3 text-[1rem] text-gray-600">Current status</p>
                                            </label>
                                            <Form.Item
                                                initialValue={patient.patientStatus}

                                                name="patientStatus"
                                                rules={[{ required: true }]}
                                            >

                                                <Radio.Group name="currentStatus">
                                                    <div className="flex flex-col">

                                                        <Radio size="sm" value="onActivereatment">On active treatment</Radio>
                                                        <Radio size="sm" value="stoppedByPhysician" >Stopped treatment by physician</Radio>
                                                        <Radio size="sm" value="lostForFollowUp" >Lost for follow up</Radio>
                                                        <Radio size="sm" value="deceased" >Deceased</Radio>
                                                    </div>
                                                </Radio.Group>

                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="flex items-stretch w-full space-x-10">
                                        <Form.Item
                                            initialValue={patient.sideEffect}

                                            className="w-full "
                                            name="sideEffect"
                                            rules={[{ required: false }]}


                                        >

                                            <TextField rows={4} multiline size="small" className="flex-1 w-full" label="History of ADR and side effects (optional)" placeholder="Details about event" />

                                        </Form.Item>

                                        <Form.Item
                                            initialValue={patient.concomitantDisease}

                                            className="w-full "
                                            name="concomitantDisease"
                                            rules={[{ required: false }]}


                                        >

                                            <TextField rows={4} multiline size="small" className="flex-1 w-full" label=" Concomitant diseases (optional)" placeholder="Details about event" />

                                        </Form.Item>

                                        <Form.Item
                                            initialValue={patient.additionalNote}

                                            className="w-full "
                                            name="additionalNote"
                                            rules={[{ required: false }]}


                                        >

                                            <TextField rows={4} multiline size="small" className="flex-1 w-full" label="Reason for change or other remarks (optional)" placeholder="Details about event" />

                                        </Form.Item>


                                    </div>

                                </div>
                            </Card>


                        </div>




                    </Form>


                </div>
            </div >
        </Modal >

    );
}

export default EditPaitent;
