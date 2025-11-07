import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const RegisterPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength('');
    } else if (password.length < 6) {
      setPasswordStrength('weak');
    } else if (password.length < 10) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    // Handle registration logic here
    navigate('/');
  };

  const getStrengthColor = () => {
    if (passwordStrength === 'weak') return 'bg-[#ff705c]';
    if (passwordStrength === 'medium') return 'bg-[#ffa500]';
    if (passwordStrength === 'strong') return 'bg-[#3bf083]';
    return 'bg-[rgba(113,119,144,0.25)]';
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-full ${isDark ? 'bg-[rgba(146,151,179,0.2)]' : 'bg-[rgba(255,255,255,0.9)]'} border ${isDark ? 'border-[rgba(146,151,179,0.3)]' : 'border-[rgba(0,0,0,0.15)]'} backdrop-blur-[20px] transition-all duration-300 hover:scale-110 z-50 shadow-lg`}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg className="w-5 h-5 text-[#f9fafb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <div className="register-container w-full max-w-[500px] bg-[rgba(16,18,27,0.4)] backdrop-blur-[20px] rounded-[14px] p-10 shadow-lg">
      <div className="register-header text-center mb-8">
        <div className="flex justify-center mb-6">
          <svg className="w-16 h-16" viewBox="0 0 512 512">
            <defs>
              <linearGradient id="adobe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ff0000', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ff6b6b', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect width="512" height="512" rx="60" fill="url(#adobe-gradient)" />
            <text
              x="50%"
              y="60%"
              fontFamily="'Poppins', sans-serif"
              fontSize="280"
              fontWeight="700"
              fill="#ffffff"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              A
            </text>
          </svg>
        </div>
        <h1 className="text-[28px] font-semibold text-[#f9fafb] mb-2">Create Account</h1>
        <p className="text-[14px] text-[rgba(249,250,251,0.55)]">
          Join Creative Cloud to unlock endless possibilities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="form-group">
            <label htmlFor="firstName" className="block text-[14px] text-[#f9fafb] mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input-field w-full px-4 py-3 bg-[#14162b] border border-[rgba(113,119,144,0.25)] rounded-lg text-[#f9fafb] placeholder:text-[rgba(113,119,144,0.78)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300"
              placeholder="John"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="block text-[14px] text-[#f9fafb] mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input-field w-full px-4 py-3 bg-[#14162b] border border-[rgba(113,119,144,0.25)] rounded-lg text-[#f9fafb] placeholder:text-[rgba(113,119,144,0.78)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="form-group mb-5">
          <label htmlFor="email" className="block text-[14px] text-[#f9fafb] mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field w-full px-4 py-3 bg-[#14162b] border border-[rgba(113,119,144,0.25)] rounded-lg text-[#f9fafb] placeholder:text-[rgba(113,119,144,0.78)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className="block text-[14px] text-[#f9fafb] mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field w-full px-4 py-3 bg-[#14162b] border border-[rgba(113,119,144,0.25)] rounded-lg text-[#f9fafb] placeholder:text-[rgba(113,119,144,0.78)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300"
            placeholder="Create a strong password"
            required
          />
          {passwordStrength && (
            <div className="password-strength mt-2">
              <div className="flex items-center justify-between text-[12px] mb-1">
                <span className="text-[rgba(249,250,251,0.55)]">Password strength:</span>
                <span className={`font-medium ${
                  passwordStrength === 'weak' ? 'text-[#ff705c]' :
                  passwordStrength === 'medium' ? 'text-[#ffa500]' :
                  'text-[#3bf083]'
                }`}>
                  {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[rgba(113,119,144,0.25)] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all-300 ${getStrengthColor()}`}
                  style={{
                    width: passwordStrength === 'weak' ? '33%' :
                           passwordStrength === 'medium' ? '66%' :
                           '100%'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="form-group mb-5">
          <label htmlFor="confirmPassword" className="block text-[14px] text-[#f9fafb] mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input-field w-full px-4 py-3 bg-[#14162b] border border-[rgba(113,119,144,0.25)] rounded-lg text-[#f9fafb] placeholder:text-[rgba(113,119,144,0.78)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300"
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="form-group mb-6">
          <label className="flex items-start text-[14px] text-[#f9fafb] cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 mr-2 mt-0.5 accent-[#3a6df0]"
              required
            />
            <span>
              I agree to the{' '}
              <a href="#" className="text-[#3a6df0] hover:text-[#1e59f1] transition-all-300">
                Terms and Conditions
              </a>
              {' '}and{' '}
              <a href="#" className="text-[#3a6df0] hover:text-[#1e59f1] transition-all-300">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3a6df0] border-none px-[26px] py-2 text-white rounded-[20px] mt-4 cursor-pointer transition-all duration-300 whitespace-nowrap hover:bg-[#1e59f1] font-medium"
        >
          Create Account
        </button>

        <div className="text-center mt-6">
          <p className="text-[14px] text-[rgba(249,250,251,0.55)]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#3a6df0] hover:text-[#1e59f1] transition-all-300 font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
    </>
  );
};

export default RegisterPage;
