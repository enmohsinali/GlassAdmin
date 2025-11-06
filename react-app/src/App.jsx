import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './layouts/DashboardLayout';
import AnalyticsDashboard from './pages/dashboards/AnalyticsDashboard';
import EcommerceDashboard from './pages/dashboards/EcommerceDashboard';
import UserList from './pages/users/UserList';

function App() {
  return (
    <ThemeProvider>
      {/* Video Background */}
      <div className="video-bg fixed right-0 top-0 w-full h-full -z-10">
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard/analytics" element={<DashboardLayout><AnalyticsDashboard /></DashboardLayout>} />
          <Route path="/dashboard/ecommerce" element={<DashboardLayout><EcommerceDashboard /></DashboardLayout>} />
          <Route path="/dashboard/users" element={<DashboardLayout><UserList /></DashboardLayout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
