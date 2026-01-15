import { Shield, Users, Target, Award } from 'lucide-react';
import SEO from '../../components/SEO';

export default function AboutUs() {
    return (
        <div className="min-h-screen pb-20 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="About Us | CardPerks"
                description="Learn about the team behind CardPerks and our mission to simplify credit card rewards."
                keywords="about us, cardperks mission, team, credit card optimization"
            />

            {/* Hero Section */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Redefining <span style={{ color: 'var(--accent)' }}>Credit Lifestyle</span>
                    </h1>
                    <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        We help you navigate the complex world of premium credit cards, maximizing value from every swipe and unlocking exclusive lifestyle privileges.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--accent)' }}>Our Mission</span>
                            <h2 className="text-3xl font-serif font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Democratizing Luxury Travel & Rewards</h2>
                            <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                                At CardPerks, we believe that premium lifestyle benefits shouldn't be a puzzle. Our platform decodes complex reward structures, milestone benefits, and point transfers into actionable insights.
                            </p>
                            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                Whether you're a seasoned churner or looking for your first premium card, our tools are designed to amplify your returns and upgrade your lifestyle.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl border flex flex-col gap-4 transition-transform hover:-translate-y-1" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <Shield className="h-8 w-8" style={{ color: 'var(--accent)' }} />
                                <div>
                                    <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Trust</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Unbiased recommendations based on data, not commissions.</p>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl border flex flex-col gap-4 transition-transform hover:-translate-y-1 mt-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <Target className="h-8 w-8" style={{ color: 'var(--accent)' }} />
                                <div>
                                    <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Precision</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Accurate calculations for MCCs, points, and milestones.</p>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl border flex flex-col gap-4 transition-transform hover:-translate-y-1" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <Users className="h-8 w-8" style={{ color: 'var(--accent)' }} />
                                <div>
                                    <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Community</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Built for enthusiasts, by enthusiasts.</p>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl border flex flex-col gap-4 transition-transform hover:-translate-y-1 mt-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <Award className="h-8 w-8" style={{ color: 'var(--accent)' }} />
                                <div>
                                    <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Excellence</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Adhering to the highest standards of design and utility.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section Placeholder */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-serif font-bold mb-12" style={{ color: 'var(--text-primary)' }}>Meet the Minds</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group relative overflow-hidden rounded-xl border aspect-[3/4]" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <div className="absolute inset-0 bg-[var(--surface-hover)] flex items-center justify-center">
                                    <UserAvatar className="w-24 h-24 opacity-20" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-left">
                                    <h3 className="text-xl font-bold text-white">Team Member {i}</h3>
                                    <p className="text-sm text-gray-300">Co-Founder & Strategist</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

const UserAvatar = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);
