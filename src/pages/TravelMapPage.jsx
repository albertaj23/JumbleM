import { useMemo, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useBrandAnimation from '../hooks/useBrandAnimation';
import usePageStylesheets from '../hooks/usePageStylesheets';
import { buildTagList, useJumbleMFlow } from '../context/JumbleMFlowContext';

function TravelMapPage() {
  usePageStylesheets(['/styles/travel-map.css']);
  useBrandAnimation();
  const { tracks, activeTrack, posts, topTags, mapPins } = useJumbleMFlow();

  const [min, setMin] = useState(20);
  const [max, setMax] = useState(85);

  const visibleTracks = useMemo(() => {
    const low = Math.min(min, max);
    const high = Math.max(min, max);
    return tracks.filter((person) => person.energy >= low && person.energy <= high);
  }, [max, min, tracks]);

  const visiblePosts = useMemo(() => {
    const allowedIds = new Set(visibleTracks.map((track) => track.id));
    return posts.filter((post) => allowedIds.has(post.id));
  }, [posts, visibleTracks]);

  return (
    <>
      <Navbar active="travel" />
      <main className="main-content">
        <div className="container">
          <section className="map-hero">
            <div className="hero-copy">
              <span className="hero-chip">Social travel layer</span>
              <h1>Map the people behind the places.</h1>
              <p>Travel Map now stays empty until real users sync in. Every card, pin, and top tag here is generated from the same live data coming through Discover and Vibe Queue.</p>
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-value">{tracks.length}</span>
                  <span className="stat-label">Live synced users</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{topTags.length}</span>
                  <span className="stat-label">Top liked tags</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{activeTrack?.gpsLocation || 'No active spot'}</span>
                  <span className="stat-label">Current focus</span>
                </div>
              </div>
            </div>
            <div className="map-preview-card">
              <div className="map-canvas compact-grid-canvas">
                <div className="grid-layer"></div>
                {mapPins.length ? mapPins.map((pin) => (
                  <div
                    className={`map-pin${activeTrack?.id === pin.id ? ' user-pin' : ''}`}
                    key={pin.id}
                    style={{ top: pin.position.top, left: pin.position.left }}
                  >
                    <span>{pin.handle}</span>
                  </div>
                )) : (
                  <div className="travel-empty travel-empty-map">
                    <strong>No tagged users yet</strong>
                    <span>Sync data from Discover and the minimized street grid will appear here.</span>
                  </div>
                )}
                <div className="gps-caption">
                  {activeTrack ? `${activeTrack.gpsLocation} • ${activeTrack.songName}` : 'Waiting for first synced location'}
                </div>
              </div>
            </div>
          </section>

          <section className="story-strip">
            {topTags.length ? topTags.map(({ tag, score }) => (
              <div className="story-ring" key={tag}>
                <span>{tag.replace('#', '').slice(0, 2).toUpperCase()}</span>
                <p>{tag} · {score}</p>
              </div>
            )) : (
              <div className="travel-empty story-empty">
                <strong>No trending tags yet</strong>
                <span>Liked tags will rise into the top five here.</span>
              </div>
            )}
          </section>

          <section className="travel-grid">
            <div className="left-column">
              <article className="composer-card">
                <div className="composer-header">
                  <div>
                    <span className="eyebrow">Tag summary</span>
                    <h2>Create a location post</h2>
                  </div>
                  <button className="ghost-btn" type="button">{tracks.length ? 'Live' : 'Idle'}</button>
                </div>
                {activeTrack ? (
                  <div className="composer-fields">
                    <label className="field">
                      <span>Caption</span>
                      <textarea
                        rows="3"
                        readOnly
                        value={`Document how ${activeTrack.songName} feels at ${activeTrack.gpsLocation} with ${activeTrack.selfAssessment}.`}
                      ></textarea>
                    </label>
                    <label className="field">
                      <span>Active tags</span>
                      <div className="tag-list">
                        {buildTagList(activeTrack).map((tag) => (
                          <span className="tag-chip" key={tag}>{tag}</span>
                        ))}
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="travel-empty composer-empty">
                    <strong>No post data yet</strong>
                    <span>Once a user syncs from Discover, this tile will show the active caption and generated tags.</span>
                  </div>
                )}
              </article>

              {visiblePosts.length ? visiblePosts.map((post, index) => (
                <article className="feed-card" key={post.id}>
                  <div className="post-header">
                    <div className="post-author">
                      <div className={`avatar-ring${index % 2 === 1 ? ' alt' : ''}`}>
                        {post.handle.replace('@', '').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3>{post.handle}</h3>
                        <p>{post.title}</p>
                      </div>
                    </div>
                    <span className={`energy-badge${post.energy < 40 ? ' low' : ''}`}>Energy {post.energy}</span>
                  </div>
                  <div className={`post-media ${index % 2 === 1 ? 'gradient-two' : 'gradient-one'}`}></div>
                  <div className="post-copy">
                    <p>
                      {post.songName} is pinned to <strong>{post.gpsLocation}</strong>. The active self-assessment reads <strong>{post.selfAssessment}</strong>.
                    </p>
                    <div className="post-meta">
                      {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              )) : (
                <article className="feed-card">
                  <div className="travel-empty">
                    <strong>No posts in this energy range</strong>
                    <span>Adjust the slider or add new synced users to populate the connect-to-culture feed.</span>
                  </div>
                </article>
              )}
            </div>

            <aside className="right-column">
              <section className="filter-card">
                <span className="eyebrow">Energy finder</span>
                <h2>Find tagged users by energy index</h2>
                <p>Filter between 0 and 100 to surface only the users whose pace matches the category you want to explore right now.</p>
                <div className="range-grid">
                  <label className="range-field">
                    <span>Min energy</span>
                    <input type="range" min="0" max="100" value={min} onChange={(event) => setMin(Number(event.target.value))} />
                  </label>
                  <label className="range-field">
                    <span>Max energy</span>
                    <input type="range" min="0" max="100" value={max} onChange={(event) => setMax(Number(event.target.value))} />
                  </label>
                </div>
                <div className="range-readout">
                  <span>{Math.min(min, max)}</span>
                  <span>to</span>
                  <span>{Math.max(min, max)}</span>
                </div>
              </section>

              <section className="people-panel">
                <div className="panel-header">
                  <h3>Top 5 liked tags</h3>
                  <span id="results-count">{topTags.length} ranked</span>
                </div>
                <div className="people-list">
                  {topTags.length ? topTags.map(({ tag, score }) => (
                    <article className="person-card tag-rank-card" key={tag}>
                      <div className="person-top">
                        <div className="mini-avatar">#{tag.replace('#', '').slice(0, 1).toUpperCase()}</div>
                        <span className="energy-tag">{score}</span>
                      </div>
                      <h4>{tag}</h4>
                      <p>Aggregated from likes on synced culture posts.</p>
                    </article>
                  )) : (
                    <div className="travel-empty">
                      <strong>No liked tags yet</strong>
                      <span>Use the culture lightbox on Discover to like posts and build this top-five list.</span>
                    </div>
                  )}
                </div>
              </section>

              <section className="people-panel">
                <div className="panel-header">
                  <h3>Tagged users in range</h3>
                  <span id="results-count">{visibleTracks.length} matches</span>
                </div>
                <div className="people-list">
                  {visibleTracks.length ? visibleTracks.map((person) => (
                    <article className="person-card" key={person.id}>
                      <div className="person-top">
                        <div className="mini-avatar">{person.handle.replace('@', '').slice(0, 2).toUpperCase()}</div>
                        <span className="energy-tag">{person.energy}</span>
                      </div>
                      <h4>{person.handle}</h4>
                      <p>{person.songName} · {person.environment} · {person.gpsLocation}</p>
                    </article>
                  )) : (
                    <div className="travel-empty">
                      <strong>No users in range</strong>
                      <span>When users sync data, their cards and tags will appear here automatically.</span>
                    </div>
                  )}
                </div>
              </section>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default TravelMapPage;
