import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuctionDashboard from './components/AuctionDashboard/AuctionDashboard';
import AdminPanel from './components/AdminPanel/AdminPanel';
import PlayerRegistration from './components/PlayerRegistration/PlayerRegistration';
import OwnerDashboard from './components/OwnerDashboard/OwnerDashboard';
import Login from './components/Login/Login';
import UserRegistration from './components/UserRegistration/UserRegistration';
import Leaderboard from './components/Leaderboard/Leaderboard';
import './App.css';
const Players = React.lazy(() => import('./components/Players/PlayersList'));

function App() {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const teamString = localStorage.getItem('team');
  const team = teamString ? JSON.parse(teamString) : null;

  const logout = () => {
      localStorage.clear();
      window.location.href = '/login';
  };

  return (
    <Router>
      <div className="app-shell">
        <header className="app-header">
          <nav className="nav-shell">
            <div className="nav-left">
              <Link to="/" className="nav-logo">
                <span className="nav-logo-mark">⚡</span>
                <span className="nav-logo-text">Live Auction</span>
              </Link>
            </div>
            <div className="nav-center">
              <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
              <Link to="/players" className="nav-link">Players</Link>
            </div>
            <div className="nav-right">
              {!user ? (
                <>
                  <Link to="/login" className="nav-link nav-link-ghost">Login</Link>
                  <Link to="/signup" className="nav-link nav-link-primary">Get Started</Link>
                </>
              ) : (
                <>
                  {user.role === 'Admin' && <Link to="/admin" className="nav-link">Admin</Link>}
                  {user.role === 'Owner' && <Link to="/owner-squad" className="nav-link">My Squad</Link>}
                  {user.role === 'Player' && <Link to="/register-player" className="nav-link">Player Profile</Link>}

                  <div className="nav-profile">
                    {team && team.logo && (
                      <div className="nav-team-logo">
                        <img src={team.logo} alt={team.teamName} />
                      </div>
                    )}
                    <div className="nav-user-avatar">
                      <div className="nav-user-initial">
                        {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                      </div>
                    </div>
                    <div className="nav-user-meta">
                      <span className="nav-user-name">{user.name}</span>
                      <span className="nav-user-role">{user.role}</span>
                    </div>
                  </div>

                  <button onClick={logout} className="nav-link nav-link-danger">Logout</button>
                </>
              )}
            </div>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<AuctionDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<UserRegistration />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/register-player" element={<PlayerRegistration />} />
            <Route
              path="/players"
              element={
                <React.Suspense fallback={<div className="page-loading">Loading players...</div>}>
                  <Players />
                </React.Suspense>
              }
            />
            <Route path="/owner-squad" element={<OwnerDashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
