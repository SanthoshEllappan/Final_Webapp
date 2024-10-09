


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar, Radar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

// const EmployeeDashboard = () => {
//   const [employeeData, setEmployeeData] = useState(null);
//   const [technicalSkills, setTechnicalSkills] = useState({});
//   const [softSkills, setSoftSkills] = useState({});
//   const [achievements, setAchievements] = useState(null);
//   const [certifications, setCertifications] = useState(null);
//   const [courses, setCourses] = useState(null);
//   const [projectSkills, setProjectSkills] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const userId = localStorage.getItem("userConfig");
//         const responses = await Promise.all([
//           axios.get('http://127.0.0.1:8080/api/softskills', { params: { userId } }),
//           axios.get('http://127.0.0.1:8080/api/technical', { params: { userId } }),
//           axios.get('http://127.0.0.1:8080/api/achievements/id', { params: { userId } }),
//           axios.get('http://127.0.0.1:8080/api/certifications/certifications/id', { params: { userId } }),
//           axios.get('http://127.0.0.1:8080/api/courses', { params: { userId } }),
//           axios.get('http://127.0.0.1:8080/api/project', { params: { userId } }),
//           axios.get('http://127.0.0.1:8080/api/personal/byid', { params: { userId } })
//         ]);

//         setSoftSkills(responses[0].data);
//         setTechnicalSkills(responses[1].data);
//         setAchievements(responses[2].data);
//         setCertifications(responses[3].data);
//         setCourses(responses[4].data);
//         setProjectSkills(responses[5].data);
//         setEmployeeData(responses[6].data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.response ? error.response.data.message : 'Error fetching data');
//         setLoading(false);
//       }
//     };

//     fetchEmployeeData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   // Prepare data for proficiency level visualization
//   const proficiencyLevels = [
//     'Not at all proficient', 'Slightly proficient', 'Moderately proficient', 
//     'Very proficient', 'Extremely proficient', 'Expert', 'Master', 
//     'Leader', 'Innovator', 'Visionary'
//   ];

//   const countProficiencyLevels = (skills) => {
//     return proficiencyLevels.map((level) => 
//       Object.values(skills).filter(skill => skill === level).length
//     );
//   };

//   const technicalProficiencyData = countProficiencyLevels(technicalSkills);
//   const softProficiencyData = countProficiencyLevels(softSkills);

//   const proficiencyChartData = {
//     labels: proficiencyLevels,
//     datasets: [
//       {
//         label: 'Technical Skills',
//         data: technicalProficiencyData,
//         backgroundColor: 'rgba(75, 192, 192, 0.5)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Soft Skills',
//         data: softProficiencyData,
//         backgroundColor: 'rgba(255, 159, 64, 0.5)',
//         borderColor: 'rgba(255, 159, 64, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const proficiencyChartOptions = {
//     responsive: true,
//     scales: {
//       x: { title: { display: true, text: 'Proficiency Levels' } },
//       y: { beginAtZero: true, title: { display: true, text: 'Number of Skills' } }
//     },
//     plugins: {
//       legend: { position: 'top' },
//     },
//   };

//   // Data for Bar Chart (Projects)
//   const projectData = {
//     labels: [
//       'Software Engineer Projects',
//       'Consultant Projects',
//       'Data Science Projects',
//       'Full Stack Projects',
//       'Data Analyst Projects',
//       'Data Engineer Projects',
//     ],
//     datasets: [
//       {
//         label: 'Number of Projects',
//         data: [
//           projectSkills?.softwareEngineerProjects || 0,
//           projectSkills?.consultantProjects || 0,
//           projectSkills?.dataScienceProjects || 0,
//           projectSkills?.fullStackProjects || 0,
//           projectSkills?.dataAnalystProjects || 0,
//           projectSkills?.dataEngineerProjects || 0,
//         ],
//         backgroundColor: [
//           '#1E3A8A', // Dark Blue
//           '#1D4ED8', // Blue
//           '#3B82F6', // Sky Blue
//           '#60A5FA', // Light Blue
//           '#93C5FD', // Lighter Blue
//           '#BFDBFE'  // Very Light Blue
//         ],
//         borderColor: '#1E40AF', // Darker shade for borders
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Data for Radar Chart (Skills)
//   const skillsData = {
//     labels: ['Communication', 'Problem Solving', 'Time Management', 'Programming Languages', 'Web Development', 'Database Management'],
//     datasets: [
//       {
//         label: 'Soft Skills',
//         data: [
//           softSkills?.communication || 0,
//           softSkills?.problemSolving || 0,
//           softSkills?.timeManagement || 0,
//           0,
//           0,
//           0,
//         ],
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Technical Skills',
//         data: [
//           0, 
//           0, 
//           0,
//           technicalSkills?.programmingLanguages || 0,
//           technicalSkills?.webDevelopment || 0,
//           technicalSkills?.databaseManagement || 0,
//         ],
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <Container fluid className="dashboard-container">
//       <h2 className="dashboard-title">Employee Dashboard</h2>

//       <Row className="mb-4">
//         {/* General Information */}
//         {employeeData && (
//           <Col md={4}>
//             <Card title="General Information">
//               <p><strong>Name:</strong> {employeeData.firstName} {employeeData.lastName}</p>
//               <p><strong>Employee ID:</strong> {employeeData.employeeid}</p>
//               <p><strong>Position:</strong> {employeeData.position}</p>
//               <p><strong>Status:</strong> {employeeData.employmentStatus}</p>
//             </Card>
//           </Col>
//         )}

//         {/* Total Courses Completed */}
//         <Col md={4}>
//           <Card title="Total Courses Completed">
//             <h1 className="card-count">{courses?.totalCourses || 0}</h1>
//           </Card>
//         </Col>

//         {/* Ongoing Courses */}
//         <Col md={4}>
//           <Card title="Courses">
//             <p><strong>Name:</strong> {courses?.courseName || 'No ongoing courses'}</p>
//             <p><strong>Specialization:</strong> {courses?.specialization || 'N/A'}</p>
//             <p><strong>Status:</strong> {courses?.completionStatus || 'N/A'}</p>
//             <p><strong>Mode:</strong> {courses?.courseType || 'N/A'}</p>
//           </Card>
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         {/* Certifications Specialization */}
//         <Col md={4}>
//           <Card title="Specialization">
//             <p>{certifications?.specialization || 'No specializations available'}</p>
//           </Card>
//         </Col>

//         {/* Competency Level */}
//         <Col md={4}>
//           <Card title="Certification">
//             <p><strong>Course Name:</strong> {certifications?.certificationTitle || 'N/A'}</p>
//             <p><strong>Competency Level:</strong> {certifications?.competencyLevel || 'N/A'}</p>
//           </Card>
//         </Col>

//         {/* Tool Specialized */}
//         <Col md={4}>
//           <Card title="Tool Specialized">
//             <p><strong>Tool:</strong> {projectSkills?.toolsUsed || 'N/A'}</p>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={6}>
//           <h3>Proficiency Level</h3>
//           <Bar data={proficiencyChartData} options={proficiencyChartOptions} />
//         </Col>

//         <Col md={6}>
//           <h3>Project Data</h3>
//           <Bar data={projectData} options={{ responsive: true }} />
//         </Col>
//       </Row>

//       <Row>
//         <Col md={12}>
//           <h3>Skills Overview</h3>
//           <Radar data={skillsData} options={{ responsive: true }} />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// const Card = ({ title, children }) => (
//   <div className="custom-card">
//     <h5 className="card-title">{title}</h5>
//     <div className="card-body">{children}</div>
//   </div>
// );

// export default EmployeeDashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './employee.css'; // Make sure to create this CSS file with custom styles

const EmployeeDashboard = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [technicalSkills, setTechnicalSkills] = useState({});
  const [softSkills, setSoftSkills] = useState({});
  const [achievements, setAchievements] = useState(null);
  const [certifications, setCertifications] = useState(null);
  const [courses, setCourses] = useState(null);
  const [projectSkills, setProjectSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const userId = localStorage.getItem("userConfig");
        const responses = await Promise.all([
          axios.get('http://127.0.0.1:8080/api/softskills', { params: { userId } }),
          axios.get('http://127.0.0.1:8080/api/technical', { params: { userId } }),
          axios.get('http://127.0.0.1:8080/api/achievements/id', { params: { userId } }),
          axios.get('http://127.0.0.1:8080/api/certifications/certifications/id', { params: { userId } }),
          axios.get('http://127.0.0.1:8080/api/courses', { params: { userId } }),
          axios.get('http://127.0.0.1:8080/api/project', { params: { userId } }),
          axios.get('http://127.0.0.1:8080/api/personal/byid', { params: { userId } })
        ]);

        setSoftSkills(responses[0].data);
        setTechnicalSkills(responses[1].data);
        setAchievements(responses[2].data);
        setCertifications(responses[3].data);
        setCourses(responses[4].data);
        setProjectSkills(responses[5].data);
        setEmployeeData(responses[6].data);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching data');
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  // Prepare data for proficiency level visualization
  const proficiencyLevels = [
    'Not at all proficient', 'Slightly proficient', 'Moderately proficient',
    'Very proficient', 'Extremely proficient', 'Expert', 'Master',
    'Leader', 'Innovator', 'Visionary'
  ];

  const countProficiencyLevels = (skills) => {
    return proficiencyLevels.map((level) =>
      Object.values(skills).filter(skill => skill === level).length
    );
  };

  const technicalProficiencyData = countProficiencyLevels(technicalSkills);
  const softProficiencyData = countProficiencyLevels(softSkills);

  const proficiencyChartData = {
    labels: proficiencyLevels,
    datasets: [
      {
        label: 'Technical Skills',
        data: technicalProficiencyData,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Soft Skills',
        data: softProficiencyData,
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const proficiencyChartOptions = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Proficiency Levels' } },
      y: { beginAtZero: true, title: { display: true, text: 'Number of Skills' } }
    },
    plugins: {
      legend: { position: 'top' },
    },
  };

  // Data for Bar Chart (Projects)
  const projectData = {
    labels: [
      'Software Engineer Projects',
      'Consultant Projects',
      'Data Science Projects',
      'Full Stack Projects',
      'Data Analyst Projects',
      'Data Engineer Projects',
    ],
    datasets: [
      {
        label: 'Number of Projects',
        data: [
          projectSkills?.softwareEngineerProjects || 0,
          projectSkills?.consultantProjects || 0,
          projectSkills?.dataScienceProjects || 0,
          projectSkills?.fullStackProjects || 0,
          projectSkills?.dataAnalystProjects || 0,
          projectSkills?.dataEngineerProjects || 0,
        ],
        backgroundColor: [
          '#1E3A8A', '#1D4ED8', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'
        ],
        borderColor: '#1E40AF',
        borderWidth: 1,
      },
    ],
  };

  // Data for Radar Chart (Skills)
  const skillsData = {
    labels: ['Communication', 'Problem Solving', 'Time Management', 'Programming Languages', 'Web Development', 'Database Management'],
    datasets: [
      {
        label: 'Soft Skills',
        data: [
          softSkills?.communication || 0,
          softSkills?.problemSolving || 0,
          softSkills?.timeManagement || 0,
          0, 0, 0,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Technical Skills',
        data: [
          0, 0, 0,
          technicalSkills?.programmingLanguages || 0,
          technicalSkills?.webDevelopment || 0,
          technicalSkills?.databaseManagement || 0,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container fluid className="dashboard-container">
      {/* <h2 className="dashboard-title">Employee Dashboard</h2> */}

      <Row className="mb-4">
        {/* General Information */}
        {employeeData && (
          <Col md={4}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title><strong>General Information</strong></Card.Title>
                <p><strong>Name:</strong> {employeeData.firstName} {employeeData.lastName}</p>
                <p><strong>Employee ID:</strong> {employeeData.employeeid}</p>
                <p><strong>Position:</strong> {employeeData.position}</p>
                <p><strong>Status:</strong> {employeeData.employmentStatus}</p>
              </Card.Body>
            </Card>
          </Col>
        )}

        {/* Total Courses Completed */}
        <Col md={4}>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title><strong>Total Courses Completed</strong></Card.Title>
              <h1 className="card-count">{courses?.totalCourses || 0}</h1>
            </Card.Body>
          </Card>
        </Col>

        {/* Ongoing Courses */}
        <Col md={4}>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title><strong>Courses</strong></Card.Title>
              <p><strong>Name:</strong> {courses?.courseName || 'No ongoing courses'}</p>
              
              <p><strong>Status:</strong> {courses?.completionStatus || 'N/A'}</p>
              <p><strong>Mode:</strong> {courses?.courseType || 'N/A'}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        {/* Certifications Specialization */}
        <Col md={4}>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title><strong>Specialization</strong></Card.Title>
              <p>{certifications?.specialization || 'No specializations available'}</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Competency Level */}
        <Col md={4}>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title><strong>Certification</strong></Card.Title>
              <p><strong>Course Name:</strong> {certifications?.certificationTitle || 'N/A'}</p>
              <p><strong>Competency Level:</strong> {certifications?.competencyLevel || 'N/A'}</p>
        
            </Card.Body>
          </Card>
        </Col>

 
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title><strong>Proficiency Level</strong></Card.Title>
              <Bar data={proficiencyChartData} options={proficiencyChartOptions} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title><strong>Projects Distribution</strong></Card.Title>
              <Bar data={projectData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>


    </Container>
  );
};

export default EmployeeDashboard;
