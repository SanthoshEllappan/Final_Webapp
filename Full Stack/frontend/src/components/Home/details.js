

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [technicalSkills, setTechnicalSkills] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [certifications, setCertifications] = useState(null);
  const [courses, setCourses] = useState(null);
  const [projectSkills, setProjectSkills] = useState(null);
  const [softSkills, setSoftSkills] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const userId = localStorage.getItem("userConfig");

        // Fetch soft skills data
        const softSkillsResponse = await axios.get('http://127.0.0.1:8080/api/softskills', {
          params: { userId }
        });
        setSoftSkills(softSkillsResponse.data);
        
        // Fetch technical skills data
        const technicalSkillsResponse = await axios.get('http://127.0.0.1:8080/api/technical', {
          params: { userId }
        });
        setTechnicalSkills(technicalSkillsResponse.data);
        
        // Fetch achievements data
        const achievementsResponse = await axios.get('http://127.0.0.1:8080/api/achievements/id', {
          params: { userId }
        });
        setAchievements(achievementsResponse.data);
    
        // Fetch certifications data
        const certificationsResponse = await axios.get('http://127.0.0.1:8080/api/certifications/certifications/id', {
          params: { userId }
        });
        setCertifications(certificationsResponse.data);
        
        // Fetch courses data
        const courseResponse = await axios.get('http://127.0.0.1:8080/api/courses', {
          params: { userId }
        });     
        setCourses(courseResponse.data);

        // Fetch project skills data
        const projectSkillResponse = await axios.get('http://127.0.0.1:8080/api/project', {
          params: { userId }
        });
        setProjectSkills(projectSkillResponse.data);
        
        // Fetch employee data
        const employeeResponse = await axios.get('http://127.0.0.1:8080/api/personal/byid', {
          params: { userId }
        });
        setEmployeeData(employeeResponse.data);
        
        setLoading(false); // Data loaded
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching data');
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#F5F7F8', minHeight: '100vh', borderRadius: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#3a4e69' }}>Employee Information</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        borderRadius: '10px',
      }}>
        {/* General Information */}
        {Object.keys(employeeData).length !== 0 ? (
          <Card title="General Information">
            <p><strong>First Name:</strong> {employeeData.firstName}</p>
            <p><strong>Last Name:</strong> {employeeData.lastName}</p>
            <p><strong>Email:</strong> {employeeData.email}</p>
            <p><strong>Phone Number:</strong> {employeeData.phone}</p>
            <p><strong>Position:</strong> {employeeData.position}</p>
            <p><strong>Employee ID:</strong> {employeeData.employeeid}</p>
            <p><strong>Start Date:</strong> {employeeData.startDate && new Date(employeeData.startDate).toLocaleDateString()}</p>
            <p><strong>Date of Birth:</strong> {employeeData.dateOfBirth && new Date(employeeData.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {employeeData.gender}</p>
            <p><strong>Address:</strong> {employeeData.address}</p>
            <p><strong>Employment Status:</strong> {employeeData.employmentStatus}</p>
          </Card>
        ) : (
          <Card title="General Information">
            <p>No information available. Please fill the mandatory forms.</p>
          </Card>
        )}

        {/* Soft Skills */}
        {Object.keys(softSkills).length !== 0 ? (
          <Card title="Soft Skills">
            <p><strong>Communication:</strong> {softSkills.communication}/10</p>
            <p><strong>Teamwork:</strong> {softSkills.teamwork}</p>
            <p><strong>Problem Solving:</strong> {softSkills.problemSolving}/10</p>
            <p><strong>Adaptability:</strong> {softSkills.adaptability}</p>
            <p><strong>Time Management:</strong> {softSkills.timeManagement}/10</p>
            <p><strong>Critical Thinking:</strong> {softSkills.criticalThinking}</p>
            <p><strong>Creativity:</strong> {softSkills.creativity}</p>
            <p><strong>Leadership:</strong> {softSkills.leadership}</p>
            <p><strong>Interpersonal Skills:</strong> {softSkills.interpersonalSkills}</p>
            <p><strong>Emotional Intelligence:</strong> {softSkills.emotionalIntelligence}</p>
          </Card>
        ) : (
          <Card title="Soft Skills">
            <p>No information available. Please fill the mandatory forms.</p>
          </Card>
        )}

        {/* Technical Skills */}
        {Object.keys(technicalSkills).length !== 0 ? (
          <Card title="Technical Skills">
            <p><strong>Programming Languages:</strong> {technicalSkills.programmingLanguages}/10</p>
            <p><strong>Web Development:</strong> {technicalSkills.webDevelopment}/10</p>
            <p><strong>Database Management:</strong> {technicalSkills.databaseManagement}/10</p>
            <p><strong>Cloud Computing:</strong> {technicalSkills.cloudComputing}</p>
            <p><strong>Version Control:</strong> {technicalSkills.versionControl}</p>
            <p><strong>Machine Learning:</strong> {technicalSkills.machineLearning}</p>
            <p><strong>Data Analysis:</strong> {technicalSkills.dataAnalysis}</p>
            <p><strong>Cybersecurity:</strong> {technicalSkills.cybersecurity}</p>
          </Card>
        ) : (
          <Card title="Technical Skills">
            <p>No information available. Please fill the mandatory forms.</p>
          </Card>
        )}

        {/* Project Skills */}
        {Object.keys(projectSkills).length !== 0 ? (
          <Card title="Projects">
            <p><strong>Favorite Project:</strong> {projectSkills.favoriteProject}</p>
            <p><strong>Project Type:</strong> {projectSkills.projectType}</p>
            <p><strong>Tools Used:</strong> {projectSkills.toolsUsed}</p>
            <p><strong>Software Engineer Projects:</strong> {projectSkills.softwareEngineerProjects}</p>
            <p><strong>Consultant Projects:</strong> {projectSkills.consultantProjects}</p>
            <p><strong>Data Science Projects:</strong> {projectSkills.dataScienceProjects}</p>
            <p><strong>Full Stack Projects:</strong> {projectSkills.fullStackProjects}</p>
            <p><strong>Data Analyst Projects:</strong> {projectSkills.dataAnalystProjects}</p>
            <p><strong>Data Engineer Projects:</strong> {projectSkills.dataEngineerProjects}</p>
          </Card>
        ) : (
          <Card title="Projects">
            <p>No information available. Please fill the mandatory forms.</p>
          </Card>
        )}

        {/* Courses */}
        {Object.keys(courses).length !== 0 ? (
          <Card title="Courses">
            <p><strong>Course Name:</strong> {courses.courseName}</p>
            <p><strong>Platform:</strong> {courses.platform}</p>
            <p><strong>Specialization:</strong> {courses.specialization}</p>
            <p><strong>Total Courses:</strong> {courses.totalCourses}</p>
            <p><strong>Course Duration:</strong> {courses.courseDuration} months</p>
            <p><strong>Completion Status:</strong> {courses.completionStatus}</p>
          </Card>
        ) : (
          <Card title="Courses">
            <p>No information available. Please fill the mandatory forms.</p>
          </Card>
        )}

        {/* Achievements */}
        {Object.keys(achievements).length !== 0 ? (
    <Card title="Achievements">
               <p><strong>Achievement Title:</strong> {achievements.achievementTitle}</p>
              <p><strong>Organization:</strong> {achievements.organization}</p>
              <p><strong>Date Achieved:</strong> {new Date(achievements.dateAchieved).toLocaleDateString()}</p>
              <p><strong>Category:</strong> {achievements.category}</p>
              <p><strong>Description:</strong> {achievements.description}</p>
             </Card>
        ) : (
          <Card title="Achievements">
            <p>No information available. Please fill the mandatory forms.</p>
          </Card>
        )}

        {/* Certifications */}
        {Object.keys(certifications).length !== 0 ? (
           <Card title="Certifications">
             <p><strong>Certification Title:</strong> {certifications.certificationTitle}</p>
              <p><strong>Platform:</strong> {certifications.platform}</p>
              <p><strong>Specialization:</strong> {certifications.specialization}</p>
              <p><strong>Competency level</strong> {certifications.competencyLevel}</p>
              <p><strong>Date Obtained:</strong> {new Date(certifications.dateObtained).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> {certifications.duration} months</p>
           </Card>
        ) : (
          <Card title="Certifications">
            <p>No information available. Please fill the mandatory forms.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, children }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      border: `1px solid #3a4e69`,
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      flex: '1 1 calc(30% - 20px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ color: '#3a4e69' }}>{title}</h3>
      {children}
    </div>
  );
};

export default EmployeeDashboard;

