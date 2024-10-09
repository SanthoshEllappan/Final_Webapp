


import { useState, useEffect } from 'react';
import axios from 'axios';
import UserDetails from './UserDetail';
import AdminHeader from './AdminNav';
import Sidebar from './sidebar';
import { Card } from 'primereact/card';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './index.css';

export default function AdminHome() {
    const [click, setClick] = useState('');
    const [employeeData, setEmployeeData] = useState([{}]);
    const [achievements, setAchievements] = useState([{}]);
    const [certifications, setCertifications] = useState([{}]);
    const [course, setCourse] = useState([{}]);
    const [projectSkill, setProjectSkill] = useState([{}]);
    const [softSkills, setSoftSkills] = useState([{}]);
    const [technicalSkills, setTechnicalSkills] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            if (click !== '') {
                const id = click;
                const achievementsResponse = await axios.get(`http://127.0.0.1:8080/api/achievements/achievements/${id}`);
                setAchievements([achievementsResponse.data]);
                
                const certificationsResponse = await axios.get(`http://127.0.0.1:8080/api/certifications/${id}`);
                setCertifications([certificationsResponse.data]);

                const courseResponse = await axios.get(`http://127.0.0.1:8080/api/courses/${id}`);
                setCourse([courseResponse.data]);

                const projectSkillResponse = await axios.get(`http://127.0.0.1:8080/api/project/${id}`);
                setProjectSkill([projectSkillResponse.data]);

                const softSkillsResponse = await axios.get(`http://127.0.0.1:8080/api/softskills/${id}`);
                setSoftSkills([softSkillsResponse.data]);

                const technicalSkillsResponse = await axios.get(`http://127.0.0.1:8080/api/technical/${id}`);
                setTechnicalSkills([technicalSkillsResponse.data]);

                
        // Fetch employee data
        const employeeResponse = await axios.get('http://127.0.0.1:8080/api/personal/admin', {
            params: { id }
          });
          setEmployeeData([employeeResponse.data]);
          
        }
        setLoading(false);
    } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [click]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="admin-home">
            <AdminHeader />
            <div className="content-wrapper">
                {click === '' ? (
                    <div className="layout">
                        <Sidebar />
                        <UserDetails setClick={setClick} />
                    </div>
                ) : (
                    <div className='layout'>

                            <Sidebar />
                        <div className="data-content">
                        {
                            Object.keys(employeeData[0]).length!=0?(
                                <>
                                <h2>Employee Details</h2>
                                <DataTable value={employeeData} responsiveLayout="scroll">
                                    <Column field="employeeid" header="Employee ID" />
                                    <Column field="firstName" header="First Name" />
                                    <Column field="lastName" header="Last Name" />
                                    <Column field="email" header="Email" />
                                    <Column field="phone" header="Phone" />
                                    <Column field="position" header="Position" />
                                    <Column field="startDate" header="Start Date" body={data => new Date(data.startDate).toLocaleDateString()} />
                                    <Column field="dateOfBirth" header="Date of Birth" body={data => new Date(data.dateOfBirth).toLocaleDateString()} />
                                    <Column field="gender" header="Gender" />
                                    
                                    <Column field="employmentStatus" header="Employment Status" />
                            
                                    <Column field="createdAt" header="Created At" body={data => new Date(data.createdAt).toLocaleString()} />
                                    <Column field="updatedAt" header="Updated At" body={data => new Date(data.updatedAt).toLocaleString()} />
                                </DataTable>
                                </>
                            ):(
                                <Card title="Employee Details">
                                    <p>No information available. Please fill the mandatory forms.</p>
                                </Card>
                            )
                        }
                            {
                                Object.keys(softSkills[0]).length!=0 ? (
                                    <>
                                    <h2 className="section-title">Soft Skills</h2>
                                    <DataTable value={softSkills} paginator rows={5} responsiveLayout="scroll" className="p-mb-4">
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
                                    </>
                                ):(
                                    <Card title="Soft Skills">
                                        <p>No information available. Please fill the mandatory forms.</p>
                                    </Card>
                                )
                            }

                            {
                                Object.keys(technicalSkills[0]).length!=0 ?(
                                    <>
                                    <h2 className="section-title">Technical Skills</h2>
                                    <DataTable value={technicalSkills} paginator rows={5} responsiveLayout="scroll" className="p-mb-4">
                                        <Column field="programmingLanguages" header="Programming Languages" />
                                        <Column field="webDevelopment" header="Web Development" />
                                        <Column field="databaseManagement" header="Database Management" />
                                        <Column field="cloudComputing" header="Cloud Computing" />
                                        <Column field="versionControl" header="Version Control" />
                                        <Column field="machineLearning" header="Machine Learning" />
                                        <Column field="dataAnalysis" header="Data Analysis" />
                                        <Column field="cybersecurity" header="Cybersecurity" />
                                    </DataTable>
                                    </>
                                ):(
                                    <Card title="Technical Skills">
                                        <p>No information available. Please fill the mandatory forms.</p>
                                    </Card>
                                )
                            }

                            {
                                Object.keys(projectSkill[0]).length!=0 ? (
                                    <>
                                    <h2 className="section-title">Project Skills</h2>
                                    <DataTable value={projectSkill} paginator rows={5} responsiveLayout="scroll" className="p-mb-4">
                                        <Column field="projectType" header="Project Type" />
                                        <Column field="softwareEngineerProjects" header="Software Engineer Projects" />
                                        <Column field="consultantProjects" header="Consultant Projects" />
                                        <Column field="fullStackProjects" header="Full Stack Projects" />
                                        <Column field="dataAnalystProjects" header="Data Analyst Projects" />
                                        <Column field="dataEngineerProjects" header="Data Engineer Projects" />
                                        <Column field="dataScienceProjects" header="Data Science Projects" />
                                        <Column field="toolsUsed" header="Tools Used" />
                                        <Column field="favoriteProject" header="Favorite Project" />
                                    </DataTable>
                                    </>
                                ):(
                                    <Card title="Project Skills">
                                        <p>No information available. Please fill the mandatory forms.</p>
                                    </Card>
                                )
                            }

                            {
                                Object.keys(course[0]).length!=0?(
                                    <>
                                    <h2 className="section-title">Courses</h2>
                                    <DataTable value={course} paginator rows={5} responsiveLayout="scroll" className="p-mb-4">
                                        <Column field="courseName" header="Course Name" />
                                        <Column field="platform" header="Platform" />
                                        <Column field="specialization" header="Specialization" />
                                        <Column field="totalCourses" header="Total Courses" />
                                        <Column field="courseDuration" header="Duration (Months)" />
                                        <Column field="completionStatus" header="Completion Status" />
                                        <Column field="createdAt" header="Created At" body={(rowData) => new Date(rowData.createdAt).toLocaleDateString()} />
                                    </DataTable>
                                    </>
                                ):(
                                    <Card title="Courses">
                                        <p>No information available. Please fill the mandatory forms.</p>
                                    </Card>
                                )
                            }

                            {
                                Object.keys(achievements[0]).length!=0?(
                                    <>
                                        <h2 className="section-title">Achievements</h2>
                                        <DataTable value={achievements} paginator rows={5} responsiveLayout="scroll" className="p-mb-4">
                                            <Column field="achievementTitle" header="Title" />
                                            <Column field="organization" header="Organization" />
                                            <Column field="dateAchieved" header="Date Achieved" body={(rowData) => new Date(rowData.dateAchieved).toLocaleDateString()} />
                                            <Column field="description" header="Description" />
                                            <Column field="category" header="Category" />
                                        </DataTable>
                                    </>
                                ):(
                                    <Card title="Achievements">
                                        <p>No information available. Please fill the mandatory forms.</p>
                                    </Card>
                                )
                            }

                            {
                                Object.keys(certifications[0]).length!=0?(
                                    <>
                                        <h2 className="section-title">Certifications</h2>
                                        <DataTable value={certifications} paginator rows={5} responsiveLayout="scroll" className="p-mb-4">
                                            <Column field="certificationTitle" header="Title" />
                                            <Column field="platform" header="Platform" />
                                            <Column field="specialization" header="Specialization" />
                                            <Column field="duration" header="Duration (Months)" />
                                            <Column field="dateObtained" header="Date Obtained" body={(rowData) => new Date(rowData.dateObtained).toLocaleDateString()} />
                                        </DataTable>
                                    </>
                                ):(
                                    <Card title="Certifications">
                                        <p>No information available. Please fill the mandatory forms.</p>
                                    </Card>
                                )
                            }


                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
