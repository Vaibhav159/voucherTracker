export default function Contact() {
  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-serif mb-4">Get In Touch</h1>
          <p className="text-text-muted text-lg">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-surface-dark border border-[#2C2A28] rounded-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white font-serif">Contact Information</h2>

            {[
              { icon: 'mail', label: 'Email', value: 'support@vouchertracker.com' },
              { icon: 'phone', label: 'Phone', value: '+91 98765 43210' },
              { icon: 'location_on', label: 'Address', value: 'Mumbai, Maharashtra, India' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-[#2C2A28] flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                  <span className="material-symbols-outlined text-copper">{item.icon}</span>
                </div>
                <div>
                  <p className="text-text-muted text-sm font-medium">{item.label}</p>
                  <p className="text-white text-lg">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-[#2C2A28]">
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                  <a key={social} className="w-10 h-10 rounded-lg bg-[#2C2A28] flex items-center justify-center text-text-muted hover:bg-copper hover:text-white transition-colors" href="#">
                    <span className="text-sm font-bold">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-surface-dark border border-[#2C2A28] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white font-serif mb-6">Send a Message</h2>

            <form className="space-y-5">
              <div>
                <label className="block text-text-muted text-sm font-medium mb-2" htmlFor="name">Full Name</label>
                <input className="w-full bg-background-dark border border-[#2C2A28] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper transition-all placeholder-text-muted/50" id="name" placeholder="John Doe" type="text" />
              </div>

              <div>
                <label className="block text-text-muted text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                <input className="w-full bg-background-dark border border-[#2C2A28] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper transition-all placeholder-text-muted/50" id="email" placeholder="john@example.com" type="email" />
              </div>

              <div>
                <label className="block text-text-muted text-sm font-medium mb-2" htmlFor="subject">Subject</label>
                <input className="w-full bg-background-dark border border-[#2C2A28] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper transition-all placeholder-text-muted/50" id="subject" placeholder="How can we help?" type="text" />
              </div>

              <div>
                <label className="block text-text-muted text-sm font-medium mb-2" htmlFor="message">Message</label>
                <textarea className="w-full bg-background-dark border border-[#2C2A28] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-copper focus:ring-1 focus:ring-copper transition-all placeholder-text-muted/50 resize-none" id="message" placeholder="Your message..." rows="5"></textarea>
              </div>

              <button className="w-full bg-copper text-white font-bold py-3 px-6 rounded-lg hover:bg-copper/90 transition-colors shadow-lg shadow-copper/20" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
