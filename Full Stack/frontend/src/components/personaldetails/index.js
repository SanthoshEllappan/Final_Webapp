
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const EmployeeDetailsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    employeeid: '',
    startDate: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    employmentStatus: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmVisible(true);
  };

  const confirmSubmission = async () => {
    setIsConfirmVisible(false);
    setIsLoading(true);
    setIsSubmitted(false);

    try {
      console.log("Form Data Being Submitted:", formData);

      const { data, status } = await axios.put('http://127.0.0.1:8080/api/personal/new', {
        data: formData,
        token: localStorage.getItem("userConfig"),
      });

      if (status === 201) {
        setSubmissionMessage("Employee details successfully submitted!");
        setIsSubmitted(true);
      } else if (status === 200) {
        setSubmissionMessage("Employee details successfully updated!");
        setIsSubmitted(true);
      } else {
        setSubmissionMessage("An error occurred during submission.");
      }
    } catch (error) {
      console.error("Error submitting employee details:", error.response || error.message);
      setSubmissionMessage("Error occurred during submission.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 3000);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Employee Personal Details</h2>

      {!isSubmitted ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input 
                type="tel" 
                className="form-control" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="position" className="form-label">Position</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="position" 
                  name="position" 
                  value={formData.position} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="employeeid" className="form-label">Employee ID</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="employeeid" 
                  name="employeeid" 
                  value={formData.employeeid} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="startDate" 
                name="startDate" 
                value={formData.startDate} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
              <input 
                type="date" 
                className="form-control" 
                id="dateOfBirth" 
                name="dateOfBirth" 
                value={formData.dateOfBirth} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select 
                className="form-select" 
                id="gender" 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea 
                className="form-control" 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="employmentStatus" className="form-label">Employment Status</label>
              <select 
                className="form-select" 
                id="employmentStatus" 
                name="employmentStatus" 
                value={formData.employmentStatus} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Employment Status</option>
                <option value="full_time">Full-Time</option>
                <option value="part_time">Part-Time</option>
                <option value="intern">Intern</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </>
      ) : (
        <div className="alert alert-success mt-4">
          {submissionMessage}
        </div>
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
            }}
          >
            <h4>Confirm Submission</h4>
            <p>Are you sure you want to submit the form?</p>
            <button onClick={confirmSubmission} className="btn btn-success">Yes</button>
            <button onClick={() => setIsConfirmVisible(false)} className="btn btn-danger">No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailsForm;

