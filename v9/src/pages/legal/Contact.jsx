import { Mail, MessageSquare, Phone, MapPin, Send } from 'lucide-react';
import SEO from '../../components/SEO';

export default function Contact() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Contact Us | CardPerks"
                description="Get in touch with the CardPerks team for support, partnerships, or feedback."
                keywords="contact, support, help, cardperks"
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Contact Info */}
                <div className="space-y-10">
                    <div>
                        <h1 className="text-4xl font-serif font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Get in Touch</h1>
                        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Have a question about a credit card? Need help with our tools? Or just want to say hi? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-6 rounded-xl border transition-all hover:bg-[var(--surface)]" style={{ borderColor: 'var(--border)' }}>
                            <div className="p-3 rounded-lg bg-[var(--surface)] shrink-0">
                                <Mail className="h-6 w-6" style={{ color: 'var(--accent)' }} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Email Support</h3>
                                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>For general inquiries and support.</p>
                                <a href="mailto:support@cardperks.com" className="text-sm font-bold hover:underline" style={{ color: 'var(--accent)' }}>support@cardperks.com</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 rounded-xl border transition-all hover:bg-[var(--surface)]" style={{ borderColor: 'var(--border)' }}>
                            <div className="p-3 rounded-lg bg-[var(--surface)] shrink-0">
                                <MessageSquare className="h-6 w-6" style={{ color: 'var(--accent)' }} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Community Forum</h3>
                                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Join the discussion with other members.</p>
                                <a href="#" className="text-sm font-bold hover:underline" style={{ color: 'var(--accent)' }}>Visit Community &rarr;</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 rounded-xl border transition-all hover:bg-[var(--surface)]" style={{ borderColor: 'var(--border)' }}>
                            <div className="p-3 rounded-lg bg-[var(--surface)] shrink-0">
                                <MapPin className="h-6 w-6" style={{ color: 'var(--accent)' }} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Headquarters</h3>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    123 Financial District,<br />
                                    Cyber City, Gurugram,<br />
                                    Haryana, India 122002
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-[var(--surface)] p-8 md:p-10 rounded-2xl border shadow-xl" style={{ borderColor: 'var(--border)' }}>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Send us a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>First Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Last Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                            <select
                                className="w-full px-4 py-3 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none"
                                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                            >
                                <option>General Inquiry</option>
                                <option>Technical Support</option>
                                <option>Partnership Proposal</option>
                                <option>Feedback</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Message</label>
                            <textarea
                                rows="5"
                                className="w-full px-4 py-3 rounded-lg border bg-[var(--bg)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm shadow-lg hover:brightness-110 transition-all group" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}>
                            <Send size={18} className="transition-transform group-hover:translate-x-1" />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
