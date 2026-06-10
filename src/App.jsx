import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import OrientationsPage from './components/OrientationsPage';

function App() {
  const [page, setPage] = useState('landing');
  const [initialFilters, setInitialFilters] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  const handleEnterPortal = (filters = null) => {
    setInitialFilters(filters);
    setPage('orientations');
  };

  const handleBackToHome = () => {
    setInitialFilters(null);
    setPage('landing');
  };
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Ambient background glows */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />
      {/* Ticker Announcement Banner */}
      <div className="ticker-wrap">
        <div className="ticker">
          <span className="ticker-item">🏆 <strong>NAAC Accreditation Grade A+</strong> Deemed to be University</span>
          <span className="ticker-item">🎓 Department of Computer Science: <strong>MCA & MSc AIML Induction 2026-28</strong></span>
          <span className="ticker-item">📢 Welcome Address by <strong>Dr. Fr. Jossy P George</strong> on Day 2</span>
          <span className="ticker-item">📌 Attendance is tracked: Please check in via the interactive timeline planner</span>
        </div>
      </div>

      {/* State Router */}
      {page === 'landing' ? (
        <LandingPage onEnterPortal={handleEnterPortal} />
      ) : (
        <OrientationsPage 
          key={initialFilters ? JSON.stringify(initialFilters) : 'default'}
          initialFilters={initialFilters} 
          onBackToHome={handleBackToHome} 
        />
      )}
    </div>
  );
}

export default App;
