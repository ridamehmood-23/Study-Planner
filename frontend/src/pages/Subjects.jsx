import { useState, useEffect } from 'react';
import { getSubjects, createSubject, deleteSubject } from '../services/subjectService';
import './Subjects.css';

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [name, setName] = useState('');
    const [color, setColor] = useState('#7c3aed');

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = () => {
        getSubjects().then(res => setSubjects(res.data));
    };

    const handleAdd = () => {
        if (!name.trim()) return;
        createSubject({ name, color }).then(() => {
            setName('');
            loadSubjects();
        });
    };

    const handleDelete = (id) => {
        deleteSubject(id).then(loadSubjects);
    };

    return (
        <div className="subjects-page">
            <h1 className="page-title">Subjects</h1>

            <div className="add-form">
                <input
                    type="text"
                    placeholder="Subject name..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="input"
                />
                <input
                    type="color"
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    className="color-picker"
                />
                <button onClick={handleAdd} className="btn-primary">Add Subject</button>
            </div>

            <div className="subjects-grid">
                {subjects.map(subject => (
                    <div
                        key={subject.id}
                        className="subject-card"
                        style={{ borderLeft: `5px solid ${subject.color}` }}
                    >
                        <div className="subject-info">
                            <span
                                className="subject-dot"
                                style={{ backgroundColor: subject.color }}
                            ></span>
                            <span className="subject-name">{subject.name}</span>
                        </div>
                        <button
                            onClick={() => handleDelete(subject.id)}
                            className="btn-delete"
                        >🗑️</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Subjects;