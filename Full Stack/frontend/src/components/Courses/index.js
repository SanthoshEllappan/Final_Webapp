
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { useNavigate } from 'react-router-dom';

const CoursesForm = () => {
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState({
    courseName: '',
    platform: '',
    specialization: '',
    totalCourses: '',
    courseDuration: '',
    courseType: '',
    completionStatus: '',
    additionalCourses: '',
  });

  // States for confirmation, submission, and loading status
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading indication
  const [submissionMessage, setSubmissionMessage] = useState(""); // Success or failure messages

  // Dropdown options for course types
  const courseTypes = [
    'Online Course',
    'In-Person Course',
    'Hybrid Course',
    'Self-Paced Course',
    'Instructor-Led Course',
  ];

  // Dropdown options for completion status
  const completionStatuses = [
    'Completed',
    'In Progress',
    'Not Started',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevState) => ({
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
    setIsConfirmVisible(false); // Hide confirmation dialog

    try {
      const { data, status } = await axios.put('http://127.0.0.1:8080/api/courses/up', {
        data: courseDetails,
        token: localStorage.getItem("userConfig"),
      });
      console.log("Hello");
      
      if (status === 201 || status === 200) {
        setSubmissionMessage(
          status === 201 ? 'Successfully submitted the Course form!' : 'Successfully updated the Course form!'
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
      <h2 className="mb-4">Courses Assessment</h2>

      {!isSubmitted ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="courseName" className="form-label">Course Name</label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  value={courseDetails.courseName}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="platform" className="form-label">Platform (e.g., Coursera, edX, Udacity)</label>
                <input
                  type="text"
                  id="platform"
                  name="platform"
                  value={courseDetails.platform}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="specialization" className="form-label">Specialization</label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={courseDetails.specialization}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="totalCourses" className="form-label">Total Number of Courses</label>
                <input
                  type="number"
                  id="totalCourses"
                  name="totalCourses"
                  value={courseDetails.totalCourses}
                  onChange={handleChange}
                  required
                  className="form-control"
                  min="0"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="courseDuration" className="form-label">Duration of the Course (in hours)</label>
                <input
                  type="number"
                  id="courseDuration"
                  name="courseDuration"
                  value={courseDetails.courseDuration}
                  onChange={handleChange}
                  required
                  className="form-control"
                  min="0"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="courseType" className="form-label">Type of Course</label>
                <select
                  id="courseType"
                  name="courseType"
                  value={courseDetails.courseType}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="" disabled>Select Course Type</option>
                  {courseTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="completionStatus" className="form-label">Completion Status</label>
                <select
                  id="completionStatus"
                  name="completionStatus"
                  value={courseDetails.completionStatus}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="" disabled>Select Completion Status</option>
                  {completionStatuses.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="additionalCourses" className="form-label">Additional Courses (comma-separated)</label>
                <input
                  type="text"
                  id="additionalCourses"
                  name="additionalCourses"
                  value={courseDetails.additionalCourses}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </>
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


export default CoursesForm;
