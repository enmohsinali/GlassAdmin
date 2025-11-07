import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import AuthPageLayout from '../layouts/AuthPageLayout';

const RegisterPage = () => {
  const { isDark } = useTheme();
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

  // Theme-aware colors with WCAG AA compliant contrast ratios
  const containerBg = isDark ? 'bg-[rgba(16,18,27,0.4)]' : 'bg-[rgba(255,255,255,0.9)]';
  const headingColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const subheadingColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(60,58,58,0.8)]';
  const labelColor = isDark ? 'text-[#f9fafb]' : 'text-[#2a2a2a]';
  const inputBg = isDark ? 'bg-[#14162b]' : 'bg-[rgba(255,255,255,0.8)]';
  const inputBorder = isDark ? 'border-[rgba(113,119,144,0.25)]' : 'border-[rgba(0,0,0,0.2)]';
  const inputText = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const placeholderColor = isDark
    ? 'placeholder:text-[rgba(249,250,251,0.5)]'
    : 'placeholder:text-[rgba(0,0,0,0.5)]';
  const checkboxLabel = isDark ? 'text-[#f9fafb]' : 'text-[#2a2a2a]';
  const linkColor = isDark ? 'text-[#3a6df0]' : 'text-[#2563eb]';
  const linkHover = isDark ? 'hover:text-[#1e59f1]' : 'hover:text-[#1d4ed8]';
  const infoTextColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(60,58,58,0.8)]';
  const containerBorder = isDark ? 'border-[rgba(113,119,144,0.15)]' : 'border-[rgba(0,0,0,0.1)]';

  return (
    <AuthPageLayout>
      <div className={`register-container w-full max-w-[500px] ${containerBg} backdrop-blur-[20px] rounded-[14px] p-10 shadow-lg border ${containerBorder}`}>
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
        <h1 className={`text-[28px] font-semibold ${headingColor} mb-2`}>Create Account</h1>
        <p className={`text-[14px] ${subheadingColor}`}>
          Join Creative Cloud to unlock endless possibilities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="form-group">
            <label htmlFor="firstName" className={`block text-[14px] ${labelColor} mb-2 font-medium`}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`input-field w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputText} ${placeholderColor} focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300`}
              placeholder="John"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className={`block text-[14px] ${labelColor} mb-2 font-medium`}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`input-field w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputText} ${placeholderColor} focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300`}
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="form-group mb-5">
          <label htmlFor="email" className={`block text-[14px] ${labelColor} mb-2 font-medium`}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputText} ${placeholderColor} focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300`}
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className={`block text-[14px] ${labelColor} mb-2 font-medium`}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`input-field w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputText} ${placeholderColor} focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300`}
            placeholder="Create a strong password"
            required
          />
          {passwordStrength && (
            <div className="password-strength mt-2">
              <div className="flex items-center justify-between text-[12px] mb-1">
                <span className={infoTextColor}>Password strength:</span>
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
          <label htmlFor="confirmPassword" className={`block text-[14px] ${labelColor} mb-2 font-medium`}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`input-field w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputText} ${placeholderColor} focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300`}
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="form-group mb-6">
          <label className={`flex items-start text-[14px] ${checkboxLabel} cursor-pointer`}>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-5 h-5 mr-3 mt-0.5 accent-[#3a6df0] cursor-pointer"
              required
            />
            <span className="font-medium">
              I agree to the{' '}
              <a href="#" className={`${linkColor} ${linkHover} transition-all-300 underline`}>
                Terms and Conditions
              </a>
              {' '}and{' '}
              <a href="#" className={`${linkColor} ${linkHover} transition-all-300 underline`}>
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
          <p className={`text-[14px] ${infoTextColor}`}>
            Already have an account?{' '}
            <Link
              to="/login"
              className={`${linkColor} ${linkHover} transition-all-300 font-medium`}
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
    </AuthPageLayout>
  );
};

export default RegisterPage;
