import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <nav>
        <Link to="/" className="nav-brand">💬 SocialBuzz</Link>
        <div>
          {user ? (
            <>
              <Link to="/">Feed</Link>
              <Link to="/explore">Explore</Link>
              <Link to={`/profile/${user._id}`}>Profile</Link>
              <span onClick={logout}>Logout</span>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Feed user={user} />} />
        <Route path="/explore" element={<Explore user={user} />} />
        <Route path="/profile/:id" element={<Profile user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
