import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    navigate('/');
  };

  // Theme-aware colors with WCAG AA compliant contrast ratios
  const containerBg = isDark ? 'bg-[rgba(16,18,27,0.4)]' : 'bg-[rgba(255,255,255,0.9)]';
  const headingColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const subheadingColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[rgba(60,58,58,0.8)]'; // Increased from 0.55 to 0.8
  const labelColor = isDark ? 'text-[#f9fafb]' : 'text-[#2a2a2a]'; // Darker for light mode (was too light)
  const inputBg = isDark ? 'bg-[#14162b]' : 'bg-[rgba(255,255,255,0.8)]';
  const inputBorder = isDark ? 'border-[rgba(113,119,144,0.25)]' : 'border-[rgba(0,0,0,0.2)]';
  const inputText = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const placeholderColor = isDark
    ? 'placeholder:text-[rgba(249,250,251,0.5)]'
    : 'placeholder:text-[rgba(0,0,0,0.5)]'; // Increased contrast for WCAG AA
  const checkboxLabel = isDark ? 'text-[#f9fafb]' : 'text-[#2a2a2a]'; // Darker for light mode
  const linkColor = isDark ? 'text-[#3a6df0]' : 'text-[#2563eb]'; // Slightly darker blue for light mode
  const linkHover = isDark ? 'hover:text-[#1e59f1]' : 'hover:text-[#1d4ed8]';
  const dividerColor = isDark ? 'bg-[rgba(113,119,144,0.25)]' : 'bg-[rgba(0,0,0,0.15)]';
  const dividerText = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[rgba(60,58,58,0.7)]';
  const socialBtnBg = isDark ? 'bg-[#14162b]' : 'bg-[rgba(255,255,255,0.9)]';
  const socialBtnBorder = isDark ? 'border-[rgba(113,119,144,0.25)]' : 'border-[rgba(0,0,0,0.15)]';
  const socialBtnHover = isDark ? 'hover:bg-[rgba(113,119,144,0.08)]' : 'hover:bg-[rgba(0,0,0,0.05)]';

  return (
    <div className={`login-container w-full max-w-[450px] ${containerBg} backdrop-blur-[20px] rounded-[14px] p-10 shadow-lg border ${isDark ? 'border-[rgba(113,119,144,0.15)]' : 'border-[rgba(0,0,0,0.1)]'}`}>
      <div className="login-header text-center mb-8">
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
        <h1 className={`text-[28px] font-semibold ${headingColor} mb-2`}>Welcome Back</h1>
        <p className={`text-[14px] ${subheadingColor}`}>
          Sign in to your Creative Cloud account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group mb-5">
          <label htmlFor="email" className={`block text-[14px] ${labelColor} mb-2 font-medium`}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input-field w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputText} ${placeholderColor} focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300`}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group mb-6">
          <label htmlFor="password" className={`block text-[14px] ${labelColor} mb-2 font-medium`}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`input-field w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputText} ${placeholderColor} focus:outline-none focus:shadow-[0_0_0_2px_rgba(58,109,240,0.3)] transition-all-300`}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-options flex justify-between items-center mb-6">
          <label className={`flex items-center text-[14px] ${checkboxLabel} cursor-pointer font-medium`}>
            <input
              type="checkbox"
              className="w-4 h-4 mr-2 accent-[#3a6df0]"
            />
            Remember me
          </label>
          <a
            href="#"
            className={`text-[14px] ${linkColor} ${linkHover} transition-all-300 font-medium`}
          >
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3a6df0] border-none px-[26px] py-2 text-white rounded-[20px] mt-4 cursor-pointer transition-all duration-300 whitespace-nowrap hover:bg-[#1e59f1] font-medium"
        >
          Sign In
        </button>

        <div className="text-center mt-6">
          <p className={`text-[14px] ${subheadingColor}`}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className={`${linkColor} ${linkHover} transition-all-300 font-medium`}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>

      <div className="divider flex items-center my-6">
        <div className={`flex-1 h-[1px] ${dividerColor}`}></div>
        <span className={`px-4 text-[14px] ${dividerText}`}>OR</span>
        <div className={`flex-1 h-[1px] ${dividerColor}`}></div>
      </div>

      <div className="social-login flex gap-3">
        <button className={`flex-1 ${socialBtnBg} border ${socialBtnBorder} px-4 py-2 rounded-lg ${inputText} ${socialBtnHover} transition-all-300`}>
          <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </button>
        <button className={`flex-1 ${socialBtnBg} border ${socialBtnBorder} px-4 py-2 rounded-lg ${inputText} ${socialBtnHover} transition-all-300`}>
          <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </button>
        <button className={`flex-1 ${socialBtnBg} border ${socialBtnBorder} px-4 py-2 rounded-lg ${inputText} ${socialBtnHover} transition-all-300`}>
          <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
