export default function Terms() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-5xl mx-auto px-6 py-16 md:px-12 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-serif mb-4">Terms of Service</h1>
          <p className="text-text-muted text-lg">Last updated: December 2024</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif">1. Acceptance of Terms</h2>
            <p className="text-text-muted leading-relaxed">
              By accessing and using VoucherTracker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif">2. Use License</h2>
            <p className="text-text-muted leading-relaxed">
              Permission is granted to temporarily access VoucherTracker for personal, non-commercial use only. This is the grant of a license, not a transfer of title.
            </p>
            <div className="bg-surface-dark border border-[#35322c] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Under this license you may not:</h3>
              <ul className="space-y-2 text-text-muted">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-danger text-sm mt-1">cancel</span>
                  <span>Modify or copy the materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-danger text-sm mt-1">cancel</span>
                  <span>Use the materials for any commercial purpose</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-danger text-sm mt-1">cancel</span>
                  <span>Attempt to reverse engineer any software contained on the website</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif">3. Disclaimer</h2>
            <p className="text-text-muted leading-relaxed">
              The materials on VoucherTracker are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif">4. Limitations</h2>
            <p className="text-text-muted leading-relaxed">
              In no event shall VoucherTracker or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on VoucherTracker.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif">5. Accuracy of Materials</h2>
            <p className="text-text-muted leading-relaxed">
              The materials appearing on VoucherTracker could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif">6. Modifications</h2>
            <p className="text-text-muted leading-relaxed">
              VoucherTracker may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-white font-serif">7. Governing Law</h2>
            <p className="text-text-muted leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#35322c]">
          <div className="bg-surface-dark border border-[#35322c] rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-3">Questions About These Terms?</h3>
            <p className="text-text-muted mb-4">If you have any questions about these Terms of Service, please contact us.</p>
            <a className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium" href="/contact">
              <span className="material-symbols-outlined">mail</span>
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
