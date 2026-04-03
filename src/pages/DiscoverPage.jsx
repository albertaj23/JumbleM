import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useBrandAnimation from '../hooks/useBrandAnimation';
import usePageStylesheets from '../hooks/usePageStylesheets';

function DiscoverPage() {
  usePageStylesheets(['/styles/discover.css']);
  useBrandAnimation();

  return (
    <>
      <Navbar active="discover" />
      <main className="main-content">
        <div className="container">
          <section className="fiesta-hero">
            <div className="fiesta-badge">
              <span className="material-symbols-outlined">celebration</span>
              <span>Musical Fiesta</span>
            </div>
            <h1 className="fiesta-title">Discover Your Sonic Journey</h1>
            <p className="fiesta-subtitle">
              Experience the world&apos;s most vibrant musical destinations, perfectly mapped to your vibe
            </p>
          </section>

          <section className="sonic-section">
            <div className="section-header">
              <div className="header-content">
                <h2 className="section-title">Sonic Cartography</h2>
                <p className="section-description">Discover experiences mapped to your exact coordinates and current vibe.</p>
              </div>
              <div className="nav-arrows">
                <button className="arrow-btn" type="button">
                  <span className="material-symbols-outlined">west</span>
                </button>
                <button className="arrow-btn arrow-btn-active" type="button">
                  <span className="material-symbols-outlined">east</span>
                </button>
              </div>
            </div>

            <div className="bento-grid">
              <div className="bento-card bento-large">
                <div className="card-bg-image"></div>
                <div className="card-content">
                  <div className="card-icon-wrapper icon-secondary">
                    <span className="material-symbols-outlined">sync</span>
                  </div>
                  <h3 className="card-title">Sync Your Sound</h3>
                  <p className="card-text">
                    Connect your favorite streaming platforms. JumbleM analyzes your history to generate real-time soundtracks that react to your GPS speed and local weather.
                  </p>
                  <ul className="feature-list">
                    <li>
                      <span className="material-symbols-outlined">check_circle</span>
                      Multi-platform Integration
                    </li>
                    <li>
                      <span className="material-symbols-outlined">check_circle</span>
                      Biometric Pulse Sync
                    </li>
                  </ul>
                </div>
                <div className="card-footer">
                  <Link to="/sync-your-sound">
                    <button className="card-link" type="button">
                      Configure Integration
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </Link>
                </div>
              </div>

              <div className="bento-card bento-tall bento-primary">
                <div className="card-pattern"></div>
                <div className="card-content">
                  <div className="card-icon-wrapper icon-light">
                    <span className="material-symbols-outlined">map</span>
                  </div>
                  <h3 className="card-title">Harmonized Mapping</h3>
                  <p className="card-text">
                    View your city as a symphony. Discover Hot Spots where thousands of users are contributing to a collective live soundscape.
                  </p>
                </div>
                <div className="card-footer">
                  <div className="map-preview">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgOfc2vOhLoAT_9XVK4NEm2k0mm4IBhUSm8DzZ75nBXcy1XJY2ngARQhCzUqpO8HPzSfLmcne-65zxgb39TkNafLE9lbU2RDGbIU388Z-Yz3x544fyjaPzPLoAQXlz-uRV9xNzQ9v4HLU7qvuojR3ftzyO0gz7T1tloB84TPQ_sckGS7UZ5PxJdXT2R1yAcAvTUBuYqE1hjdM0aXQVLXN_vjFioeSFJoWGDe4kB84dlAQKOYlfFazzKbDUJMvqUCPRIY_Ee1x7Lg8u"
                      alt="Berlin Map"
                    />
                  </div>
                  <Link to="/travel-map" className="primary-btn">
                    Explore Map
                  </Link>
                </div>
              </div>

              <div className="bento-card bento-medium">
                <div className="card-icon-circle">
                  <span className="material-symbols-outlined">diversity_3</span>
                </div>
                <div className="card-content">
                  <h3 className="card-title-sm">Connect to Culture</h3>
                  <p className="card-text-sm">
                    Tap into hyper-local radio stations and community playlists that define the neighborhoods you pass through.
                  </p>
                </div>
                <Link to="/travel-map" className="inline-link">
                  Browse Local Radios
                  <span className="material-symbols-outlined">chevron_right</span>
                </Link>
              </div>

              <div className="bento-card bento-medium bento-elevated">
                <div className="card-icon-circle icon-primary">
                  <span className="material-symbols-outlined icon-filled">electric_bolt</span>
                </div>
                <div className="card-content">
                  <h3 className="card-title-sm">Vibe Intelligence</h3>
                  <p className="card-text-sm">
                    AI-driven mood detection that subtly adjusts the BPM and instrumentation of your audio as your day evolves.
                  </p>
                </div>
                <div className="tag-group">
                  <span className="tag">Focus</span>
                  <span className="tag">Drive</span>
                  <span className="tag">Unwind</span>
                </div>
              </div>

              <div className="bento-card bento-wide bento-fiesta">
                <div className="fiesta-glow"></div>
                <div className="card-content">
                  <div className="card-icon-wrapper icon-celebration">
                    <span className="material-symbols-outlined">music_note</span>
                  </div>
                  <h3 className="card-title">Musical Fiesta Hotspots</h3>
                  <p className="card-text">
                    Join the celebration and discover live events, festivals, and vibrant venues where music lovers gather.
                  </p>
                </div>
                <div className="card-footer">
                  <button className="fiesta-btn" type="button">
                    Find Your Fiesta
                    <span className="material-symbols-outlined">celebration</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default DiscoverPage;
