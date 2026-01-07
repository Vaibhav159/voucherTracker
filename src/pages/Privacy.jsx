export default function Privacy() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-5xl mx-auto px-6 py-16 md:px-12 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-serif mb-4">Privacy Policy</h1>
          <p className="text-text-muted text-lg">Last updated: December 2024</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">database</span>
              1. Data Collection
            </h2>
            <p className="text-text-muted leading-relaxed">
              We collect information that you provide directly to us, including your name, email address, and financial preferences. This information is used solely to provide and improve our services.
            </p>
            <div className="bg-surface-dark border border-[#35322c] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Types of Data We Collect:</h3>
              <ul className="space-y-2 text-text-muted">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">check_circle</span>
                  <span>Personal identification information (Name, email address)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">check_circle</span>
                  <span>Credit card preferences and tracking data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">check_circle</span>
                  <span>Usage data and analytics</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">person</span>
              2. How We Use Your Information
            </h2>
            <p className="text-text-muted leading-relaxed">
              We use the information we collect to operate, maintain, and provide you with the features and functionality of the Service, as well as to communicate directly with you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">cookie</span>
              3. Cookies and Tracking
            </h2>
            <p className="text-text-muted leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">security</span>
              4. Data Security
            </h2>
            <p className="text-text-muted leading-relaxed">
              The security of your data is important to us. We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and accidental loss, destruction, or damage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">shield</span>
              5. Your Rights
            </h2>
            <p className="text-text-muted leading-relaxed">
              You have the right to access, update, or delete your personal information at any time. You may also object to processing of your personal information, ask us to restrict processing, or request portability of your personal information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">mail</span>
              6. Contact Us
            </h2>
            <p className="text-text-muted leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-surface-dark border border-[#35322c] rounded-lg p-6">
              <p className="text-white font-medium">Email: privacy@vouchertracker.com</p>
              <p className="text-text-muted mt-2">We will respond to your inquiry within 48 hours.</p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#35322c] text-center">
          <p className="text-text-muted text-sm">
            By using VoucherTracker, you agree to this Privacy Policy. We may update this policy from time to time.
          </p>
        </div>
      </div>
    </div>
  );
}
