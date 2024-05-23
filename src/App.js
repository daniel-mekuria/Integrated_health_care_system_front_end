import React, { useState } from "react";
import "./index.css";

import { Layout, Input, Space, ConfigProvider } from "antd";
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";

import ViewPaitents from "./pages/viewPaitents";
import Navigation from "./components/Navigation";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Emergency_Drug_Dispensal from "./pages/Emergency_Drug_Dispensal";
import Analytics from "./pages/analytics";
import { GetCookie } from "./components/cookies";
import AddPaitent from "./pages/addpaitent";
import PaitentDetail from "./pages/paitentDetail";
import MonitorPaitents from "./pages/monitorPaitents";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const { Content, Sider } = Layout;

const App = () => {
  


  return (
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#00A86B',

        // Alias Token
      },
    }}
  >
      <Router>
        
      <App_/>
      </Router>
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
      </ConfigProvider>
    );
  };

const App_ = () => {
 

  
  const navigate = useNavigate();

  
  React.useEffect( ()=>{

    if (!GetCookie("user") || !GetCookie("accessToken") || !GetCookie("refreshToken"))
    navigate("/login")
  } ,[] )

 
  return (
      
      <Routes>
        <Route path="/login" element={<Login />} />;
        <Route
          path="*"
          element={
            <Layout className="w-screen h-screen bg-white">
              <Sider theme="light" width={"fit-content"} className="bg-white ">
                <Navigation />
              </Sider>

              <Content className="px-5 pt-10 pb-5">
                <Routes>
                  <Route
                    path="/paitents"
                    element={<ViewPaitents className="w-full h-fit" />}
                  />
                  <Route path="/" element={<Dashboard />} />;
                  <Route
                    path="/pharmacy"
                    element={<Emergency_Drug_Dispensal />}
                  />
                  <Route
                    path="/monitor"
                    element={<MonitorPaitents />}
                  />
                  <Route
                    path="/analytics"
                    element={<Analytics />}
                  />
                  <Route
                    path="/addpaitent"
                    element={<AddPaitent />}
                  />
                  <Route
                    path="/paitentdetail"
                    element={<PaitentDetail />}
                  />
                  ;
                  <Route
                    path="*"
                    element={
                      <h1
                        style={{
                          position: "relative",
                          left: "15rem",
                          top: "4rem",
                        }}
                      >
                        404 Path doesn't exist
                      </h1>
                    }
                  ></Route>
                </Routes>
              </Content>
            </Layout>
          }
        ></Route>
      </Routes>
  );
}



export default App;
