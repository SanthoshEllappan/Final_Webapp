
// import React, { useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
// import { useNavigate } from 'react-router-dom';

// const CertificationsForm = () => {
//   const navigate = useNavigate();
//   const [certifications, setCertifications] = useState({
//     certificationTitle: '',
//     platform: '',
//     specialization: '',
//     dateObtained: '',
//     duration: '',
//     additionalCertifications: '',
//   });

//   // States for confirmation, submission, loading status, and messages
//   const [isConfirmVisible, setIsConfirmVisible] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // For loading indication
//   const [submissionMessage, setSubmissionMessage] = useState(''); // Success or failure messages

//   // Dropdown options for specializations
//   const specializations = [
//     'Data Science',
//     'Web Development',
//     'Mobile App Development',
//     'Cloud Computing',
//     'Machine Learning',
//     'Cybersecurity',
//     'Project Management',
//     'AI & Deep Learning',
//     'Other',
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCertifications((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsConfirmVisible(true); // Show confirmation dialog
//   };

//   const confirmSubmission = async () => {
//     setIsLoading(true); // Show loading spinner
//     setIsConfirmVisible(false); // Hide confirmation card

//     try {
//        const { data, status } = await axios.put('http://127.0.0.1:8080/api/certifications/certifications/up', {
//         data: certifications,
//         token: localStorage.getItem('userConfig'),
//       });

//       if (status === 201 || status === 200) {
//         setSubmissionMessage(
//           status === 201 ? 'Successfully submitted the certifications form!' : 'Successfully updated the certifications form!'
//         );
//         setIsSubmitted(true); // Trigger the success message view
//         setIsLoading(false); // Stop loading

//         setTimeout(() => {
//           navigate('/dashboard', { replace: true });
//         }, 3000); // Redirect after 3 seconds
//       } else {
//         setSubmissionMessage('Error occurred during form submission.');
//         setIsLoading(false); // Stop loading on failure
//       }
//     } catch (error) {
//       console.error('API submission error:', error);
//       setSubmissionMessage('Error occurred during form submission.');
//       setIsLoading(false); // Stop loading on failure
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Certifications Form</h2>

//       {!isSubmitted ? (
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             {/* Left side (3 fields) */}
//             <div className="col-md-6 mb-3">
//               <label htmlFor="certificationTitle" className="form-label">
//                 Certification Title
//               </label>
//               <input
//                 type="text"
//                 id="certificationTitle"
//                 name="certificationTitle"
//                 value={certifications.certificationTitle}
//                 onChange={handleChange}
//                 required
//                 className="form-control"
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label htmlFor="platform" className="form-label">
//                 Platform
//               </label>
//               <input
//                 type="text"
//                 id="platform"
//                 name="platform"
//                 value={certifications.platform}
//                 onChange={handleChange}
//                 required
//                 className="form-control"
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label htmlFor="specialization" className="form-label">
//                 Specialization
//               </label>
//               <select
//                 id="specialization"
//                 name="specialization"
//                 value={certifications.specialization}
//                 onChange={handleChange}
//                 required
//                 className="form-select"
//               >
//                 <option value="" disabled>
//                   Select Specialization
//                 </option>
//                 {specializations.map((spec, index) => (
//                   <option key={index} value={spec}>
//                     {spec}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Right side (3 fields) */}
//             <div className="col-md-6 mb-3">
//               <label htmlFor="dateObtained" className="form-label">
//                 Date Obtained
//               </label>
//               <input
//                 type="date"
//                 id="dateObtained"
//                 name="dateObtained"
//                 value={certifications.dateObtained}
//                 onChange={handleChange}
//                 required
//                 className="form-control"
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label htmlFor="duration" className="form-label">
//                 Duration (in hours)
//               </label>
//               <input
//                 type="number"
//                 id="duration"
//                 name="duration"
//                 value={certifications.duration}
//                 onChange={handleChange}
//                 required
//                 className="form-control"
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label htmlFor="additionalCertifications" className="form-label">
//                 Additional Certifications (comma-separated)
//               </label>
//               <input
//                 type="text"
//                 id="additionalCertifications"
//                 name="additionalCertifications"
//                 value={certifications.additionalCertifications}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//           </div>

//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </form>
//       ) : (
//         <div className="alert alert-success mt-4">{submissionMessage}</div>
//       )}

//       {isLoading && <div className="loading">Submitting...</div>}

//       {isConfirmVisible && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 1000,
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: '#fff',
//               padding: '20px',
//               borderRadius: '8px',
//               boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//               textAlign: 'center',
//               width: '400px',
//             }}
//           >
//             <h5>Are you sure you want to submit?</h5>
//             <button className="btn btn-secondary me-3" onClick={confirmSubmission}>
//               Yes
//             </button>
//             <button className="btn btn-danger" onClick={() => setIsConfirmVisible(false)}>
//               No
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CertificationsForm;


import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { useNavigate } from 'react-router-dom';

const CertificationsForm = () => {
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState({
    certificationTitle: '',
    platform: '',
    specialization: '',
    dateObtained: '',
    duration: '',
    additionalCertifications: '',
    competencyLevel: '', // New state for competency level
  });

  // States for confirmation, submission, loading status, and messages
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading indication
  const [submissionMessage, setSubmissionMessage] = useState(''); // Success or failure messages

  // Dropdown options for specializations and competency levels
  const specializations = [
    'Data Science',
    'Web Development',
    'Mobile App Development',
    'Cloud Computing',
    'Machine Learning',
    'Cybersecurity',
    'Project Management',
    'AI & Deep Learning',
    'Other',
  ];

  const competencyLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertifications((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmVisible(true); // Show confirmation dialog
  };

  const confirmSubmission = async () => {
    setIsLoading(true); // Show loading spinner
    setIsConfirmVisible(false); // Hide confirmation card

    try {
      const { data, status } = await axios.put('http://127.0.0.1:8080/api/certifications/certifications/up', {
        data: certifications,
        token: localStorage.getItem('userConfig'),
      });

      if (status === 201 || status === 200) {
        setSubmissionMessage(
          status === 201 ? 'Successfully submitted the certifications form!' : 'Successfully updated the certifications form!'
        );
        setIsSubmitted(true); // Trigger the success message view
        setIsLoading(false); // Stop loading

        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 3000); // Redirect after 3 seconds
      } else {
        setSubmissionMessage('Error occurred during form submission.');
        setIsLoading(false); // Stop loading on failure
      }
    } catch (error) {
      console.error('API submission error:', error);
      setSubmissionMessage('Error occurred during form submission.');
      setIsLoading(false); // Stop loading on failure
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Certifications Form</h2>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left side (3 fields) */}
            <div className="col-md-6 mb-3">
              <label htmlFor="certificationTitle" className="form-label">
                Certification Title
              </label>
              <input
                type="text"
                id="certificationTitle"
                name="certificationTitle"
                value={certifications.certificationTitle}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="platform" className="form-label">
                Platform
              </label>
              <input
                type="text"
                id="platform"
                name="platform"
                value={certifications.platform}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="specialization" className="form-label">
                Specialization
              </label>
              <select
                id="specialization"
                name="specialization"
                value={certifications.specialization}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="" disabled>
                  Select Specialization
                </option>
                {specializations.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* New dropdown for competency level */}
            <div className="col-md-6 mb-3">
              <label htmlFor="competencyLevel" className="form-label">
                Competency Level
              </label>
              <select
                id="competencyLevel"
                name="competencyLevel"
                value={certifications.competencyLevel}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="" disabled>
                  Select Competency Level
                </option>
                {competencyLevels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Right side (3 fields) */}
            <div className="col-md-6 mb-3">
              <label htmlFor="dateObtained" className="form-label">
                Date Obtained
              </label>
              <input
                type="date"
                id="dateObtained"
                name="dateObtained"
                value={certifications.dateObtained}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="duration" className="form-label">
                Duration (in hours)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={certifications.duration}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="additionalCertifications" className="form-label">
                Additional Certifications (comma-separated)
              </label>
              <input
                type="text"
                id="additionalCertifications"
                name="additionalCertifications"
                value={certifications.additionalCertifications}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <div className="alert alert-success mt-4">{submissionMessage}</div>
      )}

      {isLoading && <div className="loading">Submitting...</div>}

      {isConfirmVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              width: '400px',
            }}
          >
            <h5>Are you sure you want to submit?</h5>
            <button className="btn btn-secondary me-3" onClick={confirmSubmission}>
              Yes
            </button>
            <button className="btn btn-danger" onClick={() => setIsConfirmVisible(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;
