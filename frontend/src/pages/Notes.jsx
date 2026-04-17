import { useState, useEffect } from 'react';
import { getNotes, createNote, deleteNote } from '../services/noteService';
import { getSubjects } from '../services/subjectService';
import './Notes.css';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [subject, setSubject] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadNotes();
        getSubjects().then(res => setSubjects(res.data));
    }, []);

    const loadNotes = () => {
        getNotes().then(res => setNotes(res.data));
    };

    const handleAdd = () => {
        if (!title.trim() || !content.trim()) return;
        createNote({
            title,
            content,
            subject: subject || null
        }).then(() => {
            setTitle('');
            setContent('');
            loadNotes();
        });
    };

    const handleDelete = (id) => {
        deleteNote(id).then(loadNotes);
    };

    const getSubjectColor = (subjectId) => {
        const s = subjects.find(s => s.id === subjectId);
        return s ? s.color : '#ccc';
    };

    const getSubjectName = (subjectId) => {
        const s = subjects.find(s => s.id === subjectId);
        return s ? s.name : '';
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="notes-page">
            <h1 className="page-title">Notes</h1>

            <div className="add-note-form">
                <input
                    type="text"
                    placeholder="Note title..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="input"
                />
                <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="input"
                >
                    <option value="">No Subject</option>
                    {subjects.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
                <textarea
                    placeholder="Write your note..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="input textarea"
                    rows={4}
                />
                <button onClick={handleAdd} className="btn-primary">Add Note</button>
            </div>

            <input
                type="text"
                placeholder="🔍 Search notes by title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input search-input"
            />

            <div className="notes-grid">
                {filteredNotes.map(note => (
                    <div
                        key={note.id}
                        className="note-card"
                        style={{ borderTop: `4px solid ${getSubjectColor(note.subject)}` }}
                    >
                        <div className="note-header">
                            <h3 className="note-title">{note.title}</h3>
                            <button onClick={() => handleDelete(note.id)} className="btn-delete">🗑️</button>
                        </div>
                        {note.subject && (
                            <span
                                className="subject-badge"
                                style={{ backgroundColor: getSubjectColor(note.subject) }}
                            >
                                {getSubjectName(note.subject)}
                            </span>
                        )}
                        <p className="note-content">{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Notes;