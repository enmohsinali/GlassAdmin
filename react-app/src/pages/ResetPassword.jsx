import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Input, Button, Alert } from '../components/ui';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

/**
 * Reset Password Page
 */
const ResetPassword = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const bgColor = isDark ? 'bg-theme-dark-bg' : 'bg-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';

  // Password strength indicator
  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z\d]/.test(pass)) strength++;
    return strength;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', 'text-primary-red', 'text-[#ffbd2e]', 'text-[#3a6df0]', 'text-primary-green'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-8 rounded-[14px] backdrop-blur-[20px] ${bgColor}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-[24px] font-medium mb-2 ${textColor}`}>
            Reset Password
          </h1>
          <p className={`text-[15px] ${inactiveColor}`}>
            Create a new strong password for your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="error">
              {error}
            </Alert>
          )}

          <Input
            type={showPassword ? 'text' : 'password'}
            label="New Password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            required
          />

          {/* Password Strength */}
          {password && (
            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-all ease-[0.3s] ${
                      level <= strength
                        ? level === 1
                          ? 'bg-primary-red'
                          : level === 2
                          ? 'bg-[#ffbd2e]'
                          : level === 3
                          ? 'bg-[#3a6df0]'
                          : 'bg-primary-green'
                        : 'bg-[rgba(113,119,144,0.2)]'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-[14px] ${strengthColors[strength]}`}>
                {strengthLabels[strength]}
              </p>
            </div>
          )}

          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={isLoading}
            leftIcon={<CheckCircle className="w-4 h-4" />}
          >
            Reset Password
          </Button>

          <div className="text-center">
            <Link to="/login" className={`text-[15px] hover:opacity-80 transition-all ease-[0.3s] ${inactiveColor}`}>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
