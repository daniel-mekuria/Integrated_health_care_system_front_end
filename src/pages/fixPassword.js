import React, { useState, useRef } from "react";

import Checkbox from "@mui/material/Checkbox";
import {

  Button,
  TextField,

} from "@mui/material";

import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import httpRequest from "../components/httpRequest";
import { GetCookie, SetCookie } from "../components/cookies";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Popconfirm, Select } from "antd";


function convertStringToArray(str) {
  return str.split(',').map(function (item) {
    return item.trim();
  }).filter(function (item) {
    return item !== '';
  });
}


async function handleChange(x) {
  x.oldPassword="password"
  

  const res = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/user/updateProfile",x,"put")
  return res







}

const FixPassword = (props) => {
  const navigate = useNavigate()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [password, setPassword] = useState(null)
  const [loginLoading, setLoginLoading] = useState(false)




  const [signUpForm] = Form.useForm()





  return (
    <div>
      <Modal

        destroyOnClose
        closable={false}
        title={"Update password"}
        

        open={props.isOpen}
        footer={

          <div className='flex justify-end space-x-3'>


            <Button onClick={() => {
              props.setIsOpen(false)

            }}


              className='!rounded-xl' variant='outlined' color='error'>Skip</Button>

              


                <LoadingButton
                  loading={loginLoading}
                  variant="contained"
                  className="w-40 "

                  onClick={
                    () => {

                      signUpForm.submit()
                    }
                  }
                >

                  <span>Update</span>
                </LoadingButton>

             
          </div>

        }
      >

        <Form className="flex flex-col p-3 "
          form={signUpForm}
          onFinish={
            async (x) => {
              setLoginLoading(true)

              const res = await handleChange(x)
              setLoginLoading(false)
              if (res.sucess) {
                toast.success("Password changed successfully");
                setLoginLoading(false)
                signUpForm.resetFields()
                SetCookie("passwordReset", "false");
                props.setIsOpen(false)




              }
              else {
                toast.error(res.message);

              }



            }
          }
        >

          <Form.Item
            name="password"
            rules={[{ required: true }]}
          >
            <TextField
              className="w-[100%]"
              onChange={(x) => {
                setPassword(x.target.value)
              }}

              placeholder="New password"
              label="New password"


              type="password"

            />
          </Form.Item>
          <Form.Item
            name="repeatPassword"

            rules={[{
              message: "Passwords don't match",
              validator: (_, value) => {
                if (value === password) {
                  return Promise.resolve(); // Validation passed
                } else {
                  return Promise.reject('Some custom error message'); // Validation failed
                }
              },
            },]}
          >
            <TextField
              className="w-[100%]"


              placeholder="Repeat password"
              label="Repeat password"


              type="password"

            />
          </Form.Item>


        </Form>

      </Modal>
    </div>

  );
};

export default FixPassword;
