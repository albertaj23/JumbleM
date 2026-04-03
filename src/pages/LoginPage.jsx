import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useBrandAnimation from '../hooks/useBrandAnimation';
import usePageStylesheets from '../hooks/usePageStylesheets';

function LoginPage() {
  usePageStylesheets(['/styles/login.css']);
  useBrandAnimation();

  return (
    <>
      <Navbar active="login" />
      <main className="login-shell">
        <section className="login-hero">
          <div className="hero-copy">
            <span className="hero-chip">Front-end auth theme</span>
            <h1>Sign in to keep your world in sync.</h1>
            <p>Carry your vibe across journeys, queue your soundtracks, and connect your favorite platforms in one place.</p>
            <div className="hero-points">
              <div className="hero-point">
                <span className="material-symbols-outlined">music_note</span>
                <span>Provider connections for Spotify, Apple Music, and Google</span>
              </div>
              <div className="hero-point">
                <span className="material-symbols-outlined">bolt</span>
                <span>A gradient language pulled from the landing page transition</span>
              </div>
              <div className="hero-point">
                <span className="material-symbols-outlined">travel</span>
                <span>One profile for discovery, mapping, and live sound sync</span>
              </div>
            </div>
          </div>

          <div className="login-card">
            <div className="card-header">
              <p className="eyebrow">Welcome back</p>
              <h2>Create your listening identity</h2>
              <p className="card-copy">This is a front-end-only concept screen for onboarding and login flows.</p>
            </div>

            <form className="login-form">
              <label className="field">
                <span>Name</span>
                <input type="text" placeholder="Your name" />
              </label>

              <label className="field">
                <span>Email or phone number</span>
                <input type="text" placeholder="name@example.com or +91 98765 43210" />
              </label>

              <button type="button" className="primary-action">Continue</button>
            </form>

            <div className="divider">
              <span>Connect a music profile</span>
            </div>

            <div className="provider-grid">
              <button type="button" className="provider-btn spotify">
                <span className="material-symbols-outlined">album</span>
                <span>Connect Spotify</span>
              </button>
              <button type="button" className="provider-btn apple">
                <span className="material-symbols-outlined">library_music</span>
                <span>Connect Apple Music</span>
              </button>
              <button type="button" className="provider-btn google">
                <span className="material-symbols-outlined">play_circle</span>
                <span>Continue with Google</span>
              </button>
            </div>

            <p className="legal-note">No back-end logic is connected yet. These controls are visual only for now.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default LoginPage;
