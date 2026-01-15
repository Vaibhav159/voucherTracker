import SEO from '../../components/SEO';

export default function TermsOfService() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Terms of Service | CardPerks"
                description="Terms and conditions for using CardPerks services."
                keywords="terms, conditions, cardperks, user agreement"
            />

            <div className="max-w-3xl mx-auto rounded-2xl shadow-xl overflow-hidden border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                {/* Header */}
                <div className="bg-[var(--surface)] p-8 border-b" style={{ borderColor: 'var(--border)' }}>
                    <h1 className="text-3xl font-serif font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Terms of Service</h1>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Last updated: January 14, 2026</p>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Acceptance of Terms</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            By accessing or using the CardPerks website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Use License</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            Permission is granted to temporarily download one copy of the materials (information or software) on CardPerks' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. Disclaimer</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            The materials on CardPerks' website are provided on an 'as is' basis. CardPerks makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Limitations</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            In no event shall CardPerks or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CardPerks' website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Financial Advice</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            The content provided on CardPerks, including credit card comparisons, reward valuations, and financial tools, is for informational purposes only. It does not constitute financial advice. You should consult with a qualified financial advisor before making any financial decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Governing Law</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>7. Contact Info</h2>
                        <p className="leading-relaxed text-[var(--text-secondary)]">
                            Questions about the Terms of Service should be sent to us at:
                        </p>
                        <p className="mt-2 font-medium" style={{ color: 'var(--accent)' }}>legal@cardperks.com</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
