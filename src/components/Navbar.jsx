import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useUserSession } from '../context/UserSessionContext';

function Navbar({ active = 'home', showSearch = true, homeVariant = false }) {
  const navigate = useNavigate();
  const { currentUser, openNotifications } = useUserSession();
  const avatarLabel = currentUser?.nickname?.slice(0, 2).toUpperCase() || 'JM';
  const notificationCount = currentUser?.notificationsCount || 0;

  const handleOpenNotifications = async () => {
    if (currentUser) {
      await openNotifications();
    }

    navigate('/login#notifications');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />

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
            <Link to="/login" className="mobile-only mobile-menu-link" aria-label="Open settings">
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </Link>
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
            <button className="icon-btn notification-btn" type="button" aria-label="Notifications" onClick={handleOpenNotifications}>
              <span className="material-symbols-outlined">notifications</span>
              {notificationCount ? <span className="notification-badge">{notificationCount}</span> : null}
            </button>
            <button className="icon-btn desktop-settings" type="button" aria-label="Settings">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <Link to="/login" className={`user-avatar${active === 'login' ? ' active' : ''}`} aria-label="Open login">
              {currentUser?.picture ? <img src={currentUser.picture} alt={currentUser.name} className="user-avatar-image" /> : <span>{avatarLabel}</span>}
            </Link>
          </div>

          <label htmlFor="menu-toggle" className="hamburger" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
