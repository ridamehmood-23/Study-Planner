import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>📚 StudyPlanner</h2>
            </div>
            <nav className="sidebar-nav">
                <NavLink
                    to="/subjects"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
            📚 Subjects
</NavLink>
                <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    📊 Dashboard
                </NavLink>
                <NavLink 
                    to="/tasks" 
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    ✅ Tasks
                </NavLink>
                <NavLink 
                    to="/notes" 
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                    📝 Notes
                </NavLink>
            </nav>
        </aside>
    );
}
export default Sidebar;