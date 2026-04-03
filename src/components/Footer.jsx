import { Link } from 'react-router-dom';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo-lockup">
            <Logo className="footer-logo-svg" animated={false} />
          </div>
          <p className="footer-tagline">Blending your mix and you into one living rhythm.</p>
          <div className="social-links">
            <button className="social-btn" type="button" aria-label="Instagram">
              <span className="material-symbols-outlined">photo_camera</span>
            </button>
            <button className="social-btn" type="button" aria-label="Music">
              <span className="material-symbols-outlined">music_note</span>
            </button>
            <button className="social-btn" type="button" aria-label="Travel">
              <span className="material-symbols-outlined">travel_explore</span>
            </button>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4 className="footer-heading">Explore</h4>
            <Link to="/discover">Discover</Link>
            <Link to="/sync-your-sound">Vibe Queue</Link>
            <Link to="/travel-map">Travel Map</Link>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Profile</h4>
            <Link to="/login">Login</Link>
            <Link to="/">Home</Link>
            <Link to="/travel-map">Tagged Users</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 JumbleM</p>
        <span className="footer-note">Blending your mix and you</span>
      </div>
    </footer>
  );
}

export default Footer;
