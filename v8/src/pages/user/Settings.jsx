import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Settings() {
    const [activeSection, setActiveSection] = useState('profile');
    const [notifications, setNotifications] = useState({
        priceAlerts: true,
        weeklyDigest: true,
        newDeals: false,
        milestoneReminders: true,
    });

    const sections = [
        { id: 'profile', label: 'Profile', icon: 'person' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        { id: 'preferences', label: 'Preferences', icon: 'tune' },
        { id: 'connected', label: 'Connected Accounts', icon: 'link' },
    ];

    return (
        <div className="flex flex-1 overflow-hidden relative bg-espresso-950">
            {/* Settings Sidebar */}
            <aside className="hidden w-64 flex-col border-r border-espresso-700 bg-espresso-900 md:flex">
                <div className="flex flex-col gap-2 p-6">
                    <h2 className="text-lg font-bold text-white mb-4">Settings</h2>
                    <nav className="flex flex-col gap-1">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all text-left ${activeSection === section.id
                                    ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">{section.icon}</span>
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-espresso-700">
                    <Link
                        to="/"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        Back to Home
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-espresso-950">
                <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 lg:py-10">
                    {/* Profile Section */}
                    {activeSection === 'profile' && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-2">Profile Settings</h1>
                                <p className="text-gold-dim">Manage your personal information and preferences.</p>
                            </div>

                            <div className="rounded-xl border border-espresso-700 bg-espresso-800 p-6">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-gold-400 to-copper flex items-center justify-center">
                                        <span className="font-serif text-2xl font-bold text-espresso-950">JD</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">John Doe</h3>
                                        <p className="text-sm text-gold-dim">john.doe@example.com</p>
                                        <button className="mt-2 text-xs font-medium text-gold-400 hover:text-gold-300">
                                            Change Photo
                                        </button>
                                    </div>
                                </div>

                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium text-gold-dim">Display Name</label>
                                        <input
                                            type="text"
                                            defaultValue="John Doe"
                                            className="w-full rounded-lg border border-espresso-700 bg-espresso-950 px-4 py-3 text-white placeholder-gray-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium text-gold-dim">Email Address</label>
                                        <input
                                            type="email"
                                            defaultValue="john.doe@example.com"
                                            className="w-full rounded-lg border border-espresso-700 bg-espresso-950 px-4 py-3 text-white placeholder-gray-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium text-gold-dim">Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full rounded-lg border border-espresso-700 bg-espresso-950 px-4 py-3 text-white placeholder-gray-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button className="rounded-lg bg-gold-400 px-6 py-2.5 text-sm font-bold text-espresso-950 hover:bg-gold-300 transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Section */}
                    {activeSection === 'notifications' && (
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-2">Notification Preferences</h1>
                                <p className="text-gold-dim">Choose what updates you want to receive.</p>
                            </div>

                            <div className="rounded-xl border border-espresso-700 bg-espresso-800 divide-y divide-espresso-700">
                                {[
                                    { key: 'priceAlerts', title: 'Price Alerts', desc: 'Get notified when voucher rates change significantly' },
                                    { key: 'weeklyDigest', title: 'Weekly Digest', desc: 'Summary of best deals and your savings' },
                                    { key: 'newDeals', title: 'New Deals', desc: 'Instant alerts for new voucher additions' },
                                    { key: 'milestoneReminders', title: 'Milestone Reminders', desc: 'Reminders about card spending milestones' },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between p-6">
                                        <div>
                                            <h4 className="font-medium text-white">{item.title}</h4>
                                            <p className="text-sm text-gold-dim">{item.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                                            className={`relative h-6 w-11 rounded-full transition-colors ${notifications[item.key] ? 'bg-gold-400' : 'bg-espresso-700'
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
                                <h1 className="text-2xl font-bold text-white mb-2">App Preferences</h1>
                                <p className="text-gold-dim">Customize your CardPerks experience.</p>
                            </div>

                            <div className="rounded-xl border border-espresso-700 bg-espresso-800 p-6 space-y-6">
                                <div>
                                    <label className="text-sm font-medium text-gold-dim mb-3 block">Default Currency</label>
                                    <select className="w-full rounded-lg border border-espresso-700 bg-espresso-950 px-4 py-3 text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400">
                                        <option>INR (₹)</option>
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gold-dim mb-3 block">Default Card for Calculations</label>
                                    <select className="w-full rounded-lg border border-espresso-700 bg-espresso-950 px-4 py-3 text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400">
                                        <option>HDFC Infinia</option>
                                        <option>Axis Magnus</option>
                                        <option>Amex Platinum</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gold-dim mb-3 block">Point Valuation Method</label>
                                    <select className="w-full rounded-lg border border-espresso-700 bg-espresso-950 px-4 py-3 text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400">
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
                                <h1 className="text-2xl font-bold text-white mb-2">Connected Accounts</h1>
                                <p className="text-gold-dim">Manage your linked bank and loyalty accounts.</p>
                            </div>

                            <div className="rounded-xl border border-espresso-700 bg-espresso-800 divide-y divide-espresso-700">
                                {[
                                    { name: 'HDFC Bank', status: 'Connected', icon: 'account_balance', color: 'text-emerald-400' },
                                    { name: 'Axis Bank', status: 'Not Connected', icon: 'account_balance', color: 'text-gray-500' },
                                    { name: 'InterMiles', status: 'Connected', icon: 'flight', color: 'text-emerald-400' },
                                    { name: 'Marriott Bonvoy', status: 'Not Connected', icon: 'hotel', color: 'text-gray-500' },
                                ].map((account) => (
                                    <div key={account.name} className="flex items-center justify-between p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-espresso-700 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-gold-400">{account.icon}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">{account.name}</h4>
                                                <p className={`text-sm ${account.color}`}>{account.status}</p>
                                            </div>
                                        </div>
                                        <button
                                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${account.status === 'Connected'
                                                ? 'border border-red-500/30 text-red-400 hover:bg-red-500/10'
                                                : 'bg-gold-400 text-espresso-950 hover:bg-gold-300'
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
