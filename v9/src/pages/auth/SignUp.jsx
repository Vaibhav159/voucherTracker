import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { ArrowRight, Wallet, User, Mail, Lock, Eye, EyeOff, Check, X } from 'lucide-react';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    // Password strength logic
    const getPasswordStrength = () => {
        const { password } = formData;
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const strengthLabels = ['Weak', 'Fair', 'Medium', 'Strong'];
    const strength = getPasswordStrength();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock signup - in a real app this would hit an API
        console.log('Signing up with:', formData);

        // Simulate loading then navigate
        setTimeout(() => {
            navigate('/profile');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Request Access | CardPerks"
                description="Join the elite community of credit card enthusiasts. Track rewards, milestones, and optimize your spending."
                keywords="sign up, register, cardperks, credit card community"
            />

            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen opacity-10 animate-pulse" style={{ backgroundColor: 'var(--accent)' }}></div>
                <div className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-screen opacity-5" style={{ backgroundColor: 'var(--primary)' }}></div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-[440px] flex flex-col gap-8">
                    {/* Logo & Header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] shadow-xl border border-[var(--border)] mb-4 ring-1 ring-white/5">
                            <Wallet className="h-8 w-8" style={{ color: 'var(--accent)' }} />
                        </div>
                        <h1 className="font-serif text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            Exclusive Access
                        </h1>
                        <p className="text-sm uppercase tracking-widest font-bold opacity-70" style={{ color: 'var(--text-secondary)' }}>
                            The Elite Indian Credit Community
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="relative rounded-2xl shadow-2xl p-8 sm:p-10 border group transition-all duration-500 hover:border-[var(--accent)]/30" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>

                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div className="space-y-1.5 group/field">
                                <label className="text-[10px] font-bold uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-[var(--accent)]" style={{ color: 'var(--text-secondary)' }} htmlFor="fullname">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        autoComplete="name"
                                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3.5 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all font-medium tracking-wide placeholder:opacity-30"
                                        style={{ color: 'var(--text-primary)' }}
                                        id="fullname"
                                        placeholder="e.g. Rahul Verma"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                    <User className="absolute right-4 top-3.5 h-5 w-5 opacity-30 pointer-events-none" style={{ color: 'var(--text-primary)' }} />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5 group/field">
                                <label className="text-[10px] font-bold uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-[var(--accent)]" style={{ color: 'var(--text-secondary)' }} htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        autoComplete="email"
                                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3.5 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all font-medium tracking-wide placeholder:opacity-30"
                                        style={{ color: 'var(--text-primary)' }}
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <Mail className="absolute right-4 top-3.5 h-5 w-5 opacity-30 pointer-events-none" style={{ color: 'var(--text-primary)' }} />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5 group/field">
                                <label className="text-[10px] font-bold uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-[var(--accent)]" style={{ color: 'var(--text-secondary)' }} htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        autoComplete="new-password"
                                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3.5 pr-12 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all font-medium tracking-wide placeholder:opacity-30"
                                        style={{ color: 'var(--text-primary)' }}
                                        id="password"
                                        placeholder="••••••••"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 p-1 transition-colors hover:text-[var(--accent)]"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="flex items-center justify-between mt-2 px-1">
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2, 3].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`h-1.5 w-6 rounded-full transition-all duration-300 ${level < strength
                                                        ? 'opacity-100 shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]'
                                                        : 'opacity-20'
                                                        }`}
                                                    style={{ backgroundColor: level < strength ? 'var(--accent)' : 'var(--text-muted)' }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80" style={{ color: 'var(--accent)' }}>
                                            {strength > 0 ? strengthLabels[strength - 1] : ''}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5 group/field">
                                <label className="text-[10px] font-bold uppercase tracking-widest ml-1 transition-colors group-focus-within/field:text-[var(--accent)]" style={{ color: 'var(--text-secondary)' }} htmlFor="confirm_password">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        autoComplete="new-password"
                                        className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3.5 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all font-medium tracking-wide placeholder:opacity-30"
                                        style={{ color: 'var(--text-primary)' }}
                                        id="confirm_password"
                                        placeholder="••••••••"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                        <Check className="absolute right-4 top-3.5 h-5 w-5 text-green-500 pointer-events-none" />
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full relative overflow-hidden font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group hover:translate-y-[-1px] active:translate-y-[1px]"
                                    style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                                >
                                    <span className="relative z-10 tracking-widest uppercase text-xs">Request Access</span>
                                    <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
                            <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                                Already hold a membership? {' '}
                                <Link to="/login" className="font-bold underline underline-offset-4 decoration-current transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}>
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-[10px] uppercase tracking-widest opacity-50" style={{ color: 'var(--text-secondary)' }}>
                        By proceeding, you agree to our <Link to="/terms" className="hover:text-[var(--accent)] underline">Terms</Link> & <Link to="/privacy" className="hover:text-[var(--accent)] underline">Privacy Policy</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
