/**
 * GuidesHero - Hero banner for the Guides page
 * Matches the Premium Dark Luxe mockup design (Knowledge Vault)
 */
const GuidesHero = () => {
    return (
        <section className="guides-hero">
            {/* Decorative orbs */}
            <div className="guides-hero-orb guides-hero-orb-purple" />
            <div className="guides-hero-orb guides-hero-orb-gold" />

            <div className="guides-hero-content">
                <div className="guides-hero-title-row">
                    <span className="guides-hero-icon">📚</span>
                    <h1 className="guides-hero-title">Knowledge Vault</h1>
                </div>
                <p className="guides-hero-subtitle">
                    Curated guides, threads, and strategies from the community to help you maximize your financial benefits.
                </p>
            </div>

            <style>{`
        .guides-hero {
          background: linear-gradient(135deg, #1a0f1a 0%, #0a0a0a 50%, #0f1a1a 100%);
          padding: 60px 48px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .guides-hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        .guides-hero-orb-purple {
          top: -50px;
          right: 20%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
        }

        .guides-hero-orb-gold {
          bottom: -100px;
          left: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%);
        }

        .guides-hero-content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .guides-hero-title-row {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .guides-hero-icon {
          font-size: 56px;
        }

        .guides-hero-title {
          font-size: 52px;
          font-weight: 400;
          color: var(--accent-gold-light, #e8c49a);
          font-family: var(--font-family-heading, Georgia, serif);
          font-style: italic;
          margin: 0;
        }

        .guides-hero-subtitle {
          font-size: 18px;
          color: var(--text-secondary, #9ca3af);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .guides-hero {
            padding: 40px 24px;
          }

          .guides-hero-title {
            font-size: 36px;
          }

          .guides-hero-icon {
            font-size: 40px;
          }

          .guides-hero-title-row {
            flex-direction: column;
            gap: 8px;
          }
        }

        /* Light Mode */
        [data-theme='light'] .guides-hero {
          background: linear-gradient(135deg, #faf5ff 0%, #f8fafc 50%, #f0fdfa 100%);
        }
      `}</style>
        </section>
    );
};

export default GuidesHero;
