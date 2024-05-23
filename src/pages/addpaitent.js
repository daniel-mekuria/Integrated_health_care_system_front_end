import React, { useEffect, useState, useRef } from "react";


import httpRequest from "../components/httpRequest";
import useAsyncData from "../components/useAsyncData";
import LoadingSpinners from "../components/loadingSpinners";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from '@mui/material';

import { Form, Modal, Popconfirm, DatePicker, Select, Input, Card } from 'antd';

import dayjs from 'dayjs';
import { LoadingButton } from "@mui/lab";














async function addPaitent(paitent) {


console.log(paitent)


    let res = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/patient/atrRegister", paitent, "post")
    if (res)
        return 1
    return 0



}
function strTODate(date) {


    return new Date(date)
}

function AddPaitent(props) {

    const navigate = useNavigate()

    const FormRef = useRef();


    const [addLoading, setAddLoading] = useState(false)





    return (
        <Modal
        destroyOnClose
        className="p-5 absolute top-[1vh] !w-[95vw] "

        title={"New Patient"}

            open={props.isAddModalOpen}


            closable={false}
            footer={

                <div className='flex justify-end space-x-3'>


                    <Button onClick={() => {
                        props.setIsAddModalOpen(false)
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

                        <span>Register</span>
                    </LoadingButton>

                </div>

            }
        >

            <div className={props.className } style={props.style}>
               
               <div className="!p-5 !h-[75vh]">
               <Form
                    onFinish={async (x) => {

                        setAddLoading(true)
                        const res = await addPaitent(x)
                        setAddLoading(false)
                        if (res) {
                            props.toast.success(" Registered succesfuly");

                        }
                        else {
                            props.toast.error("Regstration failed");

                        }
                        props.setIsAddModalOpen(false)
                        props.setUpdate(res)



                        return 0

                    }}
                    ref={FormRef}
                >


                    <div className="flex flex-col space-y-5">
                       <Card>
                        <div className="grid grid-cols-6 gap-4">

                        <Form.Item
                            name="fullName"
                            rules={[{ required: true }]}
                        >
                            <Input

                                placeholder="Full name" />

                        </Form.Item>
                        <Form.Item
                            name="birthDate"
                            rules={[{ required: true }]}
                        >
                            <DatePicker

                                maxDate={dayjs()}
                                placeholder="Birth date" />
                        </Form.Item>

                        <Form.Item
                            name="phoneNumber"
                            rules={[{ required: true }]}
                        >
                            <Input

                                placeholder="Phonenumber" />

                        </Form.Item>
                        <Form.Item
                            name="weight"
                            rules={[{ type:Number, required: true }]}
                        >
                            <Input

                                placeholder="Weight on start" />

                        </Form.Item>

                        <Form.Item
                            name="subCity"
                            rules={[{ required: true }]}
                        >
                            <Input

                                placeholder="sub city" />

                        </Form.Item>
                        <Form.Item
                            name="kebele"
                            rules={[{ required: true }]}
                        >
                            <Input

                                placeholder="Kebele" />

                        </Form.Item>
                        <Form.Item
                            name="houseNumber"
                            rules={[{ required: true }]}
                        >
                            <Input

                                placeholder="House number" />

                        </Form.Item>

                        <Form.Item
                            name="sex"
                            rules={[{ required: true }]}
                        >


                            <Select Select placeholder="sex"

                                options={
                                    [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }]
                                }


                            >
                            </Select>


                        </Form.Item>
                        <Form.Item
                            name="severityLevel"
                            rules={[{ required: true }]}
                        >


                            <Select Select placeholder="Severity"

                                options={
                                    [{ value: 1, label: "Early" }, { value: 2, label: "Mild" }, { value: 3, label: "Severe" }]
                                }


                            >
                            </Select>


                        </Form.Item>

                        <Form.Item
                            name="atrNumber"

                        >
                            <Input

                                placeholder=" ATR number (optional)" />

                        </Form.Item>
                        </div>
                       </Card>
                       <Card>
                        <div className="grid grid-cols-6 gap-4">

                        <Form.Item
                            name="supporterName"
                            rules={[{ required: true }]}
                        >
                            <Input

                                placeholder="Support person's name" />

                        </Form.Item>
                       

                        <Form.Item
                            name="supporterPhone"
                            rules={[{ required: true }]}
                        >
                            <Input

                                placeholder="Supporter's Phonenumber" />

                        </Form.Item>
                        

                        <Form.Item
                            name="supporterSubCity"
                            rules={[{ required: true }]}
                        >
                            <Input

                                placeholder="Support person's sub city" />

                        </Form.Item>
                        <Form.Item
                            name="Supporterkebele"
                            rules={[{ required: true }]}
                        >
                            <Input

                                placeholder="Support person's Kebele" />

                        </Form.Item>
                        <Form.Item
                            name="supporterHouseNumber"
                            rules={[{ required: true }]}
                        >
                            <Input

                                placeholder="Supporter's House number" />

                        </Form.Item>

                      


                       
                        </div>
                       </Card>


                    </div>




                </Form>
              

               </div>
            </div >
        </Modal>

    );
}

export default AddPaitent;
