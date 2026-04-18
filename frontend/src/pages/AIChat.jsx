import { useState } from 'react';
import { sendMessage } from '../services/aiService';
import './AIChat.css';

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: "Hello! I'm your Study Assistant. Ask me to explain any topic or create a study plan for you! 📚"
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('explain');

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await sendMessage(input, mode);
            const aiMsg = { role: 'assistant', text: res.data.reply };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: 'Something went wrong! Please try again.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-page">
            <h1 className="page-title">AI Study Assistant</h1>

            <div className="mode-selector">
                <button
                    className={`mode-btn ${mode === 'explain' ? 'active' : ''}`}
                    onClick={() => setMode('explain')}
                >
                    💡 Topic Explain
                </button>
                <button
                    className={`mode-btn ${mode === 'study_plan' ? 'active' : ''}`}
                    onClick={() => setMode('study_plan')}
                >
                    📅 Create Study Plan
                </button>
            </div>

            <div className="messages-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <div className="message-bubble">
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="message assistant">
                        <div className="message-bubble loading">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="chat-input-area">
                <textarea
                    placeholder={
                        mode === 'explain'
                            ? "Type a topic... e.g. 'Explain photosynthesis'"
                            : "Type 'Create my study plan' or ask something specific..."
                    }
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="chat-input"
                    rows={2}
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="send-btn"
                >
                    {loading ? '⏳' : '➤'}
                </button>
            </div>
        </div>
    );
};
export default AIChat;