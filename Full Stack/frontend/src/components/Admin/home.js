
import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import Header from './AdminNav';
import Sidebar from './sidebar';
import './Home.css';

const Home = () => {
    const [softSkills, setSoftSkills] = useState([]);
    const [technicalSkills, setTechnicalSkills] = useState([]);
    const [projectSkills, setProjectSkills] = useState([]);
    const [courses, setCourses] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);

    const proficiencyLevels = {
        'Not at all proficient': 1,
        'Slightly proficient': 2,
        'Moderately proficient': 3,
        'Very proficient': 4,
        'Extremely proficient': 5,
        'Expert': 6,
        'Master': 7,
        'Leader': 8,
        'Innovator': 9,
        'Visionary': 10
    };

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
                console.error('Error fetching data:', err.message);
            }
        };
        fetchData();
    }, []);

    const getEmployeeInfo = (userId) => {
        const employee = employeeData.find(emp => emp.userId === userId);
        return employee ? { name: `${employee.firstName} ${employee.lastName}`, id: employee.employeeid } : { name: 'N/A', id: 'N/A' };
    };

    const addEmployeeInfoToData = (dataArray) => {
        return dataArray.map(item => {
            const { name, id } = getEmployeeInfo(item.userId);
            return { ...item, employeeName: name, employeeId: id };
        });
    };

    const employeeCountByPosition = {};
    employeeData.forEach(employee => {
        const position = employee.position; // Assuming position field exists
        if (employeeCountByPosition[position]) {
            employeeCountByPosition[position]++;
        } else {
            employeeCountByPosition[position] = 1;
        }
    });

    const barChartData = {
        labels: Object.keys(employeeCountByPosition),
        datasets: [{
            label: 'Employee Count by Position',
            backgroundColor: '#42A5F5',
            data: Object.values(employeeCountByPosition),
        }]
    };

    // Course completion rate
    const completedCourses = courses.filter(course => course.completionStatus).length;
    const totalCourses = courses.length;
    const completionRate = totalCourses ? (completedCourses / totalCourses) * 100 : 0;

    // Line chart data - Assume we have a `courseCompletionHistory` array
    const courseCompletionHistory = []; // This would come from your API
    const lineChartData = {
        labels: courseCompletionHistory.map(item => item.dateObtained), // Use appropriate date format
        datasets: [{
            label: 'Courses Completed Over Time',
            data: courseCompletionHistory.map(item => item.completedCourses), // Number of courses completed on that date
            fill: false,
            borderColor: '#66BB6A',
            tension: 0.1,
        }]
    };

    const enrichedCourses = addEmployeeInfoToData(courses);
    const totalEmployees = employeeData.length;

    const fullTimeEmployees = employeeData.filter(emp => emp.employmentStatus === 'full_time').length;
    const internEmployees = employeeData.filter(emp => emp.employmentStatus === 'intern').length;

    const employeeWithMostCourses = enrichedCourses.reduce((max, course) => {
        if (!max || course.totalCourses > max.totalCourses) {
            return course;
        }
        return max;
    }, null);

    const mostCoursesEmployeeName = employeeWithMostCourses
        ? `${employeeWithMostCourses.employeeName || 'Unknown'} (${employeeWithMostCourses.totalCourses} courses)`
        : 'N/A';

    const competencyLevels = {
        beginner: 0,
        intermediate: 0,
        advanced: 0,
    };

    certifications.forEach(cert => {
        if (cert.competencyLevel === 'Beginner') competencyLevels.beginner++;
        else if (cert.competencyLevel === 'Intermediate') competencyLevels.intermediate++;
        else if (cert.competencyLevel === 'Advanced') competencyLevels.advanced++;
    });

    const calculateSkillScore = (skill, skillType) => {
        return Object.keys(skill).reduce((acc, key) => {
            const proficiency = skill[key];
            const score = proficiencyLevels[proficiency] || 0;
            return acc + score;
        }, 0);
    };

    const highestSoftSkills = softSkills.reduce((max, skill) => {
        const totalScore = calculateSkillScore(skill, 'soft');
        return totalScore > max.totalScore ? { ...skill, totalScore } : max;
    }, { totalScore: 0 });

    const topSoftSkillsEmployee = getEmployeeInfo(highestSoftSkills.userId);

    const highestTechnicalSkills = technicalSkills.reduce((max, skill) => {
        const totalScore = calculateSkillScore(skill, 'technical');
        return totalScore > max.totalScore ? { ...skill, totalScore } : max;
    }, { totalScore: 0 });

    const topTechnicalSkillsEmployee = getEmployeeInfo(highestTechnicalSkills.userId);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <div style={{ display: 'flex', flexGrow: 1 }}>
                <Sidebar />
                <div className="dashboard-content container-fluid" style={{ padding: '20px' }}>
                    
                    <div className='row'>
                        <div className="col-md-3">
                            <Card title="Total Employees" style={{ margin: '1rem' }}>
                                <p className='mt-4'>Total Employees: {totalEmployees}</p>
                            </Card>
                        </div>
                        <div className="col-md-3">
                            <Card title="Full-Time Employees" style={{ margin: '1rem' }}>
                                <p className='mt-4'>Full-Time Employees: {fullTimeEmployees}</p>
                            </Card>
                        </div>
                        
                        <div className="col-md-3">
                            <Card title="Intern Employees" style={{ margin: '1rem' }}>
                                <p className='mt-4'>Intern Employees: {internEmployees}</p>
                            </Card>
                        </div>

                        <div className="col-md-3">
                            <Card title="Completion Rate" style={{ margin: '1rem' }}>
                                <p className='mt-4'>Course Completion Rate: {completionRate.toFixed(2)}%</p>
                            </Card>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='row'>

                                <div className='col-md-6'>
                                    <div>
                                        <Card style={{ margin: '1rem' }}>
                                            {/* <Card.Body> */}
                                                <p className='p-card-title'>Competency Levels</p>
                                                <p className='my-1'>Beginner: {competencyLevels.beginner}</p>
                                                <p className='my-1'>Intermediate: {competencyLevels.intermediate}</p>
                                                <p className='my-1'>Advanced: {competencyLevels.advanced}</p>
                                            {/* </Card.Body> */}
                                        </Card>
                                    </div>
                                    <div>
                                        <Card title="Top Skills by Employee" style={{ margin: '1rem' }}>
                                            <p>Soft Skills: {topSoftSkillsEmployee.name} ({highestSoftSkills.totalScore} points)</p>
                                            <p>Technical Skills: {topTechnicalSkillsEmployee.name} ({highestTechnicalSkills.totalScore} points)</p>
                                        </Card>
                                    </div>
                                    <div>
                                        <Card title="Top Score" style={{ margin: '1rem' }}>
                                            <p>{mostCoursesEmployeeName}</p>
                                        </Card>
                                    </div>            
                                </div>
                                <div className="col-md-6">
                                    <Card title="Competency Level Distribution" style={{ margin: '1rem', height:'462px'}}>
                                        <Chart type="pie" style={{height:'430px'}} data={{
                                            labels: Object.keys(competencyLevels),
                                            datasets: [{
                                                data: Object.values(competencyLevels),
                                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                                            }],
                                            options: {
                                                responsive: true,
                                                maintainAspectRatio: false,
                                            }
                                        }} />
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Card title="Employee Count by Position" style={{ margin: '1rem' }}>
                                <Chart type="bar" style={{height:'380px'}} data={barChartData} />
                            </Card>
                        </div>
                    </div>
                                
                    
                </div>
            </div>
        </div>
    );
};

export default Home;
