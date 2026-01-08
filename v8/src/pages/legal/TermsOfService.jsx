import { useState } from 'react';

const sections = [
    {
        id: 'section-1', title: 'Acceptance of Terms', icon: 'check_circle', content: [
            { text: 'By accessing, registering for, or using the CardPerks dashboard (the "Service"), you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.' }
        ]
    },
    {
        id: 'section-2', title: 'Nature of Service', icon: 'info', subtitle: '(Informational Only)', content: [
            { subtitle: 'Not Financial Advice', text: 'The content provided within the CardPerks dashboard is strictly for informational and educational purposes. It is not intended to be a substitute for professional financial advice. Always seek the advice of your financial advisor or other qualified financial provider with any questions you may have regarding a financial decision.' },
            { subtitle: 'No Banking Affiliation', text: 'CardPerks is an independent entity and is not directly affiliated with, endorsed by, or sponsored by any specific bank or credit card issuer mentioned on the platform unless explicitly stated in the Affiliate Disclosure section.' }
        ]
    },
    {
        id: 'section-3', title: 'Accuracy of Information', icon: 'verified_user', content: [
            { subtitle: 'The "No Guarantee" Clause', text: 'While we strive to keep information up to date, credit card offers, interest rates, and bonus categories change frequently. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, or reliability of the data.' },
            { subtitle: 'User Verification Required', text: 'It is your responsibility to verify all terms and conditions with the credit card issuer directly before applying. Reliance on any information provided by CardPerks is strictly at your own risk.' }
        ]
    },
    {
        id: 'section-4', title: 'Limitation of Liability', icon: 'shield', highlight: true, content: [
            { text: 'To the fullest extent permitted by applicable law, CardPerks shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.' },
            { callout: true, title: 'The "Protect at All Costs" Clause', text: 'IN NO EVENT SHALL OUR AGGREGATE LIABILITY EXCEED THE AMOUNT YOU PAID US, IF ANY, IN THE PAST SIX MONTHS FOR THE SERVICES GIVING RISE TO THE CLAIM.' },
            { text: 'This limitation applies to all causes of action whether in contract, tort, or otherwise. You acknowledge that CardPerks would not provide the Service without these limitations on its liability.' }
        ]
    },
    {
        id: 'section-5', title: 'Affiliate Disclosure', icon: 'handshake', content: [
            { text: 'Transparency is core to our community. Please note that some of the links on this dashboard are "affiliate links." This means if you click on the link and purchase the item or apply for the card, we may receive an affiliate commission.' },
            { list: ['This comes at no extra cost to you.', 'We only recommend products or services we believe will add value to our readers.', 'We do not accept payment to write positive reviews for products that we do not believe in.'] }
        ]
    },
    {
        id: 'section-6', title: 'Third-Party Links', icon: 'link', compact: true, content: [
            { text: 'Our Service may contain links to third-party web sites or services that are not owned or controlled by CardPerks. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.' }
        ]
    },
    {
        id: 'section-7', title: 'Indemnification', icon: 'gavel', compact: true, content: [
            { text: 'You agree to defend, indemnify, and hold harmless CardPerks and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses.' }
        ]
    }
];

export default function TermsOfService() {
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
                            <p className="text-gold-dim text-xs uppercase tracking-wider">Legal Navigation</p>
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
                                <span className="material-symbols-outlined text-gold-400 mb-2 text-[24px]">support_agent</span>
                                <p className="text-white text-sm font-bold mb-1">Need Clarification?</p>
                                <p className="text-gold-dim text-xs leading-relaxed mb-3">Our legal team is available for inquiries regarding these terms.</p>
                                <a className="text-copper text-xs font-bold hover:text-white transition-colors" href="/contact">Contact Support →</a>
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
                                <h1 className="text-gold-400 text-4xl md:text-5xl font-serif font-black leading-tight tracking-tight">Terms of Service</h1>
                                <p className="text-white text-lg md:text-xl font-light leading-relaxed opacity-90">Please read these terms carefully before using our financial dashboard and credit card optimization tools.</p>
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
                                className={`scroll-mt-24 rounded-xl shadow-lg border relative overflow-hidden group ${section.highlight
                                        ? 'bg-gradient-to-br from-espresso-800 to-espresso-700 border-gold-400/30'
                                        : 'bg-espresso-800 border-espresso-700'
                                    } ${section.compact ? 'p-8' : 'p-8 md:p-10'}`}
                            >
                                {!section.compact && (
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <span className="material-symbols-outlined text-9xl text-copper">{section.icon}</span>
                                    </div>
                                )}
                                <div className="relative z-10">
                                    <div className={`flex items-baseline gap-4 mb-6 border-b pb-4 ${section.highlight ? 'border-gold-400/20' : 'border-copper/20'}`}>
                                        <span className={`font-serif text-3xl italic font-bold ${section.highlight ? 'text-gold-400' : 'text-copper'}`}>
                                            {String(idx + 1).padStart(2, '0')}.
                                        </span>
                                        <h2 className={`text-2xl font-bold tracking-tight ${section.highlight ? 'text-gold-400' : 'text-white'}`}>
                                            {section.title}
                                            {section.subtitle && <span className="text-gold-dim font-normal text-lg ml-2">{section.subtitle}</span>}
                                        </h2>
                                    </div>

                                    <div className="space-y-6">
                                        {section.content.map((item, i) => (
                                            <div key={i}>
                                                {item.subtitle && (
                                                    <h3 className="text-white font-serif font-bold text-lg mb-2 flex items-center gap-2">
                                                        <span className="h-px w-6 bg-copper inline-block"></span> {item.subtitle}
                                                    </h3>
                                                )}
                                                {item.text && !item.callout && (
                                                    <p className={`text-gold-dim leading-relaxed ${item.subtitle ? 'pl-8 border-l border-espresso-700' : ''}`}>
                                                        {item.text}
                                                    </p>
                                                )}
                                                {item.callout && (
                                                    <div className="bg-gold-400/10 border-l-4 border-gold-400 p-6 my-6 rounded-r-lg">
                                                        <p className="text-gold-400 font-serif font-bold text-lg italic mb-2">{item.title}</p>
                                                        <p className="text-white font-medium">{item.text}</p>
                                                    </div>
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
