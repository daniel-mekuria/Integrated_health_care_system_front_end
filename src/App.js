import React, { useState } from 'react';
import './index.css';

import { Layout, Input,Space } from 'antd';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import ViewPaitents from './pages/viewPaitents';
import Navigation from './components/Navigation';
import Login from './pages/login';



const {  Content, Sider } = Layout;




const App = () => {

  return (

<Router>
          <Routes>
         
          
          <Route path="/login" element={<Login/>} />;
          
          <Route
            path="*"
            element={
<Layout className='w-screen h-screen bg-white'>
      <Sider theme='light'
      width={"fit-content"}
      className='bg-white '>
        <Navigation/>


      
       
       
      </Sider>
     
       
        <Content 
        className='px-5 pt-10 pb-5'
        >
          <Space direction='vertical'>

          <Routes>
         
          
          <Route path="/paitents" element={<ViewPaitents className="w-full h-fit" />} />;

          <Route
            path="*"
            element={
              <h1 style={{position:'relative',left:'15rem',top:'4rem'}}>404 Path doesn't exist</h1>
            }
          ></Route>
        </Routes>
          </Space>
         
        </Content>
    </Layout>

            }
          
          ></Route>
          

        </Routes>
        </Router>

            
  );
};

export default App;