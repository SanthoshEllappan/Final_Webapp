

import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { useNavigate } from 'react-router-dom';

const AchievementsForm = () => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState({
    achievementTitle: '',
    organization: '',
    dateAchieved: '',
    description: '',
    category: '',
    additionalAchievements: '',
  });

  // States for confirmation and submission messages
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  // Dropdown options for achievement categories
  const achievementCategories = [
    'Academic',
    'Professional',
    'Community Service',
    'Sports',
    'Certifications',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAchievements((prevState) => ({
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
      const { data, status }  = await axios.put('http://127.0.0.1:8080/api/achievements/up', {
        data: achievements,
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
      <h2 className="mb-4">Achievements Assessment</h2>

      {!isSubmitted ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="achievementTitle" className="form-label">
                  Achievement Title
                </label>
                <input
                  type="text"
                  id="achievementTitle"
                  name="achievementTitle"
                  value={achievements.achievementTitle}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="organization" className="form-label">
                  Organization/Institution
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={achievements.organization}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="dateAchieved" className="form-label">
                  Date Achieved
                </label>
                <input
                  type="date"
                  id="dateAchieved"
                  name="dateAchieved"
                  value={achievements.dateAchieved}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label">
                  Description of Achievement
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={achievements.description}
                  onChange={handleChange}
                  required
                  className="form-control"
                  rows="4"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="category" className="form-label">
                  Category of Achievement
                </label>
                <select
                  id="category"
                  name="category"
                  value={achievements.category}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="" disabled>
                    Select Achievement Category
                  </option>
                  {achievementCategories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="additionalAchievements" className="form-label">
                  Additional Achievements (comma-separated)
                </label>
                <input
                  type="text"
                  id="additionalAchievements"
                  name="additionalAchievements"
                  value={achievements.additionalAchievements}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

        </>
      ) : (
        <div className="alert alert-success mt-4">
          <p>{submissionMessage}</p>
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

export default AchievementsForm;


