import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Register({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/');
    } catch (err) { setError(err.response?.data?.message || 'Failed'); }
  };

  return (
    <div className="form-page">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label>Name</label><input required value={name} onChange={e => setName(e.target.value)} /></div>
        <div className="form-group"><label>Email</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div className="form-group"><label>Password</label><input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} /></div>
        <button className="btn btn-primary" style={{ width: '100%' }}>Register</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.9rem' }}>Have an account? <Link to="/login" style={{ color: '#3498db' }}>Login</Link></p>
    </div>
  );
}
