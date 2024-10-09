import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Header from './AdminNav';
import Sidebar from './sidebar';
import axios from 'axios';
import './Home.css'; // Import the CSS file for custom styles

const Home = () => {
    const [softSkills, setSoftSkills] = useState([]);
    const [technicalSkills, setTechnicalSkills] = useState([]);
    const [projectSkills, setProjectSkills] = useState([]);
    const [courses, setCourses] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    axios.get('http://127.0.0.1:8080/api/softskills/all'),
                    axios.get('http://127.0.0.1:8080/api/technical/all'),
                    axios.get('http://127.0.0.1:8080/api/project/all'),
                    axios.get('http://127.0.0.1:8080/api/courses/all'),
                    axios.get('http://127.0.0.1:8080/api/achievements/all'),
                    axios.get('http://127.0.0.1:8080/api/certifications/certifications/all'),
                    axios.get('http://127.0.0.1:8080/api/personal/all'),
                ]);

                setSoftSkills(responses[0].data);
                setTechnicalSkills(responses[1].data);
                setProjectSkills(responses[2].data);
                setCourses(responses[3].data);
                setAchievements(responses[4].data);
                setCertifications(responses[5].data);
                setEmployeeData(responses[6].data);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchData();
    }, []);

    const getEmployeeInfo = (userId) => {
        const employee = employeeData?.find(emp => emp.userId === userId);
        return employee ? { name: `${employee.firstName} ${employee.lastName}`, id: employee.employeeid } : { name: 'N/A', id: 'N/A' };
    };

    const addEmployeeInfoToData = (dataArray) => {
        return dataArray.map(item => {
            const { name, id } = getEmployeeInfo(item.userId);
            return { ...item, employeeName: name, employeeId: id };
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <div style={{ display: 'flex', flexGrow: 1 }}>
                <Sidebar />
                <main className="main-content" style={{ flexGrow: 1, padding: '20px' }}>
                    {/* DataTables with styling */}
                    <h2>Employee Details</h2>
                    <DataTable value={employeeData} responsiveLayout="scroll">
                       
                        <Column field="firstName" header="Employee Name" />
                        <Column field="employeeid" header="Employee ID" />
                        
                        <Column field="email" header="Email" />
                        <Column field="phone" header="Phone" />
                        <Column field="position" header="Position" />
                        <Column field="startDate" header="Start Date" body={data => new Date(data.startDate).toLocaleDateString()} />
                        <Column field="dateOfBirth" header="Date of Birth" body={data => new Date(data.dateOfBirth).toLocaleDateString()} />
                        <Column field="gender" header="Gender" />
                        <Column field="address" header="Address" />
                        <Column field="employmentStatus" header="Employment Status" />
                        <Column field="createdAt" header="Created At" body={data => new Date(data.createdAt).toLocaleString()} />
                        <Column field="updatedAt" header="Updated At" body={data => new Date(data.updatedAt).toLocaleString()} />
                    </DataTable>
                    <h2>Soft Skills</h2>
                    <DataTable value={addEmployeeInfoToData(softSkills)} responsiveLayout="scroll">
                        <Column field="employeeName" header="Employee Name" />
                        <Column field="employeeId" header="Employee ID" />
                        <Column field="communication" header="Communication" />
                        <Column field="teamwork" header="Teamwork" />
                        <Column field="problemSolving" header="Problem Solving" />
                        <Column field="adaptability" header="Adaptability" />
                        <Column field="timeManagement" header="Time Management" />
                        <Column field="criticalThinking" header="Critical Thinking" />
                        <Column field="creativity" header="Creativity" />
                        <Column field="leadership" header="Leadership" />
                        <Column field="interpersonalSkills" header="Interpersonal Skills" />
                        <Column field="emotionalIntelligence" header="Emotional Intelligence" />
                    </DataTable>


                    <h2>Technical Skills</h2>
                    <DataTable value={addEmployeeInfoToData(technicalSkills)} responsiveLayout="scroll">
                        <Column field="employeeName" header="Employee Name" />
                        <Column field="employeeId" header="Employee ID" />
                        <Column field="programmingLanguages" header="Programming Languages" />
                        <Column field="webDevelopment" header="Web Development" />
                        <Column field="databaseManagement" header="Database Management" />
                        <Column field="cloudComputing" header="Cloud Computing" />
                        <Column field="versionControl" header="Version Control" />
                        <Column field="machineLearning" header="Machine Learning" />
                        <Column field="dataAnalysis" header="Data Analysis" />
                        <Column field="cybersecurity" header="Cybersecurity" />
                    </DataTable>

                    <h2>Project Skills</h2>
                    <DataTable value={addEmployeeInfoToData(projectSkills)} responsiveLayout="scroll">
                        <Column field="employeeName" header="Employee Name" />
                        <Column field="employeeId" header="Employee ID" />
                        <Column field="projectType" header="Project Type" />
                        <Column field="softwareEngineerProjects" header="Software Engineer Projects" />
                        <Column field="consultantProjects" header="Consultant Projects" />
                        <Column field="fullStackProjects" header="Full Stack Projects" />
                        <Column field="dataAnalystProjects" header="Data Analyst Projects" />
                        <Column field="dataEngineerProjects" header="Data Engineer Projects" />
                        <Column field="dataScienceProjects" header="Data Science Projects" />
                        <Column field="otherProjects" header="Other Projects" />
                        <Column field="toolsUsed" header="Tools Used" />
                        <Column field="favoriteProject" header="Favorite Project" />
                    </DataTable>

                    <h2>Courses</h2>
                    <DataTable value={addEmployeeInfoToData(courses)} responsiveLayout="scroll">
                        <Column field="employeeName" header="Employee Name" />
                        <Column field="employeeId" header="Employee ID" />
                        <Column field="courseName" header="Course Name" />
                        <Column field="platform" header="Platform" />
                        <Column field="specialization" header="Specialization" />
                        <Column field="totalCourses" header="Total Courses" />
                        <Column field="courseDuration" header="Duration (months)" />
                        <Column field="courseType" header="Course Type" />
                        <Column field="completionStatus" header="Completion Status" />
                        <Column field="additionalCourses" header="Additional Courses" />
                        <Column field="createdAt" header="Created At" body={(rowData) => new Date(rowData.createdAt).toLocaleDateString()} />
                    </DataTable>

                    <h2>Achievements</h2>
                    <DataTable value={addEmployeeInfoToData(achievements)} responsiveLayout="scroll">
                        <Column field="employeeName" header="Employee Name" />
                        <Column field="employeeId" header="Employee ID" />
                        <Column field="achievementTitle" header="Achievement Title" />
                        <Column field="organization" header="Organization" />
                        <Column field="dateAchieved" header="Date" body={(rowData) => new Date(rowData.dateAchieved).toLocaleDateString()} />
                        <Column field="description" header="Description" />
                    </DataTable>

                    <h2>Certifications</h2>
                    <DataTable value={addEmployeeInfoToData(certifications)} responsiveLayout="scroll">
                        <Column field="employeeName" header="Employee Name" />
                        <Column field="employeeId" header="Employee ID" />
                        <Column field="certificationTitle" header="Certification Name" />
                        <Column field="specialization" header="Specialization" />
                        <Column field="competencyLevel" header="Competency level" />
                        <Column field="dateObtained" header="Issue Date" body={(rowData) => new Date(rowData.dateObtained).toLocaleDateString()} />
                        <Column field="duration" header="Validity (months)" />
                    </DataTable>
                </main>
            </div>
        </div>
    );
};

export default Home;

