import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useBrandAnimation from '../hooks/useBrandAnimation';
import usePageStylesheets from '../hooks/usePageStylesheets';

function HomePage() {
  usePageStylesheets(['/styles/styles.css']);
  useBrandAnimation();

  return (
    <>
      <main id="app-content">
        <Navbar active="home" showSearch homeVariant />

        <header className="hero">
          <div className="hero-text">
            <h1 className="reveal-item">
              Your journey, <span className="highlight">harmonized.</span>
            </h1>
            <a href="#discovery" className="cta-anchor">
              <button className="cta-btn reveal-item">Start Exploring</button>
            </a>
          </div>
        </header>

        <section id="discovery" className="discovery-section reveal-item">
          <div className="section-header">
            <h2>Choose your next move</h2>
            <p>Three focused routes, each tuned to a different part of the jumbleM experience.</p>
          </div>

          <div className="card-grid">
            <Link className="card card-link-panel card-featured" to="/sync-your-sound">
              <div className="card-image music-vibe"></div>
              <div className="card-content">
                <div className="card-copy">
                  <h3>Sync</h3>
                  <p>Shape your queue around motion, weather, and mood.</p>
                </div>
                <span className="mini-jump-link">
                  Open Vibe Queue
                  <span className="material-symbols-outlined">queue_music</span>
                </span>
              </div>
            </Link>

            <Link className="card card-link-panel card-compact" to="/discover">
              <div className="card-image city-explore"></div>
              <div className="card-content">
                <div className="card-copy">
                  <h3>Discover</h3>
                  <p>Find scenes, places, and sonic detours that fit right now.</p>
                </div>
                <span className="mini-jump-link">
                  Explore Discover
                  <span className="material-symbols-outlined">explore</span>
                </span>
              </div>
            </Link>

            <Link className="card card-link-panel card-compact" to="/travel-map">
              <div className="card-image connection"></div>
              <div className="card-content">
                <div className="card-copy">
                  <h3>Travel Map</h3>
                  <p>Trace tagged people and energy from calm to electric.</p>
                </div>
                <span className="mini-jump-link">
                  Open Travel Map
                  <span className="material-symbols-outlined">map</span>
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
