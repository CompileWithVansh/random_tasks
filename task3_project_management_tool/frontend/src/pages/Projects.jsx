import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Projects({ user }) {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/login');
    API.get('/projects').then(({ data }) => setProjects(data));
  }, [user]);

  const createProject = async (e) => {
    e.preventDefault();
    const { data } = await API.post('/projects', { name, description: desc });
    setProjects([data, ...projects]);
    setName(''); setDesc(''); setShowForm(false);
  };

  const deleteProject = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Delete this project?')) return;
    await API.delete(`/projects/${id}`);
    setProjects(projects.filter(p => p._id !== id));
  };

  if (!user) return null;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>My Projects</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ New Project</button>
      </div>

      {showForm && (
        <form onSubmit={createProject} style={{ background: '#fff', padding: '16px', borderRadius: '10px', marginBottom: '16px' }}>
          <div className="form-group"><input placeholder="Project name" required value={name} onChange={e => setName(e.target.value)} /></div>
          <div className="form-group"><input placeholder="Description (optional)" value={desc} onChange={e => setDesc(e.target.value)} /></div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      )}

      {projects.length === 0 ? (
        <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>No projects yet. Create one!</p>
      ) : (
        projects.map((p) => (
          <div key={p._id} className="project-card" onClick={() => navigate(`/project/${p._id}`)}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{p.name}</h3>
              {p.owner._id === user._id && <button className="btn btn-danger btn-sm" onClick={(e) => deleteProject(p._id, e)}>Delete</button>}
            </div>
            <p>{p.description || 'No description'}</p>
            <p style={{ fontSize: '0.75rem', color: '#3498db', marginTop: '6px' }}>{p.members.length} member(s)</p>
          </div>
        ))
      )}
    </div>
  );
}
