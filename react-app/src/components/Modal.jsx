import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Modal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const bgColor = isDark ? 'bg-[#2b2c48]' : 'bg-white';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#3c3a3a]';

  if (!isOpen) return null;

  return (
    <>
      {/* Modal */}
      <div
        className={`pop-up absolute p-[30px_40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto shadow-[0px_6px_30px_rgba(0,0,0,0.4)] transition-all-300 z-10 ${bgColor} w-[500px] ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        } rounded-md flex flex-col whitespace-normal max-[570px]:w-full`}
      >
        <div className={`pop-up__title pb-5 border-b ${borderColor} flex justify-between items-center ${textColor}`}>
          Update This App
          <svg
            onClick={onClose}
            className="close w-6 h-6 cursor-pointer"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </div>
        <div className={`pop-up__subtitle whitespace-normal my-5 text-[14px] font-normal leading-[1.8em] ${textColor}`}>
          Adjust your selections for advanced options as desired before continuing.{' '}
          <a href="#" className="text-[#f9fafb]">
            Learn more
          </a>
        </div>
        <div className="checkbox-wrapper flex items-center text-[14px] font-normal mb-5 relative">
          <input
            type="checkbox"
            id="check1"
            className="checkbox hidden"
            checked={check1}
            onChange={(e) => setCheck1(e.target.checked)}
          />
          <label htmlFor="check1" className={`checkbox-label flex items-center cursor-pointer ${textColor}`}>
            Import previous settings and preferences
          </label>
        </div>
        <div className="checkbox-wrapper flex items-center text-[14px] font-normal mb-10 relative">
          <input
            type="checkbox"
            id="check2"
            className="checkbox hidden"
            checked={check2}
            onChange={(e) => setCheck2(e.target.checked)}
          />
          <label htmlFor="check2" className={`checkbox-label flex items-center cursor-pointer ${textColor}`}>
            Remove old versions
          </label>
        </div>
        <div className="content-button-wrapper mt-auto ml-auto">
          <button
            onClick={onClose}
            className="content-button status-button open close bg-transparent text-[rgba(249,250,251,0.55)] border border-[rgba(249,250,251,0.55)] text-[15px] mt-0 px-6 py-1.5 rounded-[20px] cursor-pointer transition-all-300 whitespace-nowrap mr-2"
          >
            Cancel
          </button>
          <button className="content-button status-button bg-[#3a6df0] border-none text-white text-[15px] mt-0 px-6 py-1.5 rounded-[20px] cursor-pointer transition-all-300 whitespace-nowrap hover:bg-[#1e59f1]">
            Continue
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={onClose}
        className={`overlay-app w-full h-full fixed left-0 top-0 pointer-events-all bg-[rgba(36,39,59,0.8)] ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } transition-all-300 z-[9]`}
      ></div>
    </>
  );
};

export default Modal;
