import React, { useState, useRef } from "react";
import "tailwindcss/tailwind.css";
import {
  Button, InputAdornment, TextField
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import bejingimg from '../assets/bejing.png'
import httpRequest from "../components/httpRequest";
import { useNavigate } from "react-router-dom";
import { GetCookie, SetCookie } from "../components/cookies";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from "@mui/lab";
import { Form } from "antd";
import { Password } from "@mui/icons-material";


async function handleLogin(x) {

  const res = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/user/login", x, "post")

  return res
}
async function handleSignUp(x) {
  x.roleName = "Staff"


  const res = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/user/signup", x, "post")

  return res
}


const Login = (props) => {
  const navigate = useNavigate()

  const [isLoginvisible, setIsLoginvisible] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [signUpForm] = Form.useForm()


  return (
    <div className={props.className} style={props.style}>

      <div className='flex items-center justify-center w-screen h-screen'>
        <img src={bejingimg} alt="no img" className="absolute top-[0%] left-[0%] w-full h-full" />
        <div className=" flex flex-col space-y-4 bg-[rgba(255,255,255,0.5)] justify-center backdrop-blur-md rounded-2xl p-4 w-fit h-fit" >
          <p className="font-manrope text-[2rem] self-center mb-8 font-medium text-gray-600">{isLoginvisible ? "Welcome back" : "Register"}</p>

          <div className="flex">
            <p className="font-sans text-black-600">{isLoginvisible ? "Don't have an account" : "Already registered"}</p>
            <Button style={{ textTransform: 'none' }} className=" relative font-sans -top-[3px]"

              size="medium"
              variant="text"
              onClick={() => {
                document.activeElement.blur();


                setIsLoginvisible(!isLoginvisible)

              }}
            >
              Click here..
            </Button>




          </div>
          <div className="relative overflow-scroll scrollbar-hide w-96 h-[52vh]">
            <div className={`absolute w-full h-full transition-all  ease-in-out ${isLoginvisible ? "translate-x-0 duration-700" : "-translate-x-full duration-500"}`}   >
              <Form className="flex flex-col p-3 " onFinish={async (x) => {
                setLoginLoading(true)


                setLoginLoading(true)
                const res = await handleLogin(x)
                setLoginLoading(false)
                if (res.sucess) {
                  toast.success("Welcome");
                  if (x.password === "password")
                    SetCookie("passwordReset", "true");
                  else
                    SetCookie("passwordReset", "false");




                  SetCookie("accessToken", res.accessToken);
                  SetCookie("refreshToken", res.refreshToken);

                  SetCookie("user", JSON.stringify({
                    "id": res.id,
                    "name": res.targetName,
                    "role": res.role,
                  }));

                  navigate("/")
                  setLoginLoading(false)


                }
                else {
                  toast.error(res.message);

                }



              }} >
                <Form.Item
                  name="username"
                  rules={[{ required: true }]}

                >
                  <TextField
                    className="w-[100%]"

                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      )
                    }}
                    placeholder="Username"
                    label="Username"

                  />

                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true }]}

                >

                  <TextField
                    className="w-[100%]"

                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      )
                    }}
                    placeholder="Password"
                    label="Password"
                    type="password"

                  />
                </Form.Item>
                <div className="flex self-center justify-center py-7">
                  <LoadingButton
                    loading={loginLoading}
                    variant="contained"
                    className="w-40 "
                    type="submit"

                  >

                    <span>Login</span>
                  </LoadingButton>
                </div>
              </Form>

            </div>


            <div className={`absolute w-full h-full transition-all  ease-in-out ${isLoginvisible ? "translate-x-full duration-500" : "-translate-x-0 duration-700 "}`}  >



              <Form className="flex flex-col p-3 "
                form={signUpForm}
                onFinish={
                  async (x) => {
                    setLoginLoading(true)

                    const res = await handleSignUp(x)
                    setLoginLoading(false)
                    if (res.sucess) {
                      toast.success("Registration is pending");
                      setLoginLoading(false)
                      signUpForm.resetFields()


                    }
                    else {
                      toast.error(res.message);

                    }



                  }
                }
              >

                <Form.Item
                  name="name"
                  rules={[{ required: true }]}

                >

                  <TextField
                    className="w-[100%]"

                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      )
                    }}
                    placeholder="Full name"
                    label="Full name"



                  />
                </Form.Item>
                <Form.Item
                  name="username"
                  rules={[{ required: true }]}

                >

                  <TextField
                    className="w-[100%]"

                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      )
                    }}
                    placeholder="Username"
                    label="Username"



                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true }]}
                >
                  <TextField
                    className="w-[100%]"
                    onChange={(x) => {
                      setPassword(x.target.value)
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      )
                    }}
                    placeholder="Password"
                    label="Password"


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

                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      )
                    }}
                    placeholder="Repeat password"
                    label="Repeat password"


                    type="password"

                  />
                </Form.Item>

                <div className="flex self-center justify-center py-7">
                  <LoadingButton
                    loading={loginLoading}
                    variant="contained"
                    className="w-40 "
                    type="submit"

                  >

                    <span>Register</span>
                  </LoadingButton>
                </div>
              </Form>

            </div>
          </div>


        </div>
      </div>

    </div>

  );
};

export default Login;
