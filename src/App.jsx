// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Statistics from './components/Statistics';
import BedManagement from './components/BedManagement';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navigation from './components/Navigation';
import DrugManagement from './components/DrugMangement'

const App = () => {
  return (
    <div className="flex">
      <Navigation className='flex-none' />
      <div className="">
        <Header />
        <main className=" flex-grow overflow-auto p-4">
          {/* <Statistics /> */}
          {/* <BedManagement /> */}
          <DrugManagement/>
        </main>
      </div>
    </div>
  );
};

export default App;
