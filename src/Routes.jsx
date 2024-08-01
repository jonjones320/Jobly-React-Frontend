import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

function ProtectedRoute({ element }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? element : <Navigate to='/login' />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/companies" element={<ProtectedRoute element={<CompanyList />} />} />
      <Route path="/companies/:handle" element={<ProtectedRoute element={<CompanyDetail />} />} />
      <Route path="/jobs" element={<ProtectedRoute element={<JobList />} />} />
      <Route path="/jobs/:id" element={<ProtectedRoute element={<JobDetail />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
