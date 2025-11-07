import { useTheme } from '../context/ThemeContext';

const InstalledApps = ({ onUpdateClick }) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const hoverBg = isDark ? 'hover:bg-theme-dark-bg' : 'hover:bg-theme-light-bg';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const titleColor = isDark ? 'text-[#999ba5]' : 'text-[#5a5a5a]';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const statusTextColor = isDark ? 'text-[#f9fafb]' : 'text-[#2a2a2a]';

  const openButtonClass = isDark
    ? 'bg-transparent text-[rgba(249,250,251,0.55)] border border-[rgba(249,250,251,0.55)] hover:bg-[rgba(249,250,251,0.1)]'
    : 'bg-transparent text-[#2a2a2a] border border-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.05)]';

  const apps = [
    {
      name: 'Photoshop',
      icon: (
        <svg className="w-7 rounded-md mr-4 flex-shrink-0" viewBox="0 0 52 52" style={{border:'1px solid #3291b8'}}>
          <g xmlns="http://www.w3.org/2000/svg">
            <path d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z" fill="#061e26" />
            <path d="M12.16 39H9.28V11h9.64c2.613 0 4.553.813 5.82 2.44 1.266 1.626 1.9 3.76 1.9 6.399 0 .934-.027 1.74-.08 2.42-.054.681-.22 1.534-.5 2.561-.28 1.026-.66 1.866-1.14 2.52-.48.654-1.213 1.227-2.2 1.72-.987.494-2.16.74-3.52.74h-7.04V39zm0-12h6.68c.96 0 1.773-.187 2.44-.56.666-.374 1.153-.773 1.46-1.2.306-.427.546-1.04.72-1.84.173-.801.267-1.4.28-1.801.013-.399.02-.973.02-1.72 0-4.053-1.694-6.08-5.08-6.08h-6.52V27zM29.48 33.92l2.8-.12c.106.987.6 1.754 1.48 2.3.88.547 1.893.82 3.04.82s2.14-.26 2.98-.78c.84-.52 1.26-1.266 1.26-2.239s-.36-1.747-1.08-2.32c-.72-.573-1.6-1.026-2.64-1.36-1.04-.333-2.086-.686-3.14-1.06a7.36 7.36 0 01-2.78-1.76c-.987-.934-1.48-2.073-1.48-3.42s.54-2.601 1.62-3.761 2.833-1.739 5.26-1.739c.854 0 1.653.1 2.4.3.746.2 1.28.394 1.6.58l.48.279-.92 2.521c-.854-.666-1.974-1-3.36-1-1.387 0-2.42.26-3.1.78-.68.52-1.02 1.18-1.02 1.979 0 .88.426 1.574 1.28 2.08.853.507 1.813.934 2.88 1.28 1.066.347 2.126.733 3.18 1.16 1.053.427 1.946 1.094 2.68 2s1.1 2.106 1.1 3.6c0 1.494-.6 2.794-1.8 3.9-1.2 1.106-2.954 1.66-5.26 1.66-2.307 0-4.114-.547-5.42-1.64-1.307-1.093-1.987-2.44-2.04-4.04z" fill="#c1dbe6" />
          </g>
        </svg>
      ),
      status: 'Updated',
      statusColor: 'green',
      buttonText: 'Open',
      buttonClass: openButtonClass
    },
    {
      name: 'Illustrator',
      icon: (
        <svg className="w-7 rounded-md mr-4 flex-shrink-0" viewBox="0 0 52 52" style={{border:'1px solid #b65a0b'}}>
          <g xmlns="http://www.w3.org/2000/svg">
            <path d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z" fill="#261400" />
            <path d="M30.68 39h-3.24l-2.76-9.04h-8.32L13.72 39H10.6l8.24-28h3.32l8.52 28zm-6.72-12l-3.48-11.36L17.12 27h6.84zM37.479 12.24c0 .453-.16.84-.48 1.16-.32.319-.7.479-1.14.479-.44 0-.827-.166-1.16-.5-.334-.333-.5-.713-.5-1.14s.166-.807.5-1.141c.333-.333.72-.5 1.16-.5.44 0 .82.16 1.14.48.321.322.48.709.48 1.162zM37.24 39h-2.88V18.96h2.88V39z" fill="#e6d2c0" />
          </g>
        </svg>
      ),
      status: 'Update Available',
      statusColor: '#396df0',
      buttonText: 'Update this app',
      buttonClass: 'bg-[#3a6df0] border-none text-white hover:bg-[#1e59f1]',
      hasUpdate: true
    },
    {
      name: 'After Effects',
      icon: (
        <svg className="w-7 rounded-md mr-4 flex-shrink-0" viewBox="0 0 52 52" style={{border: '1px solid #C75DEB'}}>
          <g xmlns="http://www.w3.org/2000/svg">
            <path d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z" fill="#3a3375" />
            <path d="M27.44 39H24.2l-2.76-9.04h-8.32L10.48 39H7.36l8.24-28h3.32l8.52 28zm-6.72-12l-3.48-11.36L13.88 27h6.84zM31.48 33.48c0 2.267 1.333 3.399 4 3.399 1.653 0 3.466-.546 5.44-1.64L42 37.6c-2.054 1.254-4.2 1.881-6.44 1.881-4.64 0-6.96-1.946-6.96-5.841v-8.2c0-2.16.673-3.841 2.02-5.04 1.346-1.2 3.126-1.801 5.34-1.801s3.94.594 5.18 1.78c1.24 1.187 1.86 2.834 1.86 4.94V30.8l-11.52.6v2.08zm8.6-5.24v-3.08c0-1.413-.44-2.42-1.32-3.021-.88-.6-1.907-.899-3.08-.899-1.174 0-2.167.359-2.98 1.08-.814.72-1.22 1.773-1.22 3.16v3.199l8.6-.439z" fill="#e4d1eb" />
          </g>
        </svg>
      ),
      status: 'Updated',
      statusColor: 'green',
      buttonText: 'Open',
      buttonClass: openButtonClass
    }
  ];

  return (
    <div className="content-section mt-[30px] flex flex-col">
      <div className={`content-section-title ${titleColor} mb-3.5 font-medium text-[13px] uppercase tracking-wide`}>Installed</div>
      <ul className={`flex flex-col w-full h-full justify-around ${bgColor} p-0 m-0 rounded-[14px] border ${themeBg} cursor-pointer`}>
        {apps.map((app, index) => (
          <li
            key={index}
            className={`adobe-product list-none p-2.5 px-[18px] flex items-center text-base w-full h-full whitespace-nowrap transition-all-300 ${hoverBg} first:hover:rounded-t-[13px] last:hover:rounded-b-[13px] border-t ${borderColor} first:border-t-0`}
          >
            <div className={`products flex items-center w-[150px] max-[480px]:w-[120px] ${textColor} font-medium`}>
              {app.icon}
              {app.name}
            </div>
            <span className={`status ml-auto w-[140px] text-[15px] relative max-[700px]:hidden ${statusTextColor} font-medium`}>
              <span
                className={`status-circle ${app.statusColor === 'green' ? 'bg-[#3bf083]' : 'bg-[#396df0]'} w-2 h-2 absolute rounded-full top-1 -left-6`}
              ></span>
              {app.status}
            </span>
            <div className="button-wrapper flex items-center justify-end w-[187px] ml-auto max-[480px]:w-auto">
              <button
                className={`content-button status-button ${app.buttonClass} text-[15px] mt-0 px-6 py-1.5 rounded-[20px] cursor-pointer transition-all-300 whitespace-nowrap max-[390px]:px-3.5`}
                onClick={() => app.hasUpdate && onUpdateClick && onUpdateClick()}
              >
                {app.buttonText}
              </button>
              <div className="menu three-dot-menu mx-3 max-[415px]:hidden"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstalledApps;
