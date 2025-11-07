import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { BackgroundProvider } from './context/BackgroundContext';
import { FullPageLoader } from './components/ui';
import DynamicBackground from './components/DynamicBackground';

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

// Calendar
const CalendarPage = lazy(() => import('./pages/CalendarPage'));

// Scrum Board
const ScrumBoardPage = lazy(() => import('./pages/ScrumBoardPage'));

// Financial
const FinancialPage = lazy(() => import('./pages/FinancialPage'));

function App() {
  return (
    <LanguageProvider>
      <BackgroundProvider>
        <ThemeProvider>
          {/* SVG Filter for Liquid Glass Effect */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="0"
            height="0"
            style={{ position: 'absolute', overflow: 'hidden' }}
            className="hidden"
          >
            <defs>
              <filter
                id="glass-distortion"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.008 0.008"
                  numOctaves="2"
                  seed="92"
                  result="noise"
                />
                <feGaussianBlur
                  in="noise"
                  stdDeviation="2"
                  result="blurred"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="blurred"
                  scale="77"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          {/* Dynamic Background - Customizable via Settings */}
          <DynamicBackground />

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

                {/* Calendar */}
                <Route path="/dashboard/calendar" element={<CalendarPage />} />

                {/* Scrum Board */}
                <Route path="/dashboard/scrum-board" element={<ScrumBoardPage />} />

                {/* Financial */}
                <Route path="/dashboard/financial" element={<FinancialPage />} />

                {/* Demo Pages */}
                <Route path="/dashboard/components" element={<Components />} />
                <Route path="/dashboard/components-demo" element={<ComponentsDemo />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </BackgroundProvider>
    </LanguageProvider>
  );
}

export default App;
