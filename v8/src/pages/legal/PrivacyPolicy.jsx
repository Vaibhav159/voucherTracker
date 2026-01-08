import { useState } from 'react';

const sections = [
    {
        id: 'section-1', title: 'Data Collection', icon: 'database', content: [
            { subtitle: 'Local Processing', text: 'We believe in privacy by design. All financial calculations, credit card optimization logic, and dashboard analytics are processed locally on your device\'s browser. We do not transmit your entered financial data to any external servers for processing.' },
            { subtitle: 'Local Storage', text: 'To provide a seamless experience where you don\'t have to re-enter data upon every visit, we utilize your browser\'s LocalStorage API. This data remains on your physical device and is never synced to our cloud unless you explicitly enable optional backup features (coming soon).' }
        ]
    },
    {
        id: 'section-2', title: 'Personal Information', icon: 'person', content: [
            { text: 'When you use CardPerks, we do not require you to create an account to access the core features. Therefore, we do not collect personal identifiers such as your name, email address, phone number, or physical address during standard usage.' },
            { text: 'If you choose to contact our support team or sign up for our newsletter, your email address will be stored solely for communication purposes and will never be sold to third-party data brokers.' }
        ]
    },
    {
        id: 'section-3', title: 'Cookies & Analytics', icon: 'cookie', content: [
            { subtitle: 'Essential Cookies', text: 'We use a minimal set of cookies that are strictly necessary for the website to function properly, such as remembering your theme preference (Dark/Light mode) and session states.' },
            { subtitle: 'Analytics', text: 'We use privacy-focused analytics that do not track individual users across the web. We collect aggregate data to understand which dashboard features are most popular, without attaching this data to a specific user profile.' }
        ]
    },
    {
        id: 'section-4', title: 'Third-Party Privacy', icon: 'share', content: [
            { text: 'Our dashboard may contain links to third-party websites, such as bank applications, credit card issuer pages, or financial tools. Please be aware that we are not responsible for the privacy practices of such other sites.' },
            { list: ['We encourage our users to be aware when they leave our site.', 'Read the privacy statements of each and every website that collects personally identifiable information.', 'This privacy policy applies solely to information collected by CardPerks.'] }
        ]
    },
    {
        id: 'section-5', title: "Children's Privacy", icon: 'child_care', content: [
            { text: 'Our Service is not addressed to anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us.' }
        ]
    },
    {
        id: 'section-6', title: 'Changes to This Policy', icon: 'update', content: [
            { text: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.' }
        ]
    }
];

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState('section-1');

    return (
        <div className="min-h-screen flex flex-col bg-espresso-950 text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-espresso-700 bg-espresso-900/95 backdrop-blur-sm">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white">
                        <div className="size-8 text-gold-400">
                            <span className="material-symbols-outlined text-3xl">savings</span>
                        </div>
                        <h2 className="text-white text-lg font-bold tracking-tight font-serif">CardPerks</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-gold-dim hover:text-gold-400 transition-colors text-sm font-medium" href="/">Dashboard</a>
                        <a className="text-gold-dim hover:text-gold-400 transition-colors text-sm font-medium" href="/cards">Cards</a>
                        <a className="text-gold-dim hover:text-gold-400 transition-colors text-sm font-medium" href="/guides">Guides</a>
                    </nav>
                </div>
            </header>

            <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
                {/* Sidebar TOC */}
                <aside className="hidden lg:block w-72 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-espresso-700 py-8 pr-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1 px-3">
                            <h3 className="text-gold-400 font-serif text-lg font-bold">Contents</h3>
                            <p className="text-gold-dim text-xs uppercase tracking-wider">Privacy Navigation</p>
                        </div>

                        <nav className="flex flex-col space-y-1">
                            {sections.map((section, idx) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`group flex items-center gap-3 px-3 py-3 rounded-lg border-l-2 transition-all ${activeSection === section.id
                                            ? 'bg-espresso-700/50 border-gold-400'
                                            : 'border-transparent hover:bg-espresso-800 hover:border-copper/50'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-[20px] ${activeSection === section.id ? 'text-gold-400' : 'text-copper'}`}>{section.icon}</span>
                                    <span className={`text-sm font-medium ${activeSection === section.id ? 'text-gold-400 font-semibold' : 'text-gold-dim group-hover:text-white'}`}>
                                        {idx + 1}. {section.title}
                                    </span>
                                </a>
                            ))}
                        </nav>

                        <div className="px-3 pt-6 mt-auto">
                            <div className="p-4 rounded-lg bg-espresso-800 border border-espresso-700">
                                <span className="material-symbols-outlined text-gold-400 mb-2 text-[24px]">shield</span>
                                <p className="text-white text-sm font-bold mb-1">Privacy Concerns?</p>
                                <p className="text-gold-dim text-xs leading-relaxed mb-3">Contact our Data Protection Officer for any specific questions.</p>
                                <a className="text-copper text-xs font-bold hover:text-white transition-colors" href="/contact">Contact DPO →</a>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 py-10 px-6 lg:px-12 max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-12 border-b border-espresso-700 pb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="flex flex-col gap-3 max-w-2xl">
                                <h1 className="text-gold-400 text-4xl md:text-5xl font-serif font-black leading-tight tracking-tight">Privacy Policy</h1>
                                <p className="text-white text-lg md:text-xl font-bold leading-relaxed opacity-100">Your data stays on your device. Period.</p>
                            </div>
                            <div className="shrink-0">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-espresso-800 rounded-full border border-copper/30">
                                    <span className="size-2 rounded-full bg-copper animate-pulse"></span>
                                    <span className="text-xs font-bold text-copper tracking-wide uppercase">Last Updated: Jan 6, 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="flex flex-col gap-8">
                        {sections.map((section, idx) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-24 bg-espresso-800 rounded-xl p-8 md:p-10 shadow-lg border border-espresso-700 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <span className="material-symbols-outlined text-9xl text-copper">{section.icon}</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-baseline gap-4 mb-6 border-b border-copper/20 pb-4">
                                        <span className="text-copper font-serif text-3xl italic font-bold">{String(idx + 1).padStart(2, '0')}.</span>
                                        <h2 className="text-white text-2xl font-bold tracking-tight font-serif">{section.title}</h2>
                                    </div>

                                    <div className="space-y-6">
                                        {section.content.map((item, i) => (
                                            <div key={i}>
                                                {item.subtitle && (
                                                    <h3 className="text-white font-serif font-bold text-lg mb-2 flex items-center gap-2">
                                                        <span className="h-px w-6 bg-copper inline-block"></span> {item.subtitle}
                                                    </h3>
                                                )}
                                                {item.text && (
                                                    <p className={`text-gold-dim leading-relaxed ${item.subtitle ? 'pl-8 border-l border-espresso-700' : ''}`}>
                                                        {item.text}
                                                    </p>
                                                )}
                                                {item.list && (
                                                    <ul className="list-none space-y-2 pl-4">
                                                        {item.list.map((li, j) => (
                                                            <li key={j} className="flex items-start gap-3 text-gold-dim">
                                                                <span className="text-copper mt-1 text-xs">●</span>
                                                                <span>{li}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-12 pb-6 border-t border-espresso-700 mt-8">
                        <p className="text-gold-dim text-sm">
                            © 2026 CardPerks. All rights reserved. <br />
                            <span className="text-xs opacity-60">Designed for the Indian Credit Card Community.</span>
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
