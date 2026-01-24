import SEO from '../../components/SEO';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Privacy Policy | CardPerks"
                description="Our commitment to protecting your privacy and personal information."
                keywords="privacy policy, data protection, security"
            />

            <div className="max-w-3xl mx-auto rounded-2xl shadow-xl overflow-hidden border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                {/* Header */}
                <div className="bg-[var(--surface)] p-8 border-b" style={{ borderColor: 'var(--border)' }}>
                    <h1 className="text-3xl font-serif font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Privacy Policy</h1>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Last updated: January 14, 2026</p>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Introduction</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            At CardPerks, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or engage with our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Information We Collect</h2>
                        <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
                            <li><strong>Personal Data:</strong> Name, email address, phone number, and other profile information you provide.</li>
                            <li><strong>Financial Data:</strong> Information about your credit cards and banking preferences (we do NOT store full card numbers).</li>
                            <li><strong>Usage Data:</strong> Information on how you interact with our tools and content.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. How We Use Your Information</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2 text-[var(--text-secondary)]">
                            <li>Provide, maintain, and improve our services.</li>
                            <li>Personalize your experience (e.g., recommend cards based on spending).</li>
                            <li>Send you technical notices, updates, and support messages.</li>
                            <li>Respond to your comments and questions.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Data Security</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Third-Party Websites</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Contact Us</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            If you have questions or comments about this Privacy Policy, please contact us at:
                        </p>
                        <p className="mt-2 font-medium" style={{ color: 'var(--accent)' }}>privacy@cardperks.com</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
