function Logo({ className = 'nav-logo-svg', animated = true }) {
  if (!animated) {
    return (
      <svg viewBox="0 0 220 60" className={className} preserveAspectRatio="xMinYMid meet">
        <text x="0" y="45" className="logo-text">
          <tspan>Ju</tspan>
          <tspan dx="29">bleM</tspan>
        </text>
        <g transform="translate(42, 18)">
          <circle cx="15" cy="15" r="14" fill="#121212" />
          <rect x="9" y="10" width="2" height="14" rx="1" fill="white" />
          <rect x="14" y="4" width="2" height="20" rx="1" fill="white" />
          <rect x="19" y="10" width="2" height="14" rx="1" fill="white" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 60" className={className} preserveAspectRatio="xMinYMid meet">
      <text x="0" y="45" className="logo-text">
        <tspan className="char j-letter">Ju</tspan>
        <tspan dx="29" className="char m-letter">bleM</tspan>
      </text>
      <g className="sphere-group" transform="translate(42, 18)">
        <circle cx="15" cy="15" r="14" fill="#121212" />
        <rect className="beam b1" x="9" y="24" width="2" height="0" rx="1" fill="white" />
        <rect className="beam b2" x="14" y="24" width="2" height="0" rx="1" fill="white" />
        <rect className="beam b3" x="19" y="24" width="2" height="0" rx="1" fill="white" />
      </g>
    </svg>
  );
}

export default Logo;
