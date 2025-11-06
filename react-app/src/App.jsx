import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AnalyticsDashboardPage from './pages/dashboards/AnalyticsDashboardPage';
import EcommerceDashboardPage from './pages/dashboards/EcommerceDashboardPage';
import UserListPage from './pages/users/UserListPage';
import ProductListPage from './pages/products/ProductListPage';

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
          <Route path="/dashboard/analytics" element={<AnalyticsDashboardPage />} />
          <Route path="/dashboard/ecommerce" element={<EcommerceDashboardPage />} />
          <Route path="/dashboard/users" element={<UserListPage />} />
          <Route path="/dashboard/products" element={<ProductListPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
