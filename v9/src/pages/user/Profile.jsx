import { useState } from 'react';
import { User, Mail, Bell, Shield, Wallet, BookOpen, LogOut, ChevronRight, Crown, CreditCard, Activity } from 'lucide-react';
import SEO from '../../components/SEO';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('profile');

    // Mock user data
    const user = {
        name: 'Rahul Verma',
        email: 'rahul.verma@example.com',
        phone: '+91 98765 43210',
        joined: 'Sept 2023',
        tier: 'Gold Member',
        cards: 5,
        milestones: 2
    };

    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security & Privacy', icon: Shield },
    ];

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Your Profile | CardPerks"
                description="Manage your account, settings, and preferences."
                keywords="profile, settings, account management"
            />

            {/* Header / Hero */}
            <div className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-full flex items-center justify-center text-3xl font-serif font-bold shadow-xl border-4" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', borderColor: 'var(--bg)' }}>
                            RV
                        </div>
                        <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full shadow-md" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                            <Crown size={16} style={{ color: '#eab308' }} fill="#eab308" />
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold font-serif mb-1" style={{ color: 'var(--text-primary)' }}>{user.name}</h1>
                        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Member since {user.joined}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)' }}>
                                <Crown size={12} /> {user.tier}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10" style={{ color: 'var(--text-secondary)' }}>
                                <CreditCard size={12} /> {user.cards} Cards
                            </span>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold transition-colors hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                            <LogOut size={16} />
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Content - Pull up overlap */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
                <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">

                    {/* Sidebar */}
                    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[var(--border)] bg-[var(--bg)]/50">
                        <nav className="p-4 space-y-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-[var(--surface)] shadow-sm'
                                        : 'hover:bg-[var(--surface)]/50 text-[var(--text-secondary)]'}`}
                                    style={{ color: activeTab === tab.id ? 'var(--accent)' : undefined }}
                                >
                                    <div className="flex items-center gap-3">
                                        <tab.icon size={18} />
                                        <span>{tab.label}</span>
                                    </div>
                                    {activeTab === tab.id && <ChevronRight size={16} />}
                                </button>
                            ))}
                        </nav>

                        {/* Mobile logout */}
                        <div className="p-4 mt-auto md:hidden border-t" style={{ borderColor: 'var(--border)' }}>
                            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-bold text-red-500 hover:bg-red-500/10">
                                <LogOut size={18} />
                                Log Out
                            </button>
                        </div>
                    </aside>

                    {/* Main Panel */}
                    <div className="flex-1 p-6 md:p-8">
                        {activeTab === 'profile' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Personal Information</h2>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Update your personal details and contact info.</p>
                                </div>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue={user.name}
                                                className="w-full px-4 py-2.5 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                                                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
                                            <input
                                                type="text"
                                                defaultValue={user.phone}
                                                className="w-full px-4 py-2.5 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                                                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                                        <input
                                            type="email"
                                            defaultValue={user.email}
                                            className="w-full px-4 py-2.5 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                                            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Bio / Notes</label>
                                        <textarea
                                            rows="4"
                                            placeholder="Add a bio or notes about your credit card strategy..."
                                            className="w-full px-4 py-2.5 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                                            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button className="px-6 py-2.5 rounded-lg font-bold text-sm bg-[var(--accent)] text-[var(--bg)] hover:brightness-110 shadow-lg">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Notification Preferences</h2>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Control what you want to be notified about.</p>
                                </div>

                                <div className="space-y-4 divide-y" style={{ divideColor: 'var(--border)' }}>
                                    {[
                                        { title: 'Payment Reminders', desc: 'Get notified 3 days before bill due dates.' },
                                        { title: 'Milestone Alerts', desc: 'Updates when you are close to a spending milestone.' },
                                        { title: 'New Offers & Deals', desc: 'Daily digest of new offers on your cards.' },
                                        { title: 'Community Updates', desc: 'Weekly summary of trending discussions.' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between py-4 first:pt-0">
                                            <div>
                                                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                                                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Security & Privacy</h2>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Manage your password and account security.</p>
                                </div>

                                <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 mb-6">
                                    <div className="flex gap-3">
                                        <Shield className="shrink-0 text-yellow-500" size={20} />
                                        <div>
                                            <h3 className="text-sm font-bold text-yellow-500 mb-1">Two-Factor Authentication</h3>
                                            <p className="text-xs text-[var(--text-secondary)]">Add an extra layer of security to your account. We recommend enabling 2FA for all users.</p>
                                            <button className="mt-3 text-xs font-bold text-yellow-500 hover:text-yellow-400">Enable 2FA &rarr;</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                                    <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Change Password</h3>
                                    <div className="space-y-3">
                                        <input
                                            type="password"
                                            placeholder="Current Password"
                                            className="w-full px-4 py-2.5 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                                            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                        />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            className="w-full px-4 py-2.5 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                                            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                        />
                                        <input
                                            type="password"
                                            placeholder="Confirm New Password"
                                            className="w-full px-4 py-2.5 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                                            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                        />
                                    </div>
                                    <div className="pt-2 flex justify-end">
                                        <button className="px-6 py-2.5 rounded-lg font-bold text-sm border hover:bg-[var(--surface)] transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
