import { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import './Dashboard.css';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks().then(res => setTasks(res.data));
    }, []);

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed).length;
    const overdue = tasks.filter(t => 
        !t.completed && t.deadline && new Date(t.deadline) < new Date()
    ).length;

    return (
        <div className="dashboard">
            <h1 className="page-title">Dashboard</h1>
            <div className="stats-grid">
                <div className="stat-card total">
                    <span className="stat-icon">📋</span>
                    <div>
                        <p className="stat-number">{total}</p>
                        <p className="stat-label">Total Tasks</p>
                    </div>
                </div>
                <div className="stat-card completed">
                    <span className="stat-icon">✅</span>
                    <div>
                        <p className="stat-number">{completed}</p>
                        <p className="stat-label">Completed</p>
                    </div>
                </div>
                <div className="stat-card pending">
                    <span className="stat-icon">⏳</span>
                    <div>
                        <p className="stat-number">{pending}</p>
                        <p className="stat-label">Pending</p>
                    </div>
                </div>
                <div className="stat-card overdue">
                    <span className="stat-icon">🔴</span>
                    <div>
                        <p className="stat-number">{overdue}</p>
                        <p className="stat-label">Overdue</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;