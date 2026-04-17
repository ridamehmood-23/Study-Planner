import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { getSubjects } from '../services/subjectService';
import './Tasks.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('medium');

    useEffect(() => {
        loadTasks();
        getSubjects().then(res => setSubjects(res.data));
    }, []);

    const loadTasks = () => {
        getTasks().then(res => setTasks(res.data));
    };

    const handleAdd = () => {
        if (!title.trim()) return;
        createTask({
            title,
            subject: subject || null,
            deadline: deadline || null,
            priority,
            completed: false
        }).then(() => {
            setTitle('');
            setDeadline('');
            loadTasks();
        });
    };

    const handleToggle = (task) => {
        updateTask(task.id, { ...task, completed: !task.completed }).then(loadTasks);
    };

    const handleDelete = (id) => {
        deleteTask(id).then(loadTasks);
    };

    const isOverdue = (task) => {
        return !task.completed && task.deadline && new Date(task.deadline) < new Date();
    };

    const getSubjectColor = (subjectId) => {
        const s = subjects.find(s => s.id === subjectId);
        return s ? s.color : '#ccc';
    };

    const getSubjectName = (subjectId) => {
        const s = subjects.find(s => s.id === subjectId);
        return s ? s.name : '';
    };

    return (
        <div className="tasks-page">
            <h1 className="page-title">Tasks</h1>

            <div className="add-form">
                <input
                    type="text"
                    placeholder="Task title..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="input"
                />
                <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="input select"
                >
                    <option value="">No Subject</option>
                    {subjects.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
                <input
                    type="datetime-local"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="input"
                />
                <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    className="input select"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button onClick={handleAdd} className="btn-primary">Add Task</button>
            </div>

            <div className="tasks-list">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue(task) ? 'overdue' : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggle(task)}
                            className="checkbox"
                        />
                        <div className="task-info">
                            <p className="task-title">{task.title}</p>
                            <div className="task-meta">
                                {task.subject && (
                                    <span
                                        className="subject-badge"
                                        style={{ backgroundColor: getSubjectColor(task.subject) }}
                                    >
                                        {getSubjectName(task.subject)}
                                    </span>
                                )}
                                <span className={`priority-badge ${task.priority}`}>
                                    {task.priority}
                                </span>
                                {task.deadline && (
                                    <span className={`deadline-badge ${isOverdue(task) ? 'overdue-badge' : ''}`}>
                                        📅 {new Date(task.deadline).toLocaleDateString()}
                                        {isOverdue(task) && ' — Overdue!'}
                                    </span>
                                )}
                            </div>
                        </div>
                        <button onClick={() => handleDelete(task.id)} className="btn-delete">🗑️</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Tasks;