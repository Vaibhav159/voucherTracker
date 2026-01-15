import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, AlertCircle, Loader2, Trash2, ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SUGGESTIONS = [
    "What are the best travel cards?",
    "How can I maximize my cashback?",
    "Tell me about Amex Gold rewards",
    "Compare Visa Infinite vs World Elite"
];

export default function PerkAI() {
    const [messages, setMessages] = useState([
        {
            type: 'ai',
            text: 'Hello! I am Perk AI, your personal credit card and rewards assistant. How can I help you maximize your savings today?'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (messages.length > 1) {
            scrollToBottom();
        }
    }, [messages]);

    const handleSendMessage = async (e, customMessage = null) => {
        if (e) e.preventDefault();

        const messageToSend = customMessage || inputValue;

        if (!messageToSend.trim() || isLoading) return;

        setInputValue('');
        setError(null);

        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: messageToSend.trim() }]);
        setIsLoading(true);

        try {
            // Use the proxy path defined in vite.config.js to avoid CORS
            const response = await fetch('/api/n8n/webhook/e0d56849-6354-495f-9713-9ff792f391c5', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ msg: messageToSend.trim() }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();

            let aiText = '';
            if (typeof data === 'string') {
                aiText = data;
            } else if (data.text) {
                aiText = data.text;
            } else if (data.message) {
                aiText = data.message;
            } else if (data.output) {
                aiText = data.output;
            } else {
                aiText = JSON.stringify(data.output || data, null, 2);
                if (aiText === '{}') aiText = "I received your message but couldn't generate a text response.";
            }

            setMessages(prev => [...prev, { type: 'ai', text: aiText }]);
        } catch (err) {
            console.error('Perk AI Error:', err);
            setError('Sorry, I encountered an error connecting to the server. Please try again.');
        } finally {
            setIsLoading(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const clearChat = () => {
        setMessages([{
            type: 'ai',
            text: 'Chat history cleared. How can I help you now?'
        }]);
        setError(null);
    };

    return (
        <div className="h-[calc(100dvh-64px)] flex flex-col relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Perk AI | Your Personal Rewards Assistant"
                description="Chat with Perk AI to get instant recommendations for credit cards, rewards, and savings."
                keywords="AI assistant, credit card help, rewards bot, financial chatbot"
            />

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]" style={{ backgroundColor: 'var(--accent)' }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-5 blur-[100px]" style={{ backgroundColor: 'var(--text-primary)' }} />
            </div>

            {/* Header Area */}
            <div className="relative z-10 py-6 px-4 text-center border-b glass" style={{ borderColor: 'var(--border)', backgroundColor: 'color-mix(in srgb, var(--bg-alt) 80%, transparent)' }}>
                <div className="flex justify-between items-start max-w-4xl mx-auto w-full">
                    <div className="w-10" /> {/* Spacer */}
                    <div className="flex flex-col items-center">
                        <div
                            className="inline-flex items-center justify-center p-3 rounded-2xl mb-4 shadow-lg shadow-[var(--accent)]/20 ring-1 ring-[var(--accent)]/20"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}
                        >
                            <Bot size={32} style={{ color: 'var(--accent)' }} />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            Ask Perk AI <Sparkles size={18} className="text-yellow-500 fill-yellow-500 animate-pulse" />
                        </h1>
                        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Your intelligent companion for all things credit, rewards, and finance.
                        </p>
                    </div>
                    <button
                        onClick={clearChat}
                        className="p-2 rounded-lg transition-all hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-500"
                        title="Clear Chat History"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full p-4 md:p-6 flex flex-col h-full">
                <div className="flex-1 space-y-6 mb-6 overflow-y-auto min-h-[400px] pr-2 custom-scrollbar">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-4 animate-in slide-in-from-bottom-2 duration-500 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            {/* Avatar */}
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border shadow-sm mt-1"
                                style={{
                                    backgroundColor: msg.type === 'user' ? 'var(--surface)' : 'var(--accent)',
                                    borderColor: msg.type === 'user' ? 'var(--border)' : 'var(--accent)',
                                    color: msg.type === 'user' ? 'var(--text-primary)' : 'var(--bg)'
                                }}
                            >
                                {msg.type === 'user' ? <User size={18} /> : <Bot size={20} />}
                            </div>

                            {/* Message Bubble */}
                            <div
                                className={`p-4 md:p-5 rounded-2xl max-w-[85%] md:max-w-[75%] leading-relaxed text-sm md:text-base shadow-sm ${msg.type === 'user'
                                    ? 'rounded-tr-sm bg-gradient-to-br from-[var(--surface)] to-[var(--bg-alt)]'
                                    : 'rounded-tl-sm glass border-transparent'
                                    }`}
                                style={{
                                    backgroundColor: msg.type === 'user' ? undefined : 'color-mix(in srgb, var(--surface) 80%, transparent)',
                                    color: 'var(--text-primary)',
                                    border: msg.type === 'user' ? '1px solid var(--border)' : '1px solid var(--border)',
                                    boxShadow: msg.type === 'ai' ? '0 4px 20px -5px rgba(0,0,0,0.05)' : 'none'
                                }}
                            >
                                {msg.type === 'ai' && idx === 0 ? (
                                    <span className="font-semibold block mb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--accent)' }}>System</span>
                                ) : null}

                                <div className="markdown-content">
                                    {msg.type === 'ai' ? (
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                                                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                a: ({ node, ...props }) => <a className="underline decoration-[var(--accent)] underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }} {...props} />,
                                                strong: ({ node, ...props }) => <strong className="font-bold" style={{ color: 'var(--text-primary)' }} {...props} />,
                                                h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2 mt-4" {...props} />,
                                                h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 mt-3" {...props} />,
                                                h3: ({ node, ...props }) => <h3 className="text-base font-bold mb-1 mt-2" {...props} />,
                                                code: ({ node, inline, ...props }) => (
                                                    inline
                                                        ? <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ backgroundColor: 'var(--bg-alt)' }} {...props} />
                                                        : <code className="block p-3 rounded-lg text-xs font-mono my-2 overflow-x-auto" style={{ backgroundColor: 'var(--bg-alt)' }} {...props} />
                                                )
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="flex gap-4 animate-in fade-in duration-300">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 animate-pulse"
                                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                            >
                                <Bot size={20} />
                            </div>
                            <div
                                className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2 border glass"
                                style={{
                                    backgroundColor: 'var(--bg-alt)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text-secondary)'
                                }}
                            >
                                <Loader2 size={16} className="animate-spin text-[var(--accent)]" />
                                <span className="text-xs font-medium tracking-wide">Analysing financial data...</span>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="flex justify-center my-4 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 text-sm backdrop-blur-md">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestions Chips (Only show when few messages or user interaction needed) */}
                {messages.length < 3 && !isLoading && (
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                        {SUGGESTIONS.map((suggestion, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => handleSendMessage(e, suggestion)}
                                className="text-xs md:text-sm px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95 text-left"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text-secondary)'
                                }}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input Area */}
                <div className="sticky bottom-0 pt-2 pb-2" style={{ backgroundColor: 'transparent' }}>
                    <form
                        onSubmit={handleSendMessage}
                        className="relative max-w-4xl mx-auto shadow-2xl rounded-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-[var(--surface)] opacity-90 backdrop-blur-md border border-[var(--border)]" />

                        <div className="relative flex items-center p-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask about credit cards, rewards, or banking..."
                                className="w-full pl-4 pr-14 py-3 bg-transparent rounded-xl text-base focus:outline-none placeholder:text-[var(--text-muted)]"
                                style={{
                                    color: 'var(--text-primary)'
                                }}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isLoading}
                                className="absolute right-3 p-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[var(--accent)]/30 active:scale-95 flex items-center gap-2"
                                style={{
                                    backgroundColor: inputValue.trim() ? 'var(--accent)' : 'var(--bg-alt)',
                                    color: inputValue.trim() ? 'var(--bg)' : 'var(--text-muted)'
                                }}
                            >
                                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
                            </button>
                        </div>
                    </form>
                    <p className="text-center mt-3 text-[10px] opacity-50 uppercase tracking-widest font-medium" style={{ color: 'var(--text-secondary)' }}>
                        Powered by n8n Intelligence
                    </p>
                </div>
            </div>
        </div>
    );
}
