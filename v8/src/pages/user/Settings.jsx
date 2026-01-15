import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme, themes } from '../../context/ThemeContext';

export default function Settings() {
    const [activeSection, setActiveSection] = useState('profile');
    const [notifications, setNotifications] = useState({
        priceAlerts: true,
        weeklyDigest: true,
        newDeals: false,
        milestoneReminders: true,
    });

    const { theme, setTheme } = useTheme();

    const sections = [
        { id: 'profile', label: 'Profile', icon: 'person' },
        { id: 'appearance', label: 'Appearance', icon: 'palette' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        { id: 'preferences', label: 'Preferences', icon: 'tune' },
        { id: 'connected', label: 'Connected Accounts', icon: 'link' },
    ];

    return (
        <div className="flex h-full overflow-hidden relative bg-theme-bg">
            {/* Settings Sidebar */}
            <aside className="hidden w-64 flex-col border-r border-primary/20 bg-theme-bg md:flex">
                <div className="flex flex-col p-6 pb-4">
                    <h2 className="text-xl font-serif font-bold text-accent mb-1">Settings</h2>
                    <p className="text-warm-gray text-xs mb-6">Manage your account</p>
                    <nav className="flex flex-col gap-1.5">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all text-left ${activeSection === section.id
                                    ? 'bg-primary/15 text-theme-primary border border-primary/40 shadow-glow-primary-sm'
                                    : 'text-theme-secondary hover:bg-white/5 hover:text-theme-primary border border-transparent'
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-[20px] ${activeSection === section.id ? 'text-primary' : ''}`}>{section.icon}</span>
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-primary/20">
                    <Link
                        to="/"
                        className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-theme-secondary transition-all hover:bg-white/5 hover:text-theme-primary"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        Back to Home
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-theme-bg">
                <div className="mx-auto max-w-3xl px-4 py-6 md:px-8">
                    {/* Profile Section */}
                    {activeSection === 'profile' && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-theme-primary mb-2">Profile Settings</h1>
                                <p className="text-accent-dim">Manage your personal information and preferences.</p>
                            </div>

                            <div className="rounded-xl border border-theme-border bg-theme-surface p-6">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center">
                                        <span className="font-serif text-2xl font-bold text-theme-primary">JD</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-theme-primary">John Doe</h3>
                                        <p className="text-sm text-accent-dim">john.doe@example.com</p>
                                        <button className="mt-2 text-xs font-medium text-accent hover:text-accent">
                                            Change Photo
                                        </button>
                                    </div>
                                </div>

                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium text-accent-dim">Display Name</label>
                                        <input
                                            type="text"
                                            defaultValue="John Doe"
                                            className="w-full rounded-lg border border-theme-border bg-theme-bg px-4 py-3 text-theme-primary placeholder-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium text-accent-dim">Email Address</label>
                                        <input
                                            type="email"
                                            defaultValue="john.doe@example.com"
                                            className="w-full rounded-lg border border-theme-border bg-theme-bg px-4 py-3 text-theme-primary placeholder-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium text-accent-dim">Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full rounded-lg border border-theme-border bg-theme-bg px-4 py-3 text-theme-primary placeholder-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button className="rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-theme-primary hover:bg-accent transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Appearance Section */}
                    {activeSection === 'appearance' && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-theme-primary mb-2">Appearance</h1>
                                <p className="text-accent-dim">Customize the look and feel of CardPerks.</p>
                            </div>

                            <div className="rounded-xl border border-theme-border bg-theme-surface p-6">
                                <h3 className="text-lg font-semibold text-theme-primary mb-2">Theme</h3>
                                <p className="text-sm text-accent-dim mb-6">Choose a theme that suits your style.</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Object.values(themes).map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTheme(t.id)}
                                            className={`relative rounded-xl border-2 p-4 text-left transition-all duration-300 ${theme === t.id
                                                ? 'border-accent bg-theme-border/50 shadow-lg shadow-accent/10'
                                                : 'border-theme-border bg-theme-surface hover:border-theme-border hover:bg-theme-surface'
                                                }`}
                                        >
                                            {/* Color swatch preview */}
                                            <div className="flex gap-1.5 mb-4">
                                                <div
                                                    className="h-8 w-8 rounded-lg border border-white/10"
                                                    style={{ backgroundColor: t.colors.bg }}
                                                    title="Background"
                                                />
                                                <div
                                                    className="h-8 w-8 rounded-lg border border-white/10"
                                                    style={{ backgroundColor: t.colors.surface }}
                                                    title="Surface"
                                                />
                                                <div
                                                    className="h-8 w-8 rounded-lg border border-white/10"
                                                    style={{ backgroundColor: t.colors.accent }}
                                                    title="Accent"
                                                />
                                                <div
                                                    className="h-8 w-8 rounded-lg border border-white/10"
                                                    style={{ backgroundColor: t.colors.textPrimary }}
                                                    title="Text"
                                                />
                                            </div>

                                            {/* Theme name and tagline */}
                                            <h4 className="font-semibold text-theme-primary mb-1">{t.name}</h4>
                                            <p className="text-xs text-theme-secondary leading-relaxed">{t.tagline}</p>

                                            {/* Active checkmark */}
                                            {theme === t.id && (
                                                <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-accent flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-theme-primary text-[16px] font-bold">check</span>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Section */}
                    {activeSection === 'notifications' && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-theme-primary mb-2">Notification Preferences</h1>
                                <p className="text-accent-dim">Choose what updates you want to receive.</p>
                            </div>

                            <div className="rounded-xl border border-theme-border bg-theme-surface divide-y divide-theme-border">
                                {[
                                    { key: 'priceAlerts', title: 'Price Alerts', desc: 'Get notified when voucher rates change significantly' },
                                    { key: 'weeklyDigest', title: 'Weekly Digest', desc: 'Summary of best deals and your savings' },
                                    { key: 'newDeals', title: 'New Deals', desc: 'Instant alerts for new voucher additions' },
                                    { key: 'milestoneReminders', title: 'Milestone Reminders', desc: 'Reminders about card spending milestones' },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between p-6">
                                        <div>
                                            <h4 className="font-medium text-theme-primary">{item.title}</h4>
                                            <p className="text-sm text-accent-dim">{item.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                                            className={`relative h-6 w-11 rounded-full transition-colors ${notifications[item.key] ? 'bg-accent' : 'bg-theme-border'
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Preferences Section */}
                    {activeSection === 'preferences' && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-theme-primary mb-2">App Preferences</h1>
                                <p className="text-accent-dim">Customize your CardPerks experience.</p>
                            </div>

                            <div className="rounded-xl border border-theme-border bg-theme-surface p-6 space-y-6">
                                <div>
                                    <label className="text-sm font-medium text-accent-dim mb-3 block">Default Currency</label>
                                    <select className="w-full rounded-lg border border-theme-border bg-theme-bg px-4 py-3 text-theme-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                                        <option>INR (₹)</option>
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-accent-dim mb-3 block">Default Card for Calculations</label>
                                    <select className="w-full rounded-lg border border-theme-border bg-theme-bg px-4 py-3 text-theme-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                                        <option>HDFC Infinia</option>
                                        <option>Axis Magnus</option>
                                        <option>Amex Platinum</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-accent-dim mb-3 block">Point Valuation Method</label>
                                    <select className="w-full rounded-lg border border-theme-border bg-theme-bg px-4 py-3 text-theme-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                                        <option>Conservative (Lower estimates)</option>
                                        <option>Standard</option>
                                        <option>Optimistic (Higher estimates)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Connected Accounts Section */}
                    {activeSection === 'connected' && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-theme-primary mb-2">Connected Accounts</h1>
                                <p className="text-accent-dim">Manage your linked bank and loyalty accounts.</p>
                            </div>

                            <div className="rounded-xl border border-theme-border bg-theme-surface divide-y divide-theme-border">
                                {[
                                    { name: 'HDFC Bank', status: 'Connected', icon: 'account_balance', color: 'text-emerald-400' },
                                    { name: 'Axis Bank', status: 'Not Connected', icon: 'account_balance', color: 'text-theme-muted' },
                                    { name: 'InterMiles', status: 'Connected', icon: 'flight', color: 'text-emerald-400' },
                                    { name: 'Marriott Bonvoy', status: 'Not Connected', icon: 'hotel', color: 'text-theme-muted' },
                                ].map((account) => (
                                    <div key={account.name} className="flex items-center justify-between p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-theme-border flex items-center justify-center">
                                                <span className="material-symbols-outlined text-accent">{account.icon}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-theme-primary">{account.name}</h4>
                                                <p className={`text-sm ${account.color}`}>{account.status}</p>
                                            </div>
                                        </div>
                                        <button
                                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${account.status === 'Connected'
                                                ? 'border border-red-500/30 text-red-400 hover:bg-red-500/10'
                                                : 'bg-accent text-theme-primary hover:bg-accent'
                                                }`}
                                        >
                                            {account.status === 'Connected' ? 'Disconnect' : 'Connect'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
