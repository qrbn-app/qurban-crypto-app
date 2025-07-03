
const IslamicPattern = () => {
  return (
    <div className="fixed inset-0 opacity-5 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id="islamic-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <g fill="#1E4D2B" fillOpacity="0.3">
              {/* Geometric Islamic star pattern */}
              <polygon points="50,10 60,30 80,30 65,45 70,65 50,55 30,65 35,45 20,30 40,30" />
              <circle cx="50" cy="50" r="8" fill="none" stroke="#1E4D2B" strokeWidth="1" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
      </svg>
    </div>
  );
};

export { IslamicPattern };
