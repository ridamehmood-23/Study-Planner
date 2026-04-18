import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import './App.css';
import Subjects from './pages/Subjects';

import AIChat from './pages/AIChat';

function App() {
    return (
        <BrowserRouter>
            <div className="app-layout">
                <Sidebar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/subjects" element={<Subjects />} />
                        <Route path="/ai" element={<AIChat />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
export default App;