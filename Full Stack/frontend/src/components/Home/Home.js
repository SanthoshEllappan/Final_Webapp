


import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './header';
import Sidebar from './navbar';
import { Outlet } from 'react-router-dom'; 
 // Import the dashboard

const EmployeeIntro = () => {
  const location = useLocation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <main className="main-content" style={{ flexGrow: 1, padding: '20px' }}>
          {location.pathname === '/dashboard' }   
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default EmployeeIntro;



