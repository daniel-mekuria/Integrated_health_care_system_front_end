import React, { useState, useRef } from "react";

import {

  Button,

} from "@mui/material";

import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import httpRequest from "./httpRequest";
import { GetCookie } from "./cookies";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Popconfirm, Select } from "antd";





async function verifyUser(x,id) {

  let user=x


  user.userId=id
  
  const res = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/user/veryfyUser",user,"post")
return res







}
async function rjectUser(id) {
  let user={}


  user.userId=id
  
  const res = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/user/rejectUser",user,"post")
return res






}
const VerifyUser = (props) => {
  let data = props.data
  const navigate = useNavigate()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)


  const editFormRef = useRef()


  const userId = JSON.parse(GetCookie("user")).id
  const userRole = JSON.parse(GetCookie("user")).role






  return (
    <div>
      <Modal
        destroyOnClose
        closable={false}
        title={"Verify user"}
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
                okText={"Reject"}
                onConfirm={async () => {
                  setAddLoading(true)
                  const res = await rjectUser(data.id)
                  setAddLoading(false)
                  if (res.sucess) {
                    toast.success("Rejected successfully");
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

                  <span>Reject</span>
                </LoadingButton>
              </Popconfirm> 


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

              <span>Approve</span>
            </LoadingButton>


          </div>

        }
      >





        <div className='flex flex-col p-5 space-y-6'>


          <div className="grid grid-cols-2 gap-4">
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium text-gray-500'> Full name</p>
              <p className='text-sm text-gray-900'> {data.name}</p>
            </div>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium text-gray-500'> user name</p>
              <p className='text-sm text-gray-900'> {data.username}</p>
            </div>
          </div>
          <Form
            ref={editFormRef}
            className='p-5'
            onFinish={

              async (x) => {
                setAddLoading(true)
                const res = await verifyUser(x,data.id)
                setAddLoading(false)
                if (res.sucess) {
                  toast.success("Approved successfully");
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
                name="role"
                rules={[{ required: true }]}
                initialValue={data.role}

              >

                <Select
                  size="large"
                  placeholder={"Role"}
                  options={[
                    {
                      value: 'Admin',
                      label: 'Administrator',
                    },
                    {
                      value: 'Staff',
                      label: 'Staff',
                    }
                    
                  ]}
                />

              </Form.Item>
            </div>





          </Form>
        </div>

      </Modal>

    </div>

  );
};

export default VerifyUser;
