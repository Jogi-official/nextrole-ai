function CompanyLogo({ company, size = "h-14 w-14" }) {
  let logo;

  if (company.startsWith("Microsoft")) {
    logo = (
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]">
        <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
        <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
        <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
        <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
      </svg>
    );
  } else if (company === "Google") {
    logo = (
      <svg viewBox="0 0 48 48" className="h-[72%] w-[72%]">
        <path
          fill="#FFC107"
          d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.9Z"
        />
        <path
          fill="#FF3D00"
          d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A11.9 11.9 0 0 1 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44Z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9Z"
        />
      </svg>
    );
  } else if (company === "Amazon") {
    logo = (
      <div className="flex flex-col items-center leading-none">
        <span className="text-[12px] font-bold tracking-tight text-black sm:text-[17px]">
          amazon
        </span>
        <svg viewBox="0 0 60 12" className="-mt-0.5 h-2 w-9 sm:h-2.5 sm:w-12">
          <path
            d="M4 3c14 8 34 8 48 1"
            fill="none"
            stroke="#FF9900"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="m47 1 6 2.5-3 5"
            fill="none"
            stroke="#FF9900"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  } else if (company === "Apple") {
    logo = (
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]">
        <path
          fill="#000"
          d="M16.4 1.4c0 1.1-.5 2.3-1.2 3.1-.7.9-2 1.6-3 1.6h-.3c0-.1-.1-.2-.1-.4 0-1.1.6-2.3 1.2-3 .8-.9 2.2-1.6 3.3-1.7l.1.4Zm4.5 15.7c0 .1-.5 1.6-1.5 3.1-.9 1.3-1.9 2.7-3.4 2.7s-1.9-.9-3.6-.9c-1.7 0-2.3.9-3.7.9-1.4 0-2.3-1.3-3.4-2.8-1.3-1.8-2.3-4.6-2.3-7.3 0-4.3 2.8-6.6 5.6-6.6 1.4 0 2.7 1 3.6 1 .9 0 2.2-1 3.9-1 .6 0 2.9.1 4.4 2.2-.1.1-2.4 1.4-2.4 4.2 0 3.3 2.9 4.4 3 4.5Z"
        />
      </svg>
    );
  } else {
    logo = (
      <span className="text-xl font-bold text-blue-600">
        {company.charAt(0)}
      </span>
    );
  }

  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm`}
    >
      {logo}
    </div>
  );
}

export default CompanyLogo;
