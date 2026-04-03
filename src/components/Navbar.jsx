import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';

function Navbar({ active = 'home', showSearch = true, homeVariant = false }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {homeVariant ? <input type="checkbox" id="menu-toggle" className="menu-toggle" /> : null}

        <div className="nav-left">
          <Link to="/" className="brand" aria-label="Go to home">
            <Logo />
          </Link>

          <div className="nav-links">
            <NavLink to="/" className={active === 'home' ? 'active' : undefined}>
              <span className="material-symbols-outlined">home</span>
              <span>Home</span>
            </NavLink>
            <NavLink to="/discover" className={active === 'discover' ? 'active' : undefined}>
              <span className="material-symbols-outlined">explore</span>
              <span>Discover</span>
            </NavLink>
            <NavLink to="/sync-your-sound" className={active === 'sync' ? 'active' : undefined}>
              <span className={`material-symbols-outlined ${active === 'sync' ? 'icon-filled' : ''}`}>queue_music</span>
              <span>Vibe Queue</span>
            </NavLink>
            <NavLink to="/travel-map" className={active === 'travel' ? 'active' : undefined}>
              <span className="material-symbols-outlined">map</span>
              <span>Travel Map</span>
            </NavLink>
          </div>
        </div>

        <div className="nav-right">
          {showSearch ? (
            <div className="search-box">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Search frequencies..." />
            </div>
          ) : null}
          <div className="nav-actions">
            <button className="icon-btn" type="button" aria-label="Notifications">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="icon-btn" type="button" aria-label="Settings">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <Link to="/login" className={`user-avatar${active === 'login' ? ' active' : ''}`} aria-label="Open login">
              <span>JM</span>
            </Link>
          </div>

          {homeVariant ? (
            <label htmlFor="menu-toggle" className="hamburger" aria-label="Toggle navigation">
              <span></span>
              <span></span>
              <span></span>
            </label>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
