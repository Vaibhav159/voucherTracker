import React, { useState, useRef, useEffect } from 'react';
import { analyzeQuery } from '../utils/botLogic';

const QUICK_PROMPTS = [
    { text: "Best card for utility bills", icon: "💡" },
    { text: "Cheapest Amazon voucher", icon: "🛍️" },
    { text: "Best travel card", icon: "✈️" },
    { text: "How to pay insurance", icon: "🏥" },
    { text: "SmartBuy multipliers", icon: "🔥" },
    { text: "Lifetime free cards", icon: "🆓" }
];

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hey! 👋 I'm **CardGenie** - your credit card optimization expert.\n\nI can help with voucher deals, card recommendations, and even arbitrage strategies.\n\nTry asking something below!" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async (textInput) => {
        const text = typeof textInput === 'string' ? textInput : input;
        if (!text.trim()) return;
        if (textInput?.preventDefault) textInput.preventDefault();

        setMessages(prev => [...prev, { sender: 'user', text }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            try {
                const response = analyzeQuery(text);
                setMessages(prev => [...prev, { sender: 'bot', text: response }]);
            } catch {
                setMessages(prev => [...prev, { sender: 'bot', text: "Oops! Something went wrong. Try rephrasing." }]);
            }
            setIsTyping(false);
            inputRef.current?.focus();
        }, 150);
    };

    const renderText = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block', marginBottom: line === '' ? '10px' : '3px' }}>
                {line.split(/(\*\*[^*]+\*\*)/).map((part, idx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={idx} style={{ color: '#60a5fa' }}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                })}
            </span>
        ));
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 100px)',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: "'Outfit', -apple-system, sans-serif"
        }}>
            {/* Main Card */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
                borderRadius: '28px',
                boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.1)',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px 24px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(0,0,0,0.3)'
                }}>
                    <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '26px',
                        boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
                        animation: 'pulse 2s ease-in-out infinite'
                    }}>🧞</div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: 'white', letterSpacing: '-0.5px' }}>
                            CardGenie
                        </h2>
                        <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '7px', height: '7px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></span>
                            Credit Card Optimization Engine
                        </p>
                    </div>
                </div>

                {/* Messages */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                }}>
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            style={{
                                maxWidth: '80%',
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                background: msg.sender === 'user'
                                    ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
                                    : 'rgba(255,255,255,0.07)',
                                color: msg.sender === 'user' ? 'white' : '#e2e8f0',
                                padding: '14px 18px',
                                borderRadius: msg.sender === 'user' ? '20px 20px 6px 20px' : '20px 20px 20px 6px',
                                fontSize: '14px',
                                lineHeight: '1.6',
                                boxShadow: msg.sender === 'user'
                                    ? '0 4px 15px rgba(59, 130, 246, 0.3)'
                                    : '0 2px 10px rgba(0,0,0,0.2)',
                                border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                                animation: 'slideIn 0.3s ease-out',
                                wordBreak: 'break-word'
                            }}
                        >
                            {renderText(msg.text)}
                        </div>
                    ))}

                    {isTyping && (
                        <div style={{
                            alignSelf: 'flex-start',
                            background: 'rgba(255,255,255,0.07)',
                            padding: '14px 20px',
                            borderRadius: '20px 20px 20px 6px',
                            display: 'flex',
                            gap: '5px'
                        }}>
                            {[0, 1, 2].map(i => (
                                <span key={i} style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: `hsl(${250 + i * 20}, 80%, 65%)`,
                                    animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`
                                }}></span>
                            ))}
                        </div>
                    )}

                    {/* Quick Prompts */}
                    {!isTyping && messages.length === 1 && (
                        <div style={{ marginTop: '16px' }}>
                            <p style={{
                                textAlign: 'center',
                                color: '#64748b',
                                fontSize: '11px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                marginBottom: '14px'
                            }}>
                                Popular Questions
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                                {QUICK_PROMPTS.map((prompt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSend(prompt.text)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            background: 'rgba(255,255,255,0.06)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            padding: '10px 16px',
                                            color: '#cbd5e1',
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontFamily: 'inherit'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = 'rgba(99, 102, 241, 0.15)';
                                            e.target.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = 'rgba(255,255,255,0.06)';
                                            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.color = '#cbd5e1';
                                        }}
                                    >
                                        <span style={{ fontSize: '16px' }}>{prompt.icon}</span>
                                        <span>{prompt.text}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div style={{
                    padding: '16px 20px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(0,0,0,0.2)'
                }}>
                    <form onSubmit={handleSend} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '16px',
                        padding: '6px 6px 6px 18px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.2s'
                    }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about cards, vouchers, or optimization strategies..."
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: 'white',
                                fontSize: '14px',
                                padding: '10px 0',
                                fontFamily: 'inherit'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: input.trim()
                                    ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
                                    : 'rgba(255,255,255,0.1)',
                                border: 'none',
                                cursor: input.trim() ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                                opacity: input.trim() ? 1 : 0.4
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default ChatBot;
