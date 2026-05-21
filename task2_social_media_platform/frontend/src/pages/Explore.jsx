import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Explore({ user }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/login');
    API.get('/users').then(({ data }) => setUsers(data.filter(u => u._id !== user._id)));
  }, [user]);

  const toggleFollow = async (id) => {
    const { data } = await API.post(`/users/${id}/follow`);
    setUsers(users.map(u => {
      if (u._id === id) {
        if (data.following) return { ...u, followers: [...u.followers, user._id] };
        else return { ...u, followers: u.followers.filter(f => f !== user._id) };
      }
      return u;
    }));
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: '16px' }}>Discover People</h2>
      {users.map((u) => (
        <div key={u._id} className="user-card">
          <div>
            <strong style={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${u._id}`)}>{u.name}</strong>
            <p style={{ fontSize: '0.8rem', color: '#999' }}>{u.followers.length} followers</p>
          </div>
          <button
            className={`btn btn-sm ${u.followers.includes(user._id) ? 'btn-outline' : 'btn-primary'}`}
            onClick={() => toggleFollow(u._id)}
          >
            {u.followers.includes(user._id) ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      ))}
    </div>
  );
}
