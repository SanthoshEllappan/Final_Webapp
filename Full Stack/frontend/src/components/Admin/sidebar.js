


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 // Use only necessary icons
import { FaUser, FaCog, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
const Sidebar = () => {
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState('/admin/adminHome'); // Track the active path

  // Function to handle navigation
  const handleNavigation = (path) => {
    setActivePath(path); // Update active path
    navigate(path);
  };

  return (
    <aside className="sidebar" style={{ 
      width: '250px', 
      background: '#ffffff', // White background
      padding: '15px', 
      height: '100vh',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    }}>
      {/* Sidebar Items */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {/* Group 1: User Details */}
        <li style={{ 
          fontWeight: 'bold', 
          marginBottom: '10px', 
          fontSize: '16px', 
          color: '#ffffff', 
          backgroundColor: '#3a4e69', // Card-like style for section header
          padding: '10px', 
          borderRadius: '8px',
        }}>
          User Details
        </li>
        {[
          { name: 'User Details', path: '/admin/adminHome', icon: <FaUser /> },
        ].map(item => (
          <li 
            key={item.path}
            onClick={() => handleNavigation(item.path)} 
            style={{ 
              cursor: 'pointer', 
              marginBottom: '10px',
              borderRadius: '8px',
              backgroundColor: '#E2F1E7', // Active or default background color
              padding: '10px 15px',
              transition: 'background-color 0.3s',
              display: 'flex', 
              alignItems: 'center',
              color: '#000000', // Black text for items
            }} 
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1e7e1'} // Lighter shade on hover
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor =  '#E2F1E7'} // Maintain original or active color
          >
            <span style={{ marginRight: '10px' }}>{item.icon}</span>
            {item.name}
          </li>
        ))}
        {/* Group 2: Admin Functions */}
        <li style={{ 
          fontWeight: 'bold', 
          marginBottom: '10px', 
          fontSize: '16px', 
          color: '#ffffff', 
          backgroundColor: '#3a4e69', // Card-like style for section header
          padding: '10px', 
          borderRadius: '8px',
          marginTop: '15px' // Add some spacing from the previous section
        }}>
          Admin Functions
        </li>
        {[
          { name: 'Manage Users', path: '/kdks', icon: <FaUser /> },
          { name: 'View Reports', path: '/dskks', icon: <FaClipboardList /> },
          { name: 'Settings', path: '/djkka', icon: <FaCog /> },
          { name: 'Logout', path: '/login', icon: <FaSignOutAlt /> },
        ].map(item => (
          <li 
            key={item.path}
            onClick={() => handleNavigation(item.path)} 
            style={{ 
              cursor: 'pointer', 
              marginBottom: '10px',
              borderRadius: '8px',
              backgroundColor: activePath === item.path ? '#d0e1f9' : '#E2F1E7', // Active or default background color
              padding: '10px 15px',
              transition: 'background-color 0.3s',
              display: 'flex', 
              alignItems: 'center',
              color: '#000000', // Black text for items
            }} 
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1e7e1'} // Lighter shade on hover
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = activePath === item.path ? '#d0e1f9' : '#E2F1E7'} // Maintain original or active color
          >
            <span style={{ marginRight: '10px' }}>{item.icon}</span>
            {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
