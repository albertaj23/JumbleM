import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useBrandAnimation from '../hooks/useBrandAnimation';
import usePageStylesheets from '../hooks/usePageStylesheets';
import { useJumbleMFlow } from '../context/JumbleMFlowContext';

function SyncYourSoundPage() {
  usePageStylesheets(['/styles/sync-sound.css']);
  useBrandAnimation();
  const { activeTrack, queue, mapPins, updateTrack, deleteTrack, setActiveTrack } = useJumbleMFlow();

  const activePin = activeTrack ? mapPins.find((pin) => pin.id === activeTrack.id) : null;

  return (
    <>
      <Navbar active="sync" />
      <main className="main-content">
        <div className="container">
          <section className="location-widget">
            <div className="map-container">
              <div className="map-overlay street-grid-surface">
                <div className="street-grid-lines"></div>
                {activeTrack && activePin ? (
                  <div
                    className="street-grid-user-marker"
                    style={{ top: activePin.position.top, left: activePin.position.left }}
                  >
                    <div className="street-grid-user-dot"></div>
                    <div className="street-grid-user-card">
                      <strong>{activeTrack.handle}</strong>
                      <span>{activeTrack.songName}</span>
                    </div>
                  </div>
                ) : (
                  <div className="queue-empty-state map-empty-state">
                    <strong>No live track synced yet</strong>
                    <span>Create a user in Discover to place the first card on the street grid.</span>
                  </div>
                )}
              </div>
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
              <h1 className="location-title">{activeTrack?.gpsLocation || 'Awaiting sync'}</h1>
              <div className="location-meta">
                <div className="meta-item">
                  <span className="material-symbols-outlined">schedule</span>
                  <span>{activeTrack ? `${activeTrack.tempo} | Street grid active` : 'No active tempo yet'}</span>
                </div>
                <div className="meta-item gps-active">
                  <span className="material-symbols-outlined">sensors</span>
                  <span>{activeTrack ? `${activeTrack.latLabel} • ${activeTrack.lngLabel}` : 'GPS data appears after sync'}</span>
                </div>
              </div>
              <p className="location-description">
                {activeTrack
                  ? `${activeTrack.handle} is the active user on the street grid. Update or delete any queue item below and the map plus Travel Map will reflect it immediately.`
                  : 'The queue is empty right now. Add your first song and vibe profile from Discover to start the flow.'}
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
                  {queue.length} tracks
                  <span className="material-symbols-outlined">queue_music</span>
                </button>
              </div>

              <div className="queue-list">
                {queue.length ? queue.map(({ id, title, artist, meta, track }) => (
                  <div className={`queue-item${activeTrack?.id === id ? ' active-queue-item' : ''}`} key={id}>
                    <button className="album-art album-art-button" type="button" onClick={() => setActiveTrack(id)}>
                      <div className="play-overlay">
                        <span className="material-symbols-outlined icon-filled">play_arrow</span>
                      </div>
                    </button>
                    <div className="track-info">
                      <label className="queue-input-label">
                        <span>Song</span>
                        <input
                          className="queue-input"
                          type="text"
                          value={title}
                          onChange={(event) => updateTrack(id, { songName: event.target.value })}
                        />
                      </label>
                      <label className="queue-input-label">
                        <span>Profile</span>
                        <input
                          className="queue-input"
                          type="text"
                          value={artist}
                          onChange={(event) => updateTrack(id, { selfAssessment: event.target.value })}
                        />
                      </label>
                      <label className="queue-input-label">
                        <span>Location</span>
                        <input
                          className="queue-input"
                          type="text"
                          value={track.gpsLocation}
                          onChange={(event) => updateTrack(id, { gpsLocation: event.target.value })}
                        />
                      </label>
                    </div>
                    <div className="track-stats">
                      <div className="stat-header">
                        <span className="stat-label">Live Metric</span>
                        <span className="stat-value">{meta}</span>
                      </div>
                      <label className="queue-input-label queue-input-label-compact">
                        <span>Energy {track.energy}</span>
                        <input
                          className="vibe-slider"
                          type="range"
                          min="0"
                          max="100"
                          value={track.energy}
                          onChange={(event) => updateTrack(id, { energy: Number(event.target.value) })}
                        />
                      </label>
                    </div>
                    <div className="queue-actions">
                      <button className="add-btn" type="button" onClick={() => setActiveTrack(id)}>
                        Show on Map
                      </button>
                      <button className="queue-delete-btn" type="button" onClick={() => deleteTrack(id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="queue-empty-state">
                    <strong>No tracks in the queue</strong>
                    <span>Sync a song from Discover to create the first live map location and travel post.</span>
                  </div>
                )}
              </div>

              <div className="queue-cta">
                <button className="sync-btn" type="button" disabled={!activeTrack}>
                  <span className="material-symbols-outlined">sync</span>
                  {activeTrack ? `Sync ${activeTrack.handle}` : 'Awaiting first sync'}
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
                      <span className="metric-value">{activeTrack ? `${30 + Math.round(activeTrack.energy / 2)}dB` : '--'}</span>
                    </div>
                    <div className="sound-bars">
                      {Array.from({ length: 10 }).map((_, index) => {
                        const energy = activeTrack?.energy || 0;
                        const threshold = Math.max(2, Math.round(energy / 12));
                        return (
                          <div
                            className={`bar${index < threshold ? ' active' : ''}`}
                            style={{ height: `${20 + ((index * 13) % 50)}%` }}
                            key={index}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">
                    <span className="material-symbols-outlined icon-filled">auto_awesome</span>
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Nearby Vibe</span>
                    <div className="vibe-type">{activeTrack?.selfAssessment || 'No vibe profile yet'}</div>
                    <div className="vibe-tags">
                      {activeTrack ? (
                        <>
                          <span className="tag">{activeTrack.environment.toUpperCase()}</span>
                          <span className="tag">{activeTrack.tempo.toUpperCase()}</span>
                        </>
                      ) : (
                        <span className="tag">EMPTY</span>
                      )}
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
                      <div className="status-text">{activeTrack ? 'Enabled' : 'Idle'}</div>
                      <div className={`toggle-switch${activeTrack ? ' active' : ''}`}>
                        <div className="toggle-knob"></div>
                      </div>
                    </div>
                    <p className="sync-description">
                      {activeTrack
                        ? `Syncing ${activeTrack.songName} with ${activeTrack.gpsLocation} and the edited queue profile in real-time.`
                        : 'Once a user syncs from Discover, the queue data here will drive the map and the Travel Map feed.'}
                    </p>
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
