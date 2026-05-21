import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [commentText, setCommentText] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/login');
    API.get('/posts/feed').then(({ data }) => setPosts(data));
  }, [user]);

  const createPost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const { data } = await API.post('/posts', { content });
    setPosts([data, ...posts]);
    setContent('');
  };

  const likePost = async (id) => {
    const { data } = await API.post(`/posts/${id}/like`);
    setPosts(posts.map(p => p._id === id ? { ...p, likes: data.likes } : p));
  };

  const addComment = async (id) => {
    if (!commentText[id]?.trim()) return;
    const { data } = await API.post(`/posts/${id}/comment`, { text: commentText[id] });
    setPosts(posts.map(p => p._id === id ? { ...p, comments: data } : p));
    setCommentText({ ...commentText, [id]: '' });
  };

  const deletePost = async (id) => {
    await API.delete(`/posts/${id}`);
    setPosts(posts.filter(p => p._id !== id));
  };

  if (!user) return null;

  return (
    <div className="container">
      <div className="create-post">
        <form onSubmit={createPost}>
          <textarea placeholder="What's on your mind?" value={content} onChange={(e) => setContent(e.target.value)} />
          <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>Post</button>
        </form>
      </div>

      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <div className="post-header">
            <span className="post-author" onClick={() => navigate(`/profile/${post.user._id}`)} style={{ cursor: 'pointer' }}>
              {post.user.name}
            </span>
            <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="post-content">{post.content}</p>
          <div className="post-actions">
            <button className={post.likes.includes(user._id) ? 'liked' : ''} onClick={() => likePost(post._id)}>
              ❤️ {post.likes.length}
            </button>
            <span>💬 {post.comments.length}</span>
            {post.user._id === user._id && <button onClick={() => deletePost(post._id)}>🗑️ Delete</button>}
          </div>
          {/* Comments */}
          {post.comments.map((c, i) => (
            <div key={i} className="comment"><strong>{c.user?.name}: </strong>{c.text}</div>
          ))}
          <div className="comment-input">
            <input placeholder="Add comment..." value={commentText[post._id] || ''} onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })} />
            <button className="btn btn-sm btn-primary" onClick={() => addComment(post._id)}>Send</button>
          </div>
        </div>
      ))}
    </div>
  );
}
