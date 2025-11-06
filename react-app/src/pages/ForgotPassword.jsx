import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Input, Button, Alert } from '../components/ui';
import { Mail, ArrowLeft } from 'lucide-react';

/**
 * Forgot Password Page
 */
const ForgotPassword = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bgColor = isDark ? 'bg-theme-dark-bg' : 'bg-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-8 rounded-[14px] backdrop-blur-[20px] ${bgColor}`}>
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className={`text-[24px] font-medium mb-2 ${textColor}`}>
            Forgot Password?
          </h1>
          <p className={`text-[15px] ${inactiveColor}`}>
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {isSubmitted ? (
          /* Success Message */
          <div className="space-y-6">
            <Alert variant="success" title="Check your email">
              We've sent a password reset link to {email}. Please check your inbox and follow the instructions.
            </Alert>
            <Link to="/login">
              <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} className="w-full">
                Back to Login
              </Button>
            </Link>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Email Address"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={isLoading}
              disabled={!email}
            >
              Send Reset Link
            </Button>

            <div className="text-center">
              <Link to="/login" className={`text-[15px] hover:opacity-80 transition-all ease-[0.3s] ${inactiveColor}`}>
                <span className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
