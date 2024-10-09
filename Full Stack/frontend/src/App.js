import { Routes, Route } from 'react-router-dom';
import EmployeeIntro from './components/Home/Home';
import Certifications from './components/Certifications';
import SoftSkillsForm from './components/softskills';
import TechnicalSkillsForm from './components/technicalskils';
import ProjectSkillsForm from './components/projects';
import AchievementsForm from './components/Achievements';
import CoursesForm from './components/Courses';
import EmployeeDetailsForm from './components/personaldetails';
import AddUser from './components/Admin/AddUser';
import AdminHome from './components/Admin/AdminHome';
import Home from "./components/Admin/home"
import EditUser from './components/Admin/EditUser';
import { ProtRouteAdmin } from './components/auth/ProtRouteAdmin';
import { ProtRouteUser } from './components/auth/ProtRouteUser';
import { AuthProvider } from './components/AuthRouter';
import SignUp from './components/SignUp/SignUpForm';
import EmployeeDashboard from './components//Home/EmployeeDashboard'; // Import your dashboard component
import Details from './components/Home/details'
import AdminDetails from './components/Admin/details'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<ProtRouteUser><EmployeeIntro/></ProtRouteUser>}>
          <Route path="dashboard" element={<EmployeeDashboard />} /> {/* Dashboard route */}
          <Route path="certifications" element={<Certifications />} />
          <Route path="soft" element={<SoftSkillsForm />} />
          <Route path="technical" element={<TechnicalSkillsForm />} />
          <Route path="projects" element={<ProjectSkillsForm />} />
          <Route path="courses" element={<CoursesForm />} />
          <Route path="achievements" element={<AchievementsForm />} />
          <Route path="details" element={<EmployeeDetailsForm />} />
          <Route path="empdetails" element={<Details />} />
          <Route path="*" element={<h1>No page available</h1>} />
        </Route>
        <Route path='/admin' element={<ProtRouteAdmin><Home /></ProtRouteAdmin>} />
        <Route path='/admindetails' element={<ProtRouteAdmin><AdminDetails /></ProtRouteAdmin>} />
        <Route path='/admin/adminHome' element={<ProtRouteAdmin><AdminHome /></ProtRouteAdmin>} />
        <Route path='/admin/addUser' element={<ProtRouteAdmin><AddUser /></ProtRouteAdmin>} />
        <Route path='/admin/editUser' element={<ProtRouteAdmin><EditUser /></ProtRouteAdmin>} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
