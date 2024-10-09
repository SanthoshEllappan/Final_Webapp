
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { AuthUser } from '../AuthRouter';
import { RiInformationLine, RiHome2Line, RiSettings2Line, RiQuestionLine } from 'react-icons/ri'; // Example icons

const Header = () => {
  const auth = AuthUser();
  console.log(auth.user);

  // Function to generate a random Avataaars avatar URL
  const generateAvatar = () => {
    const randomNumber = Math.floor(Math.random() * 1000); // Random number for variation
    return `https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Round&hairColor=Brown&facialHairType=BeardMedium&facialHairColor=Brown&clotheType=ShirtScoopNeck&clotheColor=PastelBlue&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light`;
  };

  // State to store the generated avatar URL
  const [avatarUrl, setAvatarUrl] = useState('');
  
  // State for the search input
  const [searchTerm, setSearchTerm] = useState('');

  // Generate a random avatar when the component mounts
  useEffect(() => {
    setAvatarUrl(generateAvatar());
  }, []);

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className="header" style={{
      background: '#3a4e69', // Updated background for a more professional look
      color: 'white',
      padding: '18px 35px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              marginRight: '10px',
              border: '2px solid #ffffff', // White border for a clean appearance
            }}
          />
        )}
        <h1 style={{color: 'white',margin: 0, fontSize: '1.5rem' }}>Welcome, {localStorage.getItem('name') ? localStorage.getItem('name') : "Guest"}</h1>
      </div>
      
      {/* Search Bar */}
      <div style={{ margin: '0 20px', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          style={{
            padding: '5px 9px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            outline: 'none',
            width: '300px',
            backgroundColor: '#ffffff', 
            color: '#333',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Soft shadow for a floating effect
            transition: 'box-shadow 0.3s ease, background-color 0.3s ease', // Smooth transitions for focus
          }}
          onFocus={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'} // Enhanced shadow on focus
          onBlur={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'} // Reset shadow on blur
        />
             <Button 
          label="Search" 
          className="p-button p-button-rounded" 
          style={{
            marginLeft: '10px', 
            padding: '5px 9px',
            borderRadius: '20px', 
            backgroundColor: '#E2F1E7', // Light background
            color: '#3a4e69', // Dark text color for contrast
            border: '1px solid #ccc' // Optional border
          }} 
        />
      </div>

      <nav style={{ display: 'flex', alignItems: 'center' }}>
        {[
          { to: 'dashboard', label: 'Home', icon: <RiHome2Line /> },
          { to: '/empdetails', label: 'Details', icon: <RiInformationLine /> },
          { to: '/settings', label: 'Settings', icon: <RiSettings2Line /> },
          { to: '/help', label: 'Help', icon: <RiQuestionLine /> },
        ].map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            style={{
              color: 'white',
              margin: '0 15px',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#3498db'} // Light blue hover color
            onMouseLeave={(e) => e.target.style.color = 'white'}
          >
            {icon} <span style={{ marginLeft: '5px' }}>{label}</span>
          </Link>
        ))}
        <Button
          label="Log Out"
          className="p-button-danger p-button-rounded"
          icon="pi pi-sign-out"
          onClick={() => auth.logOut()}
          style={{
            marginLeft: '15px',
            padding: '4px 8px',
            borderRadius: '20px',
            backgroundColor: '#E2F1E7', // Light background
            color: '#3a4e69', // Dark text color for contrast
            border: '1px solid #ccc' // Optional border
          }}

        />
      </nav>
    </header>
  );
};

export default Header;
