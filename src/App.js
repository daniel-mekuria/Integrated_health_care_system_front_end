import React, { useState } from "react";
import "./index.css";

import { Layout, Input, Space, ConfigProvider } from "antd";
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";

import ViewPaitents from "./pages/viewPaitents";
import Navigation from "./components/Navigation";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Analytics from "./pages/analytics";
import { GetCookie } from "./components/cookies";
import AddPaitent from "./pages/addpaitent";
import PaitentDetail from "./pages/paitentDetail";
import MonitorPaitents from "./pages/monitorPaitents";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pharmacy from "./pages/pharmacy";
import Test from "./pages/test";
import ExportForm from "./components/exportForm";
import BedManagement from "./pages/bedManagment";
import Staff from "./pages/staff";
import { GlobalContext } from "./globalContext";



const { Content, Sider } = Layout;

const App = () => {
  const [state, setState] = useState({});
  function updateState(x){
    let newState={...x,...state}
    setState(newState)
  }

 
  const theme = createTheme({
    palette: {
      primary: {
        main: '#00A86B', // Set your desired color here
      }
    },
    shape: {
      borderRadius: 8, // Set your desired border radius here
    },
    radius: {
      sm: '4px', // Set your desired small radius here
      md: '8px', // Set your desired medium radius here
      lg: '16px', // Set your desired large radius here
    },
  });
  

  return (
    <ThemeProvider theme={theme}>
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#00A86B',

        // Alias Token
      },
    }}
  >
      <GlobalContext.Provider value={{ state, updateState }}>

      <Router>

      <App_/>

      </Router>
      </GlobalContext.Provider>

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
      </ThemeProvider>
    );
  };

const App_ = () => {
 
  const x= useTheme()
console.log(x)
  
  const navigate = useNavigate();

  
  React.useEffect( ()=>{

    if (!GetCookie("user") || !GetCookie("accessToken") || !GetCookie("refreshToken"))
    navigate("/login")
    toast.play()

  } ,[] )

  return (
      
      <Routes>
        <Route path="/login" element={<Login />} />;
        <Route
          path="*"
          element={
            <Layout className="w-screen h-screen p-1 overflow-scroll font-sans bg-white scrollbar-hide ">
              <Sider theme="light" width={"fit-content"} className="font-sans bg-white ">
                <Navigation />
              </Sider>

              <Content className="py-5 overflow-scroll font-sans scrollbar-hide px-7">
                <Routes>
                  <Route
                    path="/patients"
                    element={<ViewPaitents  />}
                  />
                  <Route path="/" element={<Dashboard />} />;
                  <Route
                    path="/pharmacy"
                    element={<Pharmacy />}
                  />
                  <Route
                    path="/monitor"
                    element={<MonitorPaitents />}
                  />
                  <Route
                    path="/bed"
                    element={<BedManagement />}
                  />
                  <Route
                    path="/analytics"
                    element={<Analytics />}
                    
                  />
                  <Route
                    path="/reports"
                    element={<ExportForm  isModalOpen setIsModalOpen={()=>{
                      navigate("/")
                    }}  />}
                    
                  />
                  
                  <Route
                    path="/addpaitent"
                    element={<AddPaitent />}
                  />
                  <Route
                    path="/paitentdetail"
                    element={<PaitentDetail />}
                  />
                  
                  <Route
                    path="/test"
                    element={<Test />}
                  />
                  <Route
                    path="/staff"
                    element={<Staff />}
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
