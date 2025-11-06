import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { FullPageLoader } from './components/ui';

// Lazy load pages for better performance
const MainPage = lazy(() => import('./pages/MainPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Settings = lazy(() => import('./pages/Settings'));

// Dashboard Pages
const AnalyticsDashboardPage = lazy(() => import('./pages/dashboards/AnalyticsDashboardPage'));
const EcommerceDashboardPage = lazy(() => import('./pages/dashboards/EcommerceDashboardPage'));

// User Management
const UserListPage = lazy(() => import('./pages/users/UserListPage'));
const UserDetails = lazy(() => import('./pages/users/UserDetails'));
const UserEdit = lazy(() => import('./pages/users/UserEdit'));

// Product Management
const ProductListPage = lazy(() => import('./pages/products/ProductListPage'));
const ProductDetails = lazy(() => import('./pages/products/ProductDetails'));
const ProductForm = lazy(() => import('./pages/products/ProductForm'));

// Orders
const Orders = lazy(() => import('./pages/orders/Orders'));
const OrderDetails = lazy(() => import('./pages/orders/OrderDetails'));

// Invoices
const Invoices = lazy(() => import('./pages/invoices/Invoices'));
const InvoiceDetails = lazy(() => import('./pages/invoices/InvoiceDetails'));

// Demo Pages
const ComponentsDemo = lazy(() => import('./pages/ComponentsDemo'));
const Components = lazy(() => import('./pages/Components'));

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
        <Suspense fallback={<FullPageLoader message="Loading page..." />}>
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
        </Suspense>
      </Router>
    </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
