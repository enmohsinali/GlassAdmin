import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  Sun,
  Moon,
} from 'lucide-react';
import { Avatar } from '../components/ui';

/**
 * Dashboard Layout with glassmorphic sidebar
 * Inspired by Apple iOS 26 Liquid Glass UI
 */
const DashboardLayout = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Analytics Dashboard', icon: LayoutDashboard, href: '/dashboard/analytics', current: true },
    { name: 'E-commerce', icon: ShoppingCart, href: '/dashboard/ecommerce' },
    { name: 'Users', icon: Users, href: '/dashboard/users' },
    { name: 'Products', icon: FileText, href: '/dashboard/products' },
    { name: 'Messages', icon: MessageSquare, href: '/dashboard/messages' },
    { name: 'Calendar', icon: Calendar, href: '/dashboard/calendar' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          'hidden md:flex flex-col fixed inset-y-0 left-0 z-50 transition-all duration-300',
          isDark
            ? 'bg-glass-dark border-r border-border-glass-dark'
            : 'bg-glass-light border-r border-border-glass-light',
          'backdrop-blur-glass-lg shadow-glass',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border-dark">
          {sidebarOpen && (
            <h1
              className={cn(
                'text-xl font-bold bg-clip-text text-transparent bg-luminous-gradient-6',
                'transition-opacity duration-300'
              )}
            >
              GlassAdmin
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn(
              'p-2 rounded-lg transition-all duration-300',
              isDark
                ? 'hover:bg-glass-dark-hover text-text-dark-primary'
                : 'hover:bg-glass-light-hover text-text-light-primary'
            )}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2.5 rounded-xl transition-all duration-300 group',
                item.current
                  ? isDark
                    ? 'bg-primary-blue text-white shadow-neon-blue'
                    : 'bg-primary-blue text-white shadow-lg'
                  : isDark
                  ? 'text-text-dark-secondary hover:bg-glass-dark-hover hover:text-text-dark-primary'
                  : 'text-text-light-secondary hover:bg-glass-light-hover hover:text-text-light-primary'
              )}
            >
              <item.icon className={cn('w-5 h-5 flex-shrink-0', !sidebarOpen && 'mx-auto')} />
              {sidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
            </a>
          ))}
        </nav>

        {/* User profile */}
        {sidebarOpen && (
          <div
            className={cn(
              'p-4 border-t',
              isDark ? 'border-border-dark' : 'border-border-light'
            )}
          >
            <div className="flex items-center space-x-3">
              <Avatar
                src="https://ui-avatars.com/api/?name=Admin+User&background=3a6df0&color=fff"
                size="md"
                status="online"
              />
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    'text-sm font-medium truncate',
                    isDark ? 'text-text-dark-primary' : 'text-text-light-primary'
                  )}
                >
                  Admin User
                </p>
                <p
                  className={cn(
                    'text-xs truncate',
                    isDark ? 'text-text-dark-secondary' : 'text-text-light-secondary'
                  )}
                >
                  admin@glassadmin.com
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside
            className={cn(
              'fixed inset-y-0 left-0 w-64 z-50 md:hidden transform transition-transform duration-300',
              isDark
                ? 'bg-glass-dark border-r border-border-glass-dark'
                : 'bg-glass-light border-r border-border-glass-light',
              'backdrop-blur-glass-lg shadow-glass'
            )}
          >
            {/* Mobile menu content - same as desktop */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-border-dark">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-luminous-gradient-6">
                GlassAdmin
              </h1>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'p-2 rounded-lg',
                  isDark ? 'hover:bg-glass-dark-hover' : 'hover:bg-glass-light-hover'
                )}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2.5 rounded-xl transition-all duration-300',
                    item.current
                      ? 'bg-primary-blue text-white shadow-lg'
                      : isDark
                      ? 'text-text-dark-secondary hover:bg-glass-dark-hover hover:text-text-dark-primary'
                      : 'text-text-light-secondary hover:bg-glass-light-hover hover:text-text-light-primary'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="ml-3 font-medium">{item.name}</span>
                </a>
              ))}
            </nav>
          </aside>
        </>
      )}

      {/* Main content */}
      <div
        className={cn(
          'flex-1 flex flex-col min-h-screen transition-all duration-300',
          sidebarOpen ? 'md:ml-64' : 'md:ml-20'
        )}
      >
        {/* Top navbar */}
        <header
          className={cn(
            'h-16 border-b flex items-center justify-between px-6 sticky top-0 z-30',
            isDark
              ? 'bg-glass-dark border-border-glass-dark'
              : 'bg-glass-light border-border-glass-light',
            'backdrop-blur-glass-lg shadow-glass-sm'
          )}
        >
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-glass-dark-hover"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search
                className={cn(
                  'absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5',
                  isDark ? 'text-text-dark-secondary' : 'text-text-light-secondary'
                )}
              />
              <input
                type="text"
                placeholder="Search..."
                className={cn(
                  'w-full pl-10 pr-4 py-2 rounded-xl border transition-all duration-300',
                  isDark
                    ? 'bg-glass-dark border-border-glass-dark text-text-dark-primary placeholder-text-dark-secondary focus:border-primary-blue'
                    : 'bg-glass-light border-border-glass-light text-text-light-primary placeholder-text-light-secondary focus:border-primary-blue',
                  'backdrop-blur-glass focus:outline-none focus:ring-2 focus:ring-primary-blue'
                )}
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                'p-2 rounded-lg transition-all duration-300',
                isDark
                  ? 'hover:bg-glass-dark-hover text-text-dark-primary'
                  : 'hover:bg-glass-light-hover text-text-light-primary'
              )}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <button
              className={cn(
                'p-2 rounded-lg transition-all duration-300 relative',
                isDark
                  ? 'hover:bg-glass-dark-hover text-text-dark-primary'
                  : 'hover:bg-glass-light-hover text-text-light-primary'
              )}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
            </button>

            {/* User avatar */}
            <Avatar
              src="https://ui-avatars.com/api/?name=Admin+User&background=3a6df0&color=fff"
              size="sm"
              status="online"
            />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
