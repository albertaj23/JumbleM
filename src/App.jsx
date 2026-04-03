import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import SyncYourSoundPage from './pages/SyncYourSoundPage';
import LoginPage from './pages/LoginPage';
import TravelMapPage from './pages/TravelMapPage';

function App() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<HomePage />} />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/sync-your-sound" element={<SyncYourSoundPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/travel-map" element={<TravelMapPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
