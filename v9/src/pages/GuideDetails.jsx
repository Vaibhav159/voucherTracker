import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Share2, Bookmark, User, Tag, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

// Simulated Data (In a real app, this would come from an API or shared data file)
const GUIDE_DATA = {
    '1': {
        title: 'Wealth Preservation in Volatile Markets',
        subtitle: 'Strategic allocation assets that hedge against inflation while maintaining liquidity for high-net-worth portfolios.',
        category: 'Wealth Management',
        date: 'Oct 24, 2024',
        readTime: '12 min read',
        author: 'Dr. Alistair Sterling',
        authorRole: 'Chief Economist',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAXnMUh1XAox8jCMF1w6w-HtbIBAkSVhzo9YRxNcuuEKWtUCvi_hkvkWTb8TxiRdD3EqEROLezJzXAZ-GSb-8AQisH20808J_neph3LnmqZFdKgza6SovuTQlfcsyeLBqaihfCmQmelNk6DYA9yFSUm10N51cCZ-QluJ1McbTUp0h4B61x0yTKDeL5ZzcQ-LF4FeOAw-TCfZCykiJoSsxaEZVDXi2tKQ-59y1wpv8ObvjAzVm0_lGxNHHjRFSoYil7Yw-Yz0_UY_U3',
        content: `
            <p>In the current economic climate, the traditional 60/40 portfolio is facing unprecedented challenges. High-net-worth individuals must look beyond conventional equities and bonds to preserve capital.</p>
            
            <h2>The Shift to Alternative Assets</h2>
            <p>Institutional investors have long allocated significant capital to alternative assets—private equity, real estate, hedge funds, and commodities. These asset classes offer lower correlation to public markets, providing a buffer during periods of high volatility.</p>
            
            <blockquote>"True diversification is not about buying more stocks; it's about finding revenue streams that behave differently under stress."</blockquote>
            
            <h3>Liquid Alts: A Viable Compromise?</h3>
            <p>For those seeking liquidity, liquid alternatives offer a middle ground. These mutual funds or ETFs mimic hedge fund strategies but provide daily liquidity. However, investors must be wary of higher fee structures and tracking errors.</p>
            
            <h2>Gold and Digital Gold</h2>
            <p>Gold remains the classic hedge against inflation. With central banks accumulating reserves at record rates, the case for holding 5-10% of a portfolio in gold—whether physical or via Sovereign Gold Bonds (SGBs)—remains strong.</p>
            
            <h2>Conclusion</h2>
            <p>Wealth preservation today requires active management and a willingness to explore non-traditional avenues. It is no longer enough to "set and forget."</p>
        `,
        tags: ['Investment', 'Economy', 'Portfolio']
    },
    '2': {
        title: 'The 2024 Metal Card Hierarchy',
        subtitle: 'From Amex Centurion to Infinia: Ranking the heaviest hitters in the Indian credit card market.',
        category: 'Credit Cards',
        date: 'Oct 22, 2024',
        readTime: '8 min read',
        author: 'Sarah Jenkins',
        authorRole: 'Senior Analyst',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB54RqoRbXM4iXADxc3JTAEY8inrRe_CpAajICKB9dKQ69ZJQRXQTInPN9N0szwIV3pUp55_-EoTJGyC-014brOl6XSLICk29LmFokz32GnZp5s730ZuIlYDhFNXxqH0n6iPbsrMttiZFJsyXrcrLzy_elYHnfr3d9NcqosP3VJS4j4yqq9s89OCE0-YeIaaDZZFwbz0E-HnMUYyjY8yD1YDHR5gkYMSAgUPVRNbKNlcxJxvPL1b7PMjBdbbwrDE3i3cX4xL7hYFoLK',
        content: `
            <p>Metal cards are no longer just a status symbol; they are the gateway to exclusive concierge services, unlimited lounge access, and accelerated reward points.</p>
            <h2>1. American Express Centurion</h2>
            <p>The invite-only "Black Card" remains the undisputed king. With a joining fee that rivals a small car, it offers benefits money literally cannot buy elsewhere.</p>
            <h2>2. Axis Bank Infinia</h2>
            <p>Often called the king of rewards in India, Infinia's 3.3% base reward rate (accelerated up to 33% on SmartBuy) makes it the most mathematically rewarding card for high spenders.</p>
        `,
        tags: ['Credit Cards', 'Luxury', 'Metal']
    }
};

export default function GuideDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [guide, setGuide] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        setIsLoading(true);
        setTimeout(() => {
            const data = GUIDE_DATA[id] || GUIDE_DATA['1']; // Fallback to 1 for demo
            setGuide(data);
            setIsLoading(false);
        }, 500);
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)]"></div>
            </div>
        );
    }

    if (!guide) return <div>Guide not found</div>;

    return (
        <article className="min-h-screen pb-20 bg-[var(--bg)]">
            <SEO title={`${guide.title} | CardPerks Guides`} description={guide.subtitle} />

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed-bg"
                    style={{ backgroundImage: `url(${guide.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-5xl mx-auto">
                    <button
                        onClick={() => navigate('/guides')}
                        className="mb-8 self-start flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={16} /> Back to Guides
                    </button>

                    <div className="space-y-4 animate-fade-in-up">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded bg-[var(--accent)] text-[var(--bg)] text-xs font-bold uppercase tracking-widest">
                                {guide.category}
                            </span>
                            <span className="flex items-center gap-1 text-white/80 text-xs font-medium uppercase tracking-wider">
                                <Calendar size={14} /> {guide.date}
                            </span>
                            <span className="flex items-center gap-1 text-white/80 text-xs font-medium uppercase tracking-wider">
                                <Clock size={14} /> {guide.readTime}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                            {guide.title}
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 font-light max-w-3xl leading-relaxed">
                            {guide.subtitle}
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                                <User size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">{guide.author}</span>
                                <span className="text-xs text-white/60 uppercase tracking-widest">{guide.authorRole}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-3xl mx-auto px-6 md:px-8 -mt-10 relative z-10">
                {/* Actions Bar */}
                <div className="flex justify-between items-center mb-10 py-4 border-y border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-md rounded-xl px-6 shadow-lg">
                    <div className="flex gap-2">
                        {guide.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-alt)] px-2 py-1 rounded">
                                <Tag size={12} /> {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <button className="p-2 rounded hover:bg-[var(--bg-alt)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                            <Bookmark size={20} />
                        </button>
                        <button className="p-2 rounded hover:bg-[var(--bg-alt)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Article Body */}
                <div
                    className="prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed prose-strong:text-[var(--text-primary)] prose-blockquote:border-l-[var(--accent)] prose-blockquote:text-[var(--accent)] prose-blockquote:bg-[var(--bg-alt)] prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
                    dangerouslySetInnerHTML={{ __html: guide.content }}
                />


            </div>
        </article>
    );
}
