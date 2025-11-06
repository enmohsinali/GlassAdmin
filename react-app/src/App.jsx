import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Main Pages
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';

// Dashboard Pages
import AnalyticsDashboardPage from './pages/dashboards/AnalyticsDashboardPage';
import EcommerceDashboardPage from './pages/dashboards/EcommerceDashboardPage';

// User Management
import UserListPage from './pages/users/UserListPage';
import UserDetails from './pages/users/UserDetails';
import UserEdit from './pages/users/UserEdit';

// Product Management
import ProductListPage from './pages/products/ProductListPage';
import ProductDetails from './pages/products/ProductDetails';
import ProductForm from './pages/products/ProductForm';

// Orders
import Orders from './pages/orders/Orders';
import OrderDetails from './pages/orders/OrderDetails';

// Invoices
import Invoices from './pages/invoices/Invoices';
import InvoiceDetails from './pages/invoices/InvoiceDetails';

// Demo Pages
import ComponentsDemo from './pages/ComponentsDemo';
import Components from './pages/Components';

function App() {
  return (
    <LanguageProvider>
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
          {/* Auth Routes */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard/analytics" element={<AnalyticsDashboardPage />} />
          <Route path="/dashboard/ecommerce" element={<EcommerceDashboardPage />} />

          {/* User Management Routes */}
          <Route path="/dashboard/users" element={<UserListPage />} />
          <Route path="/dashboard/users/:id" element={<UserDetails />} />
          <Route path="/dashboard/users/:id/edit" element={<UserEdit />} />

          {/* Product Management Routes */}
          <Route path="/dashboard/products" element={<ProductListPage />} />
          <Route path="/dashboard/products/new" element={<ProductForm />} />
          <Route path="/dashboard/products/:id" element={<ProductDetails />} />
          <Route path="/dashboard/products/:id/edit" element={<ProductForm />} />

          {/* Order Routes */}
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/orders/:id" element={<OrderDetails />} />

          {/* Invoice Routes */}
          <Route path="/dashboard/invoices" element={<Invoices />} />
          <Route path="/dashboard/invoices/:id" element={<InvoiceDetails />} />

          {/* Settings */}
          <Route path="/dashboard/settings" element={<Settings />} />

          {/* Demo Pages */}
          <Route path="/dashboard/components" element={<Components />} />
          <Route path="/dashboard/components-demo" element={<ComponentsDemo />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
