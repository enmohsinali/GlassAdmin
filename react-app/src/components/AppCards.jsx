import { useTheme } from '../context/ThemeContext';

const AppCards = ({ onUpdateClick }) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const hoverBg = isDark ? 'hover:bg-theme-dark-bg' : 'hover:bg-theme-light-bg';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const titleColor = isDark ? 'text-[#999ba5]' : 'text-[#5a5a5a]';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const descriptionColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  const apps = [
    {
      name: 'Premiere Pro',
      description: 'Edit, master and create fully proffesional videos',
      icon: (
        <svg className="w-7 rounded-md mr-3 flex-shrink-0" viewBox="0 0 512 512" style={{border: '1px solid #a059a9'}}>
          <path xmlns="http://www.w3.org/2000/svg" d="M480 0H32C14.368 0 0 14.368 0 32v448c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32V32c0-17.632-14.336-32-32-32z" fill="#210027" />
          <g xmlns="http://www.w3.org/2000/svg">
            <path d="M192 64h-80c-8.832 0-16 7.168-16 16v352c0 8.832 7.168 16 16 16s16-7.168 16-16V256h64c52.928 0 96-43.072 96-96s-43.072-96-96-96zm0 160h-64V96h64c35.296 0 64 28.704 64 64s-28.704 64-64 64zM400 256h-32c-18.08 0-34.592 6.24-48 16.384V272c0-8.864-7.168-16-16-16s-16 7.136-16 16v160c0 8.832 7.168 16 16 16s16-7.168 16-16v-96c0-26.464 21.536-48 48-48h32c8.832 0 16-7.168 16-16s-7.168-16-16-16z" fill="#f6e7fa" />
          </g>
        </svg>
      )
    },
    {
      name: 'InDesign',
      description: 'Design and publish great projects & mockups',
      icon: (
        <svg className="w-7 rounded-md mr-3 flex-shrink-0" viewBox="0 0 52 52" style={{border: '1px solid #c1316d'}}>
          <g xmlns="http://www.w3.org/2000/svg">
            <path d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z" fill="#2f0015" />
            <path d="M18.08 39H15.2V13.72l-2.64-.08V11h5.52v28zM27.68 19.4c1.173-.507 2.593-.761 4.26-.761s3.073.374 4.22 1.12V11h2.88v28c-2.293.32-4.414.48-6.36.48-1.947 0-3.707-.4-5.28-1.2-2.08-1.066-3.12-2.92-3.12-5.561v-7.56c0-2.799 1.133-4.719 3.4-5.759zm8.48 3.12c-1.387-.746-2.907-1.119-4.56-1.119-1.574 0-2.714.406-3.42 1.22-.707.813-1.06 1.847-1.06 3.1v7.12c0 1.227.44 2.188 1.32 2.88.96.719 2.146 1.079 3.56 1.079 1.413 0 2.8-.106 4.16-.319V22.52z" fill="#e1c1cf" />
          </g>
        </svg>
      )
    },
    {
      name: 'After Effects',
      description: 'Industry Standart motion graphics & visual effects',
      icon: (
        <svg className="w-7 rounded-md mr-3 flex-shrink-0" viewBox="0 0 52 52" style={{border: '1px solid #C75DEB'}}>
          <g xmlns="http://www.w3.org/2000/svg">
            <path d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z" fill="#3a3375" />
            <path d="M27.44 39H24.2l-2.76-9.04h-8.32L10.48 39H7.36l8.24-28h3.32l8.52 28zm-6.72-12l-3.48-11.36L13.88 27h6.84zM31.48 33.48c0 2.267 1.333 3.399 4 3.399 1.653 0 3.466-.546 5.44-1.64L42 37.6c-2.054 1.254-4.2 1.881-6.44 1.881-4.64 0-6.96-1.946-6.96-5.841v-8.2c0-2.16.673-3.841 2.02-5.04 1.346-1.2 3.126-1.801 5.34-1.801s3.94.594 5.18 1.78c1.24 1.187 1.86 2.834 1.86 4.94V30.8l-11.52.6v2.08zm8.6-5.24v-3.08c0-1.413-.44-2.42-1.32-3.021-.88-.6-1.907-.899-3.08-.899-1.174 0-2.167.359-2.98 1.08-.814.72-1.22 1.773-1.22 3.16v3.199l8.6-.439z" fill="#e4d1eb" />
          </g>
        </svg>
      )
    }
  ];

  return (
    <div className="content-section mt-[30px] flex flex-col">
      <div className={`content-section-title ${titleColor} mb-3.5 font-medium text-[13px] uppercase tracking-wide`}>Apps in your plan</div>
      <div className="apps-card flex items-center flex-wrap w-[calc(100%+20px)]">
        {apps.map((app, index) => (
          <div
            key={index}
            className={`app-card flex flex-col w-[calc(33.3%-20px)] text-base ${bgColor} rounded-[14px] border ${themeBg} p-5 cursor-pointer transition-all ease-[0.3s] hover:scale-[1.02] ${hoverBg} ml-5 first:ml-0 max-[1110px]:w-[calc(50%-20px)] max-[1110px]:last:mt-5 max-[1110px]:last:ml-0 max-[565px]:w-[calc(100%-20px)] max-[565px]:mt-5 max-[565px]:ml-0`}
          >
            <span className={`flex items-center ${textColor} font-medium`}>
              {app.icon}
              {app.name}
            </span>
            <div className={`app-card__subtext text-[14px] font-normal leading-[1.6em] mt-5 border-b ${borderColor} pb-5 ${descriptionColor}`}>
              {app.description}
            </div>
            <div className="app-card-buttons flex items-center ml-auto mt-4">
              <button
                className="content-button status-button bg-[#3a6df0] border-none text-white text-[15px] mt-0 px-6 py-1.5 rounded-[20px] cursor-pointer transition-all-300 whitespace-nowrap hover:bg-[#1e59f1]"
                onClick={() => onUpdateClick && onUpdateClick()}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppCards;
