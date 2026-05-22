import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Board({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    if (!user) return navigate('/login');
    API.get(`/projects/${id}`).then(({ data }) => setProject(data));
    API.get(`/tasks/project/${id}`).then(({ data }) => setTasks(data));
  }, [id, user]);

  const addTask = async (e) => {
    e.preventDefault();
    const { data } = await API.post('/tasks', { title, description: desc, project: id });
    setTasks([data, ...tasks]);
    setTitle(''); setDesc(''); setShowAdd(false);
  };

  const updateStatus = async (taskId, status) => {
    const { data } = await API.put(`/tasks/${taskId}`, { status });
    setTasks(tasks.map(t => t._id === taskId ? data : t));
  };

  const deleteTask = async (taskId) => {
    await API.delete(`/tasks/${taskId}`);
    setTasks(tasks.filter(t => t._id !== taskId));
  };

  const addComment = async (taskId) => {
    if (!commentText[taskId]?.trim()) return;
    const { data } = await API.post(`/tasks/${taskId}/comment`, { text: commentText[taskId] });
    setTasks(tasks.map(t => t._id === taskId ? { ...t, comments: data } : t));
    setCommentText({ ...commentText, [taskId]: '' });
  };

  if (!project) return <div className="container"><p>Loading...</p></div>;

  const columns = [
    { key: 'todo', label: 'To Do', cls: 'col-todo' },
    { key: 'in_progress', label: 'In Progress', cls: 'col-progress' },
    { key: 'done', label: 'Done', cls: 'col-done' },
  ];

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="btn" style={{ marginBottom: '12px' }}>← Back</button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{project.name}</h1>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>+ Add Task</button>
      </div>
      <p style={{ color: '#7f8c8d', marginBottom: '8px' }}>{project.description}</p>

      {showAdd && (
        <form onSubmit={addTask} style={{ background: '#fff', padding: '14px', borderRadius: '8px', marginTop: '12px' }}>
          <div className="form-group"><input placeholder="Task title" required value={title} onChange={e => setTitle(e.target.value)} /></div>
          <div className="form-group"><input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} /></div>
          <button type="submit" className="btn btn-primary btn-sm">Add</button>
        </form>
      )}

      <div className="board">
        {columns.map((col) => (
          <div key={col.key} className={`column ${col.cls}`}>
            <div className="column-title">{col.label} ({tasks.filter(t => t.status === col.key).length})</div>
            {tasks.filter(t => t.status === col.key).map((task) => (
              <div key={task._id} className="task-card">
                <h4>{task.title}</h4>
                {task.description && <p>{task.description}</p>}
                {task.assignee && <p className="task-assignee">👤 {task.assignee.name}</p>}
                <div className="task-actions">
                  <select value={task.status} onChange={(e) => updateStatus(task._id, e.target.value)}>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task._id)}>×</button>
                </div>
                {task.comments?.map((c, i) => (
                  <div key={i} className="comment"><strong>{c.user?.name}: </strong>{c.text}</div>
                ))}
                <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                  <input
                    placeholder="Comment..."
                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    value={commentText[task._id] || ''}
                    onChange={(e) => setCommentText({ ...commentText, [task._id]: e.target.value })}
                  />
                  <button className="btn btn-primary btn-sm" onClick={() => addComment(task._id)}>↵</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
