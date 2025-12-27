import React, { useEffect } from 'react';

const ShortcutsModal = ({ isOpen, onClose }) => {
    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isOpen && e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const shortcuts = [
        { keys: ['⌘', 'K'], label: 'Open Search', desc: 'Search everywhere' },
        { keys: ['Shift', 'Shift'], label: 'Double Shift', desc: 'Open search instantly' },
        { keys: ['Shift', 'V'], label: 'Search Vouchers', desc: 'Search with Voucher filter' },
        { keys: ['Shift', 'C'], label: 'Search Cards', desc: 'Search with Card filter' },
        { keys: ['Shift', 'P'], label: 'Search Platforms', desc: 'Search with Platform filter' },
        { keys: ['Shift', '/'], label: 'Shortcuts Help', desc: 'Open this help modal' },
        { keys: ['Esc'], label: 'Close', desc: 'Close search or modal' },
    ];

    return (
        <div
            className="shortcuts-modal-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 10001, // Above everything
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={onClose}
        >
            <div
                className="glass-panel"
                style={{
                    width: '450px',
                    maxWidth: '90%',
                    padding: '2rem',
                    borderRadius: '16px',
                    background: 'var(--modal-bg)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                    }}
                >
                    ✕
                </button>

                <h2 className="text-gradient" style={{ marginTop: 0, marginBottom: '1.5rem', textAlign: 'center' }}>
                    Keyboard Shortcuts
                </h2>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {shortcuts.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.8rem', borderBottom: i < shortcuts.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                {s.desc}
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {s.keys.map((k, idx) => (
                                    <kbd key={idx} style={{
                                        background: 'var(--tag-bg)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '4px',
                                        padding: '2px 6px',
                                        fontSize: '0.8rem',
                                        fontFamily: 'monospace',
                                        color: 'var(--text-primary)',
                                        minWidth: '24px',
                                        textAlign: 'center'
                                    }}>
                                        {k}
                                    </kbd>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShortcutsModal;
