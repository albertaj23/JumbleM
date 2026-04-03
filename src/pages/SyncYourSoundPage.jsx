import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useBrandAnimation from '../hooks/useBrandAnimation';
import usePageStylesheets from '../hooks/usePageStylesheets';

function SyncYourSoundPage() {
  usePageStylesheets(['/styles/sync-sound.css']);
  useBrandAnimation();

  return (
    <>
      <Navbar active="sync" />
      <main className="main-content">
        <div className="container">
          <section className="location-widget">
            <div className="map-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-mWQmaX4HctSUVHbbTgHS7Gjt365tsoXJ51vF10JN02EdM14xM4KLqffWBJZK__dHTppTnN5Eltf9xZrmNp4EqIYLzuH_SmDvJvQydwSfk4CyBvre8Rnd5vk-RYIjvleElGMjw0b-sHA9uAH827Dg2qmWXnAyWfgRg9kId3nUhWsNGmp0BYvOdXncKr3pNv8MoRp9gbLv9KGUb98w-svbJYawzNrJzdkukL5ogRpsBrV1Hy2IDbg_VyPcymu9rIPRQcIAB_qOeUVq"
                alt="Berlin City Map"
                className="map-image"
              />
              <div className="map-overlay"></div>
              <div className="location-pulse">
                <div className="pulse-ring"></div>
                <div className="pulse-dot"></div>
              </div>
            </div>
            <div className="location-info">
              <div className="live-badge">
                <span className="live-indicator"></span>
                <span>Live Location</span>
              </div>
              <h1 className="location-title">Berlin, DE</h1>
              <div className="location-meta">
                <div className="meta-item">
                  <span className="material-symbols-outlined">schedule</span>
                  <span>10:45 PM | Nightfall</span>
                </div>
                <div className="meta-item gps-active">
                  <span className="material-symbols-outlined">sensors</span>
                  <span>GPS Active</span>
                </div>
              </div>
              <p className="location-description">
                Your soundscape is currently adapting to the urban rhythm of Kreuzberg. Frequency sync is optimized for low-light environments.
              </p>
            </div>
          </section>

          <div className="content-grid">
            <div className="queue-section">
              <div className="section-header">
                <div className="header-content">
                  <span className="section-label">Up Next</span>
                  <h2 className="section-title">Vibe Queue</h2>
                </div>
                <button className="view-all-btn" type="button">
                  View All
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>

              <div className="queue-list">
                {[
                  ['Midnight Frequency', 'Lofi Architect', '4.5 CREDITS'],
                  ['Neon Horizon', 'Synth Waver', 'HIGH'],
                  ['Deep Forest Echo', 'Nature Sync', '2.1 CREDITS']
                ].map(([title, artist, meta]) => (
                  <div className="queue-item" key={title}>
                    <div className="album-art">
                      <div className="play-overlay">
                        <span className="material-symbols-outlined icon-filled">play_arrow</span>
                      </div>
                    </div>
                    <div className="track-info">
                      <h3 className="track-title">{title}</h3>
                      <p className="track-artist">{artist}</p>
                    </div>
                    <div className="track-stats">
                      <div className="stat-header">
                        <span className="stat-label">Live Metric</span>
                        <span className="stat-value">{meta}</span>
                      </div>
                      <input type="range" className="vibe-slider" min="0" max="10" value="5" readOnly />
                    </div>
                    <button className="add-btn" type="button">
                      Add to Queue
                    </button>
                  </div>
                ))}
              </div>

              <div className="queue-cta">
                <button className="sync-btn" type="button">
                  <span className="material-symbols-outlined">sync</span>
                  Start Syncing
                </button>
              </div>
            </div>

            <div className="analysis-section">
              <div className="section-header">
                <span className="section-label">Live Metrics</span>
                <h2 className="section-title">Environmental Analysis</h2>
              </div>
              <div className="metrics-container">
                <div className="metric-item">
                  <div className="metric-icon">
                    <span className="material-symbols-outlined icon-filled">volume_up</span>
                  </div>
                  <div className="metric-content">
                    <div className="metric-header">
                      <span className="metric-label">Ambient Noise</span>
                      <span className="metric-value">45dB</span>
                    </div>
                    <div className="sound-bars">
                      {Array.from({ length: 10 }).map((_, index) => (
                        <div className={`bar${index > 5 ? ' active' : ''}`} style={{ height: `${20 + ((index * 13) % 50)}%` }} key={index}></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">
                    <span className="material-symbols-outlined icon-filled">auto_awesome</span>
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Nearby Vibe</span>
                    <div className="vibe-type">Chill / Lofi</div>
                    <div className="vibe-tags">
                      <span className="tag">SUBDUED</span>
                      <span className="tag">REVERB-HEAVY</span>
                    </div>
                  </div>
                </div>
                <div className="metric-item highlight">
                  <div className="metric-icon primary">
                    <span className="material-symbols-outlined icon-filled">sync</span>
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Dynamic Sync</span>
                    <div className="sync-status">
                      <div className="status-text">Enabled</div>
                      <div className="toggle-switch active">
                        <div className="toggle-knob"></div>
                      </div>
                    </div>
                    <p className="sync-description">Syncing frequency with biometric and atmospheric data in real-time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SyncYourSoundPage;
