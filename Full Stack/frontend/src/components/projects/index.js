import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { useNavigate } from 'react-router-dom';

const ProjectSkillsForm = () => {
  const navigate = useNavigate();
  const [projectSkills, setProjectSkills] = useState({
    softwareEngineerProjects: '',
    consultantProjects: '',
    fullStackProjects: '',
    dataAnalystProjects: '',
    dataEngineerProjects: '',
    dataScienceProjects: '',
    otherProjects: '',
    projectType: '',
    toolsUsed: '',
    favoriteProject: '',
  });

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const projectTypes = [
    'Full Stack Development',
    'Data Analysis',
    'Data Engineering',
    'Data Science',
    'Machine Learning',
    'Web Development',
    'Mobile Development',
    'Cybersecurity',
    'Cloud Solutions',
    'Other',
  ];

  const tools = [
    'Python',
    'JavaScript',
    'Java',
    'SQL',
    'R',
    'Node.js',
    'React',
    'Django',
    'Tableau',
    'AWS',
    'Azure',
    'GCP',
    'Docker',
    'Kubernetes',
    'Git',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectSkills((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmVisible(true); // Show confirmation dialog
  };

  const confirmSubmission = async () => {
    setIsLoading(true);
    setIsConfirmVisible(false);
    
    try {
      const { data, status } = await axios.put('http://127.0.0.1:8080/api/project', {
        data: projectSkills,
        token: localStorage.getItem('userConfig'),
      });

      if (status === 201 || status === 200) {
        setSubmissionMessage(status === 201 ? 'Project skills submitted successfully!' : 'Successfully updated the Project skills form!');
        setIsSubmitted(true);
        setIsLoading(false);
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 3000); // Redirect after 3 seconds
      } else {
        console.log('Error: Form submission failed.');
        setSubmissionMessage('Error occurred during submission.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('API submission error:', error);
      setSubmissionMessage('Error occurred during submission.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Project Skills Assessment</h2>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="row">
            {Object.keys(projectSkills).map((skill, index) => (
              <div className="col-md-6 mb-3" key={index}>
                <label htmlFor={skill} className="form-label">
                  {skill.charAt(0).toUpperCase() + skill.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                {skill === 'projectType' ? (
                  <select
                    id={skill}
                    name={skill}
                    value={projectSkills[skill]}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="" disabled>
                      Select Project Type
                    </option>
                    {projectTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                ) : skill === 'toolsUsed' ? (
                  <select
                    id={skill}
                    name={skill}
                    value={projectSkills[skill]}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="" disabled>
                      Select Tools Used
                    </option>
                    {tools.map((tool, index) => (
                      <option key={index} value={tool}>
                        {tool}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={skill.includes('Projects') ? 'number' : 'text'}
                    id={skill}
                    name={skill}
                    value={projectSkills[skill]}
                    onChange={handleChange}
                    required
                    className="form-control"
                    min={skill.includes('Projects') ? '0' : undefined}
                  />
                )}
              </div>
            ))}
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

export default ProjectSkillsForm;
