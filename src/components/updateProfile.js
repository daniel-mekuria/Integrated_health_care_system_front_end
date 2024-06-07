import React, { useState, useRef } from "react";

import {

  Autocomplete,
  Button,
  Checkbox,
  TextField,

} from "@mui/material";

import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import httpRequest from "./httpRequest";
import { GetCookie, RemoveCookie } from "./cookies";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Popconfirm, Select } from "antd";






async function updateProfile(x) {

  const res = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/user/updateProfile", x, "put")
  return res


}
const UpdateProfile = (props) => {
  let data = props.data
  const navigate = useNavigate()
  const [addLoading, setAddLoading] = useState(false)
  const [changepassword, setChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState(null)

  const updateFormRef = useRef()
  const editFormRef = useRef()


  const user = GetCookie("user") ? JSON.parse(GetCookie("user")) : null






  return (
    <div>
      <Modal
        destroyOnClose
        closable={false}
        title={"Edit profile"}
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
              okText={"Update"}
              onConfirm={async () => {
                updateFormRef.current.submit()


              }}
            >
              <LoadingButton
                loading={addLoading}
                variant="contained"
                className="w-40 "



              >

                <span>Update</span>
              </LoadingButton>
            </Popconfirm>
          </div>

        }
      >
        <Form
          ref={updateFormRef}
          className='p-5'
          onFinish={

            async (x) => {
              setAddLoading(true)
              const res = await updateProfile(x)
              setAddLoading(false)
              if (res.sucess) {
                toast.success("Updated successfully");
                props.setIsOpen(false)
                setTimeout(() => {
                  RemoveCookie("accessToken")
                  RemoveCookie("refreshToken")
                  RemoveCookie("user")
                  navigate("/login")
                }, 2000);
              }
              else {
                toast.error(res.message);

              }


            }
          }
        >

          { user?
            <div className='flex flex-col '>
              <Form.Item
                name="fullName"
                rules={[{ required: true }]}
                initialValue={user.name}
              >


                <TextField label="Full name" size="small"
                  className="w-full"


                  placeholder="Full name" />



              </Form.Item>
              <Form.Item
                name="username"
                rules={[{ required: true }]}
                initialValue={user.userName}
              >


                <TextField label="Username" size="small"

                  className="w-full"

                  placeholder="Username" />



              </Form.Item>
              <div className='flex flex-col ' >
                <div className='flex space-x-2'>
                  <p className='font-sans text-[1rem] mt-2 text-gray-600'>
                    Change password
                  </p>

                  <Form.Item
                    name="changePassword"
                    rules={[{ required: false }]}

                  >
                    <Checkbox onChange={(x) => {
                      setChangePassword(x.target.checked)
                    }} />
                  </Form.Item>

                </div>
                {changepassword ?
                  <div>



                    <Form.Item
                      name="oldPassword"
                      rules={[{
                        message: 'Password too short ',
                        validator: (_, value) => {
                          if (value.length < 8) {
                            return Promise.reject('Some custom error message');
                          }
                          return Promise.resolve();

                        },
                      },]} >

                      <TextField label="Old password" size="small"
                        className="w-full"

                        type="password"
                        placeholder="Old password" />



                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{
                        message: 'Password too short ',
                        validator: (_, value) => {
                          if (value.length < 8) {
                            return Promise.reject('Some custom error message');
                          }
                          return Promise.resolve();

                        },
                      },]} >

                      <TextField className="w-full"
                        onChange={(x) => {
                          setNewPassword(x.target.value)
                        }} label="New password" size="small"
                        type="password"


                        placeholder="New password" />



                    </Form.Item>
                    <Form.Item
                      name="Repeatpassword"
                      rules={[{
                        message: 'Passwords dont match ',
                        validator: (_, value) => {
                          if (value !== newPassword) {
                            return Promise.reject('Some custom error message');
                          }
                          return Promise.resolve();

                        },
                      },]} >

                      <TextField label="Repeat password" size="small"
                        type="password"

                        className="w-full"

                        placeholder="Repeat password" />



                    </Form.Item>




                  </div>
                  : null
                }




              </div>


            </div>
:null
}

        </Form>
      </Modal>

    </div >

  );
};


export default UpdateProfile;
