import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useBrandAnimation from '../hooks/useBrandAnimation';
import usePageStylesheets from '../hooks/usePageStylesheets';
import { useJumbleMFlow } from '../context/JumbleMFlowContext';
import { useUserSession } from '../context/UserSessionContext';

function DiscoverPage() {
  usePageStylesheets(['/styles/discover.css']);
  useBrandAnimation();
  const navigate = useNavigate();
  const {
    draft,
    updateDraft,
    createTrackFromDraft,
    posts,
    topTags,
    likeTrack
  } = useJumbleMFlow();
  const { currentUser, publishCategoryPost } = useUserSession();
  const [isCultureOpen, setIsCultureOpen] = useState(false);

  const handleChange = (key) => (event) => {
    updateDraft({
      [key]: key === 'energy' ? Number(event.target.value) : event.target.value
    });
  };

  const handleSync = async () => {
    const syncedHandle = currentUser ? `@${currentUser.nickname}` : draft.handle;
    createTrackFromDraft({ handle: syncedHandle });

    try {
      await publishCategoryPost({
        authorNickname: currentUser?.nickname || syncedHandle,
        category: draft.environment,
        songName: draft.songName,
        gpsLocation: draft.gpsLocation,
        selfAssessment: draft.selfAssessment
      });
    } catch {
      // Keep the local flow responsive even if the API is unavailable.
    }

    navigate('/sync-your-sound');
  };

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
              Type your own vibe, sync it into the queue, and let the same street-grid identity expand into Travel Map.
            </p>
          </section>

          <section className="sonic-section">
            <div className="section-header">
              <div className="header-content">
                <h2 className="section-title">Sonic Cartography</h2>
                <p className="section-description">Build a user, a song, and a location profile that travels through every page.</p>
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
                  <h3 className="card-title">Type Your Own Vibe</h3>
                  <p className="card-text">
                    Enter the song, your self-assessed musical profile, and the environmental feel you want. Each sync becomes a queue track, a map pin, and a social post.
                  </p>
                  <div className="discover-flow-form">
                    <label className="discover-field">
                      <span>Song Name</span>
                      <input type="text" value={draft.songName} onChange={handleChange('songName')} />
                    </label>
                    <label className="discover-field">
                      <span>User Tag</span>
                      <input type="text" value={draft.handle} onChange={handleChange('handle')} />
                    </label>
                    <label className="discover-field discover-field-wide">
                      <span>Musical Self Assessment</span>
                      <input type="text" value={draft.selfAssessment} onChange={handleChange('selfAssessment')} />
                    </label>
                    <label className="discover-field">
                      <span>Environment</span>
                      <input type="text" value={draft.environment} onChange={handleChange('environment')} />
                    </label>
                    <label className="discover-field">
                      <span>GPS Location</span>
                      <input type="text" value={draft.gpsLocation} onChange={handleChange('gpsLocation')} />
                    </label>
                    <label className="discover-field">
                      <span>Tempo</span>
                      <input type="text" value={draft.tempo} onChange={handleChange('tempo')} />
                    </label>
                    <label className="discover-field">
                      <span>Energy {draft.energy}</span>
                      <input type="range" min="0" max="100" value={draft.energy} onChange={handleChange('energy')} />
                    </label>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="card-link" type="button" onClick={handleSync}>
                    Sync to Street Grid
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="bento-card bento-tall bento-primary">
                <div className="card-pattern"></div>
                <div className="card-content">
                  <div className="card-icon-wrapper icon-light">
                    <span className="material-symbols-outlined">map</span>
                  </div>
                  <h3 className="card-title">Street Grid Preview</h3>
                  <p className="card-text">
                    A lightweight street-grid preview keeps the interaction map-like without needing a full GIS view. The same user card appears in Vibe Queue first, then shrinks into Travel Map.
                  </p>
                </div>
                <div className="card-footer">
                  <div className="map-preview street-grid-preview">
                    <div className="street-grid-lines"></div>
                    <div className="street-grid-node preview-node">
                      <span>{draft.handle}</span>
                      <small>{draft.gpsLocation}</small>
                    </div>
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
                    Surface synced vibe posts, like the strongest cultural tags, and let the top five categories emerge from real user input.
                  </p>
                </div>
                <button className="inline-link inline-button" type="button" onClick={() => setIsCultureOpen(true)}>
                  Open Culture Feed
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>

              <div className="bento-card bento-medium bento-elevated">
                <div className="card-icon-circle icon-primary">
                  <span className="material-symbols-outlined icon-filled">electric_bolt</span>
                </div>
                <div className="card-content">
                  <h3 className="card-title-sm">Vibe Intelligence</h3>
                  <p className="card-text-sm">
                    Energy, location, and self-assessment all move through one flow so the queue, map, and travel feed stay connected.
                  </p>
                </div>
                <div className="tag-group">
                  {(topTags.length ? topTags : [
                    { tag: '#night-streets' },
                    { tag: '#mid-tempo' },
                    { tag: '#berlin' }
                  ]).map((item) => (
                    <span className="tag" key={item.tag}>{item.tag.replace('-', ' ')}</span>
                  ))}
                </div>
              </div>

              <div className="bento-card bento-wide bento-fiesta">
                <div className="fiesta-glow"></div>
                <div className="card-content">
                  <div className="card-icon-wrapper icon-celebration">
                    <span className="material-symbols-outlined">music_note</span>
                  </div>
                  <h3 className="card-title">Street-to-Map Flow</h3>
                  <p className="card-text">
                    Discover creates the entry, Vibe Queue lets you update or delete it, and Travel Map only shows the live users and tags that still exist.
                  </p>
                </div>
                <div className="card-footer">
                  <button className="fiesta-btn" type="button" onClick={handleSync}>
                    Start Flow
                    <span className="material-symbols-outlined">celebration</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {isCultureOpen && (
        <div className="culture-lightbox" role="dialog" aria-modal="true">
          <button className="culture-backdrop" type="button" aria-label="Close culture feed" onClick={() => setIsCultureOpen(false)}></button>
          <div className="culture-panel">
            <div className="culture-header">
              <div>
                <span className="section-label">Connect to Culture</span>
                <h2 className="culture-title">Top liked vibe posts</h2>
              </div>
              <button className="culture-close" type="button" onClick={() => setIsCultureOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="culture-top-tags">
              {topTags.length ? topTags.map(({ tag, score }) => (
                <div className="culture-tag-card" key={tag}>
                  <strong>{tag}</strong>
                  <span>{score} likes</span>
                </div>
              )) : (
                <div className="culture-empty">
                  <strong>No liked tags yet</strong>
                  <span>Sync a user and like posts here to build the top five categories.</span>
                </div>
              )}
            </div>

            <div className="culture-feed">
              {posts.length ? posts.map((post) => (
                <article className="culture-post" key={post.id}>
                  <div className="culture-post-top">
                    <div>
                      <h3>{post.handle}</h3>
                      <p>{post.title}</p>
                    </div>
                    <span className="energy-pill">Energy {post.energy}</span>
                  </div>
                  <p className="culture-copy">{post.body}</p>
                  <div className="culture-tags">
                    {post.tags.map((tag) => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button className="culture-like-btn" type="button" onClick={() => likeTrack(post.id)}>
                    <span className="material-symbols-outlined">favorite</span>
                    Like tag set
                    <strong>{post.likes}</strong>
                  </button>
                </article>
              )) : (
                <div className="culture-empty">
                  <strong>No posts yet</strong>
                  <span>Once a user syncs data from this page, a post will appear here and can be liked.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default DiscoverPage;
