import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function Profile({ user }) {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get(`/users/${id}`).then(({ data }) => setProfile(data));
    API.get(`/posts/user/${id}`).then(({ data }) => setPosts(data));
  }, [id]);

  const toggleFollow = async () => {
    const { data } = await API.post(`/users/${id}/follow`);
    setProfile(prev => ({
      ...prev,
      followers: data.following
        ? [...prev.followers, user._id]
        : prev.followers.filter(f => f !== user._id)
    }));
  };

  if (!profile) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '20px 0', background: '#fff', borderRadius: '10px', marginBottom: '20px' }}>
        <h2>{profile.name}</h2>
        <p style={{ color: '#666' }}>{profile.bio || 'No bio'}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', margin: '12px 0' }}>
          <span><strong>{profile.followers.length}</strong> followers</span>
          <span><strong>{profile.following.length}</strong> following</span>
          <span><strong>{posts.length}</strong> posts</span>
        </div>
        {user && user._id !== id && (
          <button className={`btn ${profile.followers.includes(user._id) ? 'btn-outline' : 'btn-primary'}`} onClick={toggleFollow}>
            {profile.followers.includes(user._id) ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>

      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <p className="post-content">{post.content}</p>
          <div className="post-actions">
            <span>❤️ {post.likes.length}</span>
            <span>💬 {post.comments.length}</span>
            <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
