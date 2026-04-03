import { useMemo, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useBrandAnimation from '../hooks/useBrandAnimation';
import usePageStylesheets from '../hooks/usePageStylesheets';

const peopleSeed = [
  { handle: '@quietmarta', energy: 24, copy: 'Ambient cafes, train windows, slow edits.', initials: 'QM' },
  { handle: '@rohit.hum', energy: 48, copy: 'Steady city pace with warm electronic textures.', initials: 'RH' },
  { handle: '@noor.wave', energy: 78, copy: 'Roof parties, camera rolls, and social glow.', initials: 'NW' },
  { handle: '@mila.wav', energy: 91, copy: 'Festival-first, fast clips, high-energy tags.', initials: 'MW' }
];

function TravelMapPage() {
  usePageStylesheets(['/styles/travel-map.css']);
  useBrandAnimation();

  const [min, setMin] = useState(20);
  const [max, setMax] = useState(85);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['@mila.wav', '@rohit.hum']);

  const visiblePeople = useMemo(() => {
    const low = Math.min(min, max);
    const high = Math.max(min, max);
    return peopleSeed.filter((person) => person.energy >= low && person.energy <= high);
  }, [max, min]);

  const addTag = () => {
    const value = tagInput.trim();
    if (!value) {
      return;
    }
    setTags((current) => [...current, value.startsWith('@') ? value : `@${value}`]);
    setTagInput('');
  };

  return (
    <>
      <Navbar active="travel" />
      <main className="main-content">
        <div className="container">
          <section className="map-hero">
            <div className="hero-copy">
              <span className="hero-chip">Social travel layer</span>
              <h1>Map the people behind the places.</h1>
              <p>Travel Map mixes location discovery with an Instagram-like social feed. Tag people, browse energy signatures, and spot who is nearby with a vibe that matches yours.</p>
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-value">124</span>
                  <span className="stat-label">Live tags in your orbit</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">0-100</span>
                  <span className="stat-label">Energy index discovery</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">18</span>
                  <span className="stat-label">Tagged friends nearby</span>
                </div>
              </div>
            </div>
            <div className="map-preview-card">
              <div className="map-canvas">
                <div className="grid-layer"></div>
                <div className="map-pin pin-a"><span>@mila.wav</span></div>
                <div className="map-pin pin-b"><span>@rohit.hum</span></div>
                <div className="map-pin pin-c"><span>@noor.freq</span></div>
                <div className="map-pin pin-d"><span>@leo.afterglow</span></div>
              </div>
            </div>
          </section>

          <section className="story-strip">
            {['Night Rides', 'Kreuz Tags', 'Afterglow', 'Cafe Flow', 'Transit'].map((label) => (
              <div className="story-ring" key={label}>
                <span>{label.slice(0, 2).toUpperCase()}</span>
                <p>{label}</p>
              </div>
            ))}
          </section>

          <section className="travel-grid">
            <div className="left-column">
              <article className="composer-card">
                <div className="composer-header">
                  <div>
                    <span className="eyebrow">Tag someone</span>
                    <h2>Create a location post</h2>
                  </div>
                  <button className="ghost-btn" type="button">Draft</button>
                </div>
                <div className="composer-fields">
                  <label className="field">
                    <span>Caption</span>
                    <textarea rows="3" placeholder="Document the vibe of this place..."></textarea>
                  </label>
                  <label className="field">
                    <span>Add user tag</span>
                    <div className="tag-input-row">
                      <input value={tagInput} onChange={(event) => setTagInput(event.target.value)} type="text" placeholder="@username" />
                      <button className="primary-btn" type="button" onClick={addTag}>Add Tag</button>
                    </div>
                  </label>
                  <div className="tag-list">
                    {tags.map((tag, index) => (
                      <span className="tag-chip" key={`${tag}-${index}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>

              <article className="feed-card">
                <div className="post-header">
                  <div className="post-author">
                    <div className="avatar-ring">NW</div>
                    <div>
                      <h3>Noor Wave</h3>
                      <p>Kreuzberg Rooftop Session</p>
                    </div>
                  </div>
                  <span className="energy-badge">Energy 78</span>
                </div>
                <div className="post-media gradient-one"></div>
                <div className="post-copy">
                  <p>Golden hour, reflective synths, and a crowd easing into the night. Tagged with <strong>@mila.wav</strong> and <strong>@leo.afterglow</strong>.</p>
                  <div className="post-meta">
                    <span>#sunsetset</span>
                    <span>#slowhouse</span>
                    <span>#berlin</span>
                  </div>
                </div>
              </article>

              <article className="feed-card compact">
                <div className="post-header">
                  <div className="post-author">
                    <div className="avatar-ring alt">RH</div>
                    <div>
                      <h3>Rohit Hum</h3>
                      <p>Late metro pulse</p>
                    </div>
                  </div>
                  <span className="energy-badge low">Energy 34</span>
                </div>
                <div className="post-media gradient-two"></div>
                <div className="post-copy">
                  <p>Quiet carriage, city blur, low-volume textures. Tagged <strong>@quietmarta</strong> for a shared commute edit.</p>
                  <div className="post-meta">
                    <span>#transitwave</span>
                    <span>#nightcommute</span>
                  </div>
                </div>
              </article>
            </div>

            <aside className="right-column">
              <section className="filter-card">
                <span className="eyebrow">Energy finder</span>
                <h2>Find tagged users by energy index</h2>
                <p>Filter between 0 and 100 to surface the people whose movement, posting tempo, and social presence match your current pace.</p>
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
                  <h3>Tagged users in range</h3>
                  <span id="results-count">{visiblePeople.length} matches</span>
                </div>
                <div className="people-list">
                  {visiblePeople.map((person) => (
                    <article className="person-card" key={person.handle}>
                      <div className="person-top">
                        <div className="mini-avatar">{person.initials}</div>
                        <span className="energy-tag">{person.energy}</span>
                      </div>
                      <h4>{person.handle}</h4>
                      <p>{person.copy}</p>
                    </article>
                  ))}
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
