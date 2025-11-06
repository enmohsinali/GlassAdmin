import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

/**
 * 404 Not Found Page
 */
const NotFound = () => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-theme-dark-bg' : 'bg-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`text-center max-w-md w-full p-10 rounded-[14px] backdrop-blur-[20px] ${bgColor}`}>
        {/* 404 Number */}
        <div className="text-[120px] font-bold leading-none mb-4 bg-gradient-to-r from-[#3a6df0] to-[#9b5de5] bg-clip-text text-transparent">
          404
        </div>

        {/* Title */}
        <h1 className={`text-[24px] font-medium mb-3 ${textColor}`}>
          Page Not Found
        </h1>

        {/* Description */}
        <p className={`text-[15px] mb-8 ${inactiveColor}`}>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
