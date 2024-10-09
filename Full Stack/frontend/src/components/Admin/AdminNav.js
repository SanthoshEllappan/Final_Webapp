// import React, { useEffect, useState } from 'react';
// import { Button } from 'primereact/button';
// import { Link } from 'react-router-dom';
// import { AuthUser } from '../AuthRouter';
// import { RiHome2Line, RiSettings2Line, RiQuestionLine } from 'react-icons/ri'; // Example icons

// const AdminHeader = () => {
//   const auth = AuthUser();

//   // Function to generate a random Avataaars avatar URL
//   const generateAvatar = () => {
//     const randomNumber = Math.floor(Math.random() * 1000); // Random number for variation
//     return `https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Round&hairColor=Brown&facialHairType=BeardMedium&facialHairColor=Brown&clotheType=ShirtScoopNeck&clotheColor=PastelBlue&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light&random=${randomNumber}`; // Include random number for variation
//   };

//   // State to store the generated avatar URL
//   const [avatarUrl, setAvatarUrl] = useState('');

//   // State for the search input
//   const [searchTerm, setSearchTerm] = useState('');

//   // Generate a random avatar when the component mounts
//   useEffect(() => {
//     setAvatarUrl(generateAvatar());
//   }, []);

//   // Handle search term change
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <header
//       className="header"
//       style={{
//         background: '#3f51b5',
//         color: 'white',
//         padding: '15px 20px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//       }}
//     >
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         {avatarUrl && (
//           <img
//             src={avatarUrl}
//             alt="Avatar"
//             style={{
//               width: '40px',
//               height: '40px',
//               borderRadius: '50%',
//               marginRight: '10px',
//             }}
//           />
//         )}
//         <h1 style={{ margin: 0 }}>Welcome, Admin</h1>
//       </div>

//       {/* Search Bar */}
//       <div style={{ margin: '0 20px', display: 'flex', alignItems: 'center' }}>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           placeholder="Search..."
//           style={{
//             padding: '10px 15px',
//             borderRadius: '10px',
//             border: 'none',
//             outline: 'none',
//             width: '250px', // Increased width
//             backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background
//             color: '#333',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
//             transition: 'background-color 0.3s ease', // Smooth transition for hover effect
//           }}
//           onFocus={(e) => (e.target.style.backgroundColor = 'white')} // Change background on focus
//           onBlur={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)')} // Reset background on blur
//         />
//         <Button label="Search" className="p-button" style={{ marginLeft: '5px' }} />
//       </div>

//       <nav style={{ display: 'flex', alignItems: 'center' }}>
//         <Link
//           to="dashboard"
//           style={{
//             color: 'white',
//             margin: '0 15px',
//             display: 'flex',
//             alignItems: 'center',
//             textDecoration: 'none',
//             fontWeight: '500',
//           }}
//         >
//           <RiHome2Line style={{ marginRight: '5px' }} /> Home
//         </Link>
//         <Link
//           to="/settings"
//           style={{
//             color: 'white',
//             margin: '0 15px',
//             display: 'flex',
//             alignItems: 'center',
//             textDecoration: 'none',
//             fontWeight: '500',
//           }}
//         >
//           <RiSettings2Line style={{ marginRight: '5px' }} /> Settings
//         </Link>
//         <Link
//           to="/help"
//           style={{
//             color: 'white',
//             margin: '0 15px',
//             display: 'flex',
//             alignItems: 'center',
//             textDecoration: 'none',
//             fontWeight: '500',
//           }}
//         >
//           <RiQuestionLine style={{ marginRight: '5px' }} /> Help
//         </Link>
//         <Button
//           label="Log Out"
//           className="p-button-danger"
//           icon="pi pi-sign-out"
//           onClick={() => auth.logOut()}
//           style={{ marginLeft: '15px' }}
//         />
//       </nav>
//     </header>
//   );
// };

// export default AdminHeader;


// import React, { useEffect, useState } from 'react';
// import { Button } from 'primereact/button';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthUser } from '../AuthRouter';
// import { RiInformationLine,RiHome2Line, RiSettings2Line, RiQuestionLine } from 'react-icons/ri'; // Example icons
// import Swal from 'sweetalert2'; // Import SweetAlert

// const AdminHeader = () => {
//   const auth = AuthUser();
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   // Function to generate a random Avataaars avatar URL
//   const generateAvatar = () => {
//     const randomNumber = Math.floor(Math.random() * 1000); // Random number for variation
//     return `https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Round&hairColor=Brown&facialHairType=BeardMedium&facialHairColor=Brown&clotheType=ShirtScoopNeck&clotheColor=PastelBlue&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light&random=${randomNumber}`; // Include random number for variation
//   };

//   // State to store the generated avatar URL
//   const [avatarUrl, setAvatarUrl] = useState('');

//   // State for the search input
//   const [searchTerm, setSearchTerm] = useState('');

//   // Generate a random avatar when the component mounts
//   useEffect(() => {
//     setAvatarUrl(generateAvatar());
//   }, []);

//   // Handle search term change
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Function to handle logout with confirmation
//   const logout = () => {
//     try {
//       Swal.fire({
//         title: "Do you want to logout?",
//         showDenyButton: true,
//         confirmButtonText: "Yes",
//         denyButtonText: "No",
//         customClass: {
//           actions: "my-actions",
//           confirmButton: "order-2",
//           denyButton: "order-3",
//         },
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           await auth.AdminLogOut(); // Call logout function
//           navigate('/login'); // Redirect to login page
//         }
//       });
//     } catch (error) {
//       console.error("Logout Error:", error); // Log any errors
//     }
//   };

//   return (
//     <header
//       className="header"
//       style={{
//         background: '#3f51b5',
//         color: 'white',
//         padding: '15px 20px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//       }}
//     >
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         {avatarUrl && (
//           <img
//             src={avatarUrl}
//             alt="Avatar"
//             style={{
//               width: '40px',
//               height: '40px',
//               borderRadius: '50%',
//               marginRight: '10px',
//             }}
//           />
//         )}
//         <h1 style={{ margin: 0 }}>Welcome, Admin</h1>
//       </div>

//       {/* Search Bar */}
//       <div style={{ margin: '0 20px', display: 'flex', alignItems: 'center' }}>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           placeholder="Search..."
//           style={{
//             padding: '10px 15px',
//             borderRadius: '10px',
//             border: 'none',
//             outline: 'none',
//             width: '250px', // Increased width
//             backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background
//             color: '#333',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
//             transition: 'background-color 0.3s ease', // Smooth transition for hover effect
//           }}
//           onFocus={(e) => (e.target.style.backgroundColor = 'white')} // Change background on focus
//           onBlur={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)')} // Reset background on blur
//         />
//         <Button label="Search" className="p-button" style={{ marginLeft: '5px' }} />
//       </div>

//       <nav style={{ display: 'flex', alignItems: 'center' }}>
//         <Link
//           to="/admin"
//           style={{
//             color: 'white',
//             margin: '0 15px',
//             display: 'flex',
//             alignItems: 'center',
//             textDecoration: 'none',
//             fontWeight: '500',
//           }}
//         >
//           <RiHome2Line style={{ marginRight: '5px' }} /> Home
//         </Link>
//         <Link
//           to="/admindetails"
//           style={{
//             color: 'white',
//             margin: '0 15px',
//             display: 'flex',
//             alignItems: 'center',
//             textDecoration: 'none',
//             fontWeight: '500',
//           }}
//           >
//           <RiInformationLine style={{ marginRight: '5px' }} /> Details     </Link>
//         <Link to="/admin" style={{
//           color: 'white',
//           margin: '0 15px',
//           display: 'flex',
//           alignItems: 'center',
//           textDecoration: 'none',
//           fontWeight: '500'
//         }}>
        
//           <RiSettings2Line style={{ marginRight: '5px' }} /> Settings
//         </Link>
//         <Link
//           to="/admin"
//           style={{
//             color: 'white',
//             margin: '0 15px',
//             display: 'flex',
//             alignItems: 'center',
//             textDecoration: 'none',
//             fontWeight: '500',
//           }}
//         >
//           <RiQuestionLine style={{ marginRight: '5px' }} /> Help
//         </Link>
//         <Button
//           label="Log Out"
//           className="p-button-danger"
//           icon="pi pi-sign-out"
//           onClick={logout} // Use the logout function here
//           style={{ marginLeft: '15px' }}
//         />
//       </nav>
//     </header>
//   );
// };

// export default AdminHeader;



import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthUser } from '../AuthRouter';
import { RiInformationLine, RiHome2Line, RiSettings2Line, RiQuestionLine } from 'react-icons/ri'; // Example icons
import Swal from 'sweetalert2'; // Import SweetAlert

const AdminHeader = () => {
  const auth = AuthUser();
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to generate a random Avataaars avatar URL
  const generateAvatar = () => {
    const randomNumber = Math.floor(Math.random() * 1000); // Random number for variation
    return `https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Round&hairColor=Brown&facialHairType=BeardMedium&facialHairColor=Brown&clotheType=ShirtScoopNeck&clotheColor=PastelBlue&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light&random=${randomNumber}`; // Include random number for variation
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

  // Function to handle logout with confirmation
  const logout = () => {
    try {
        Swal.fire({
            title: 'Do you want to logout?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                confirmButton: 'order-2',
                denyButton: 'order-3',
                modal: 'custom-modal', // Add a custom class for the modal
            },
            // Custom styles
            background: '#E2F1E7', // Background color for the modal
            color: '#3a4e69', // Text color for the modal
            // Additional styles for buttons
            confirmButtonColor: '#3a4e69', // Color for the confirm button
            denyButtonColor: '#3a4e69',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await auth.AdminLogOut(); // Call logout function
          navigate('/login'); // Redirect to login page
        }
      });
    } catch (error) {
      console.error('Logout Error:', error); // Log any errors
    }
  };

  return (
    <header
      className="header"
      style={{
        background: '#3a4e69', // Updated background for a more professional look
        color: 'white',
        padding: '18px 35px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
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
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: "white" }}>Welcome, Admin</h1>
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
          onFocus={(e) => (e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)')}
          onBlur={(e) => (e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)')}
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
            border: '1px solid #ccc', // Optional border
          }}
        />
      </div>

      <nav style={{ display: 'flex', alignItems: 'center' }}>
        {[
          { to: '/admin', label: 'Home', icon: <RiHome2Line /> },
          { to: '/admindetails', label: 'Details', icon: <RiInformationLine /> },
          { to: '/adminsettings', label: 'Settings', icon: <RiSettings2Line /> },
          { to: '/adminhelp', label: 'Help', icon: <RiQuestionLine /> },
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
            onMouseEnter={(e) => (e.target.style.color = '#3498db')}
            onMouseLeave={(e) => (e.target.style.color = 'white')}
          >
            {icon} <span style={{ marginLeft: '5px' }}>{label}</span>
          </Link>
        ))}
        <Button
          label="Log Out"
          className="p-button-danger p-button-rounded"
          icon="pi pi-sign-out"
          onClick={logout}
          style={{
            marginLeft: '15px',
            padding: '4px 8px',
            borderRadius: '20px',
            backgroundColor: '#E2F1E7', // Light background
            color: '#3a4e69', // Dark text color for contrast
            border: '1px solid #ccc', // Optional border
          }}
        />
      </nav>
    </header>
  );
};

export default AdminHeader;
