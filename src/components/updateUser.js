import React, { useState,useRef } from "react";

import {
 
  Button,

} from "@mui/material";

import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import httpRequest from "../components/httpRequest";
import { GetCookie } from "../components/cookies";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Popconfirm, Select } from "antd";





async function updateUser() {

  const drugs = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/drug/getAllDrugs")
  return drugs.drugs







}

const UpdateUser = (props) => {
  let data = props.data
  const navigate = useNavigate()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)


  const editFormRef = useRef()


  const userId = JSON.parse(GetCookie("user")).id
  const userRole=JSON.parse(GetCookie("user")).role






  return (
    <div>
      <Modal
        destroyOnClose
        closable={false}
        title={"Update user"}
        open={props.isOpen}
        footer={

          <div className='flex justify-end space-x-3'>


            <Button onClick={() => {
              props.setIsOpen(false)

            }}


              className='!rounded-xl' variant='outlined' color='error'>Cancel</Button>

{data.role==="Staff"||userRole==="SuperAdmin"?
    <>
            <Popconfirm
            
            okButtonProps={{danger:true}}
            title={"are you sure"}
            okText={"Reset"}
            onConfirm={()=>{
              
            }}
            >
              <LoadingButton
                loading={addLoading}
                variant="contained"
                className="w-40 "
                color="error"

               
              >

                <span>Reset password</span>
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

              <span>Update</span>
            </LoadingButton>
            </>

:null
        }
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
                const res = await updateUser()
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
                name="Role"
                rules={[{ required: true }]}
                initialValue={data.role}

              >

                <Select
                  size="large"
                  placeholder={"Role"}
                  disabled={!(data.role==="Staff"||userRole==="SuperAdmin")}
                  options={[
                    {
                      value: 'Admin',
                      label: 'Administrator',
                    },
                    {
                      value: 'Staff',
                      label: 'Staff',
                    }
                    ,
                    {
                      value: 'Deactivated',
                      label: 'Deactivated',
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

export default UpdateUser;
