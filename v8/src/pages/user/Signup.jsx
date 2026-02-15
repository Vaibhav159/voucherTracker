import { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);

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

    return (
        <div className="bg-theme-bg text-theme-primary font-sans antialiased overflow-x-hidden min-h-screen flex flex-col relative selection:bg-primary/30 selection:text-accent">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-theme-bg via-theme-surface to-theme-bg opacity-80"></div>
                <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] mix-blend-screen"></div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-[440px] flex flex-col gap-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-1">
                        <div className="relative group cursor-default">
                            <div className="absolute inset-0 bg-accent blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                            <div className="relative h-14 w-14 rounded-lg bg-gradient-to-br from-theme-surface to-theme-bg flex items-center justify-center shadow-lg border border-primary/40 ring-1 ring-white/5">
                                <span className="material-symbols-outlined text-accent drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]" style={{ fontSize: '30px' }}>account_balance_wallet</span>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="relative bg-gradient-to-b from-theme-surface/95 to-theme-surface/98 rounded-lg shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(184,115,50,0.15)] border border-primary/30 p-8 sm:p-10 overflow-hidden group/card transition-all duration-700 hover:border-primary/50">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col gap-7">
                            {/* Title */}
                            <div className="text-center space-y-3">
                                <h1 className="font-serif text-3xl sm:text-[2.5rem] text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-warm-white to-copper font-medium tracking-tight drop-shadow-sm pb-1">
                                    Exclusive Access
                                </h1>
                                <p className="text-accent-dim text-xs font-semibold tracking-[0.2em] uppercase opacity-70">
                                    The Elite Indian Credit Community
                                </p>
                            </div>

                            {/* Form */}
                            <form className="flex flex-col gap-5 mt-1" onSubmit={(e) => e.preventDefault()}>
                                {/* Full Name */}
                                <div className="space-y-2 group/field">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-accent-dim ml-1 group-focus-within/field:text-primary transition-colors duration-300" htmlFor="fullname">
                                        Full Name
                                    </label>
                                    <div className="relative group/input">
                                        <input
                                            autoComplete="name"
                                            className="w-full bg-theme-bg border border-primary/20 text-warm-white placeholder-white/10 rounded px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-0 focus:shadow-[0_0_0_1px_#b87332,0_0_20px_-4px_rgba(184,115,50,0.3)] transition-all hover:border-primary/40 font-medium tracking-wide"
                                            id="fullname"
                                            placeholder="e.g. Rahul Verma"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        />
                                        <span className="material-symbols-outlined absolute right-4 top-3.5 text-primary/30 pointer-events-none group-focus-within/input:text-primary transition-colors" style={{ fontSize: '20px' }}>person</span>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2 group/field">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-accent-dim ml-1 group-focus-within/field:text-primary transition-colors duration-300" htmlFor="email">
                                        Email Address
                                    </label>
                                    <div className="relative group/input">
                                        <input
                                            autoComplete="email"
                                            className="w-full bg-theme-bg border border-primary/20 text-warm-white placeholder-white/10 rounded px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-0 focus:shadow-[0_0_0_1px_#b87332,0_0_20px_-4px_rgba(184,115,50,0.3)] transition-all hover:border-primary/40 font-medium tracking-wide"
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <span className="material-symbols-outlined absolute right-4 top-3.5 text-primary/30 pointer-events-none group-focus-within/input:text-primary transition-colors" style={{ fontSize: '20px' }}>mail</span>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2 group/field">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-accent-dim ml-1 group-focus-within/field:text-primary transition-colors duration-300" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative group/input">
                                        <input
                                            autoComplete="new-password"
                                            className="w-full bg-theme-bg border border-primary/20 text-warm-white placeholder-white/10 rounded px-4 py-3.5 pr-10 focus:outline-none focus:border-primary focus:ring-0 focus:shadow-[0_0_0_1px_#b87332,0_0_20px_-4px_rgba(184,115,50,0.3)] transition-all hover:border-primary/40 font-medium tracking-wide"
                                            id="password"
                                            placeholder="Create a strong password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-primary/30 hover:text-accent transition-colors p-1"
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                                                {showPassword ? 'visibility' : 'visibility_off'}
                                            </span>
                                        </button>
                                    </div>

                                    {/* Password Strength */}
                                    {formData.password && (
                                        <div className="flex items-center justify-between mt-2 px-1">
                                            <div className="flex gap-2">
                                                {[0, 1, 2, 3].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-1.5 w-1.5 rounded-full ${level < strength
                                                            ? 'bg-accent shadow-[0_0_6px_rgba(212,175,55,0.6)] border border-accent'
                                                            : 'bg-transparent border border-primary/30'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-accent/80 font-bold uppercase tracking-widest drop-shadow-sm">
                                                {strength > 0 ? strengthLabels[strength - 1] : ''}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2 group/field">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-accent-dim ml-1 group-focus-within/field:text-primary transition-colors duration-300" htmlFor="confirm_password">
                                        Confirm Password
                                    </label>
                                    <div className="relative group/input">
                                        <input
                                            autoComplete="new-password"
                                            className="w-full bg-theme-bg border border-primary/20 text-warm-white placeholder-white/10 rounded px-4 py-3.5 pr-10 focus:outline-none focus:border-primary focus:ring-0 focus:shadow-[0_0_0_1px_#b87332,0_0_20px_-4px_rgba(184,115,50,0.3)] transition-all hover:border-primary/40 font-medium tracking-wide"
                                            id="confirm_password"
                                            placeholder="Repeat password"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full relative overflow-hidden bg-primary text-theme-primary font-bold py-4 px-6 rounded shadow-lg transition-all flex items-center justify-center gap-3 group/btn border border-white/10 hover:border-accent/30 hover:text-theme-primary active:scale-[0.97] active:translate-y-[1px]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-copper to-gold-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                                        <span className="relative z-10 tracking-wide">Request Access</span>
                                        <span className="material-symbols-outlined relative z-10 group-hover/btn:translate-x-1 transition-transform text-theme-primary/80 group-hover/btn:text-theme-primary" style={{ fontSize: '18px' }}>arrow_forward</span>
                                    </button>

                                    <p className="text-center text-[11px] text-accent-dim mt-5 leading-relaxed font-medium">
                                        By proceeding, you acknowledge that membership is subject to approval and agree to our {' '}
                                        <a className="text-accent-dim hover:text-accent underline decoration-primary/30 underline-offset-4 hover:decoration-gold-400/60 transition-colors" href="#">Terms of Service</a>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-accent-dim text-sm font-medium">
                            Already hold a membership? {' '}
                            <a className="relative inline-flex items-center gap-1.5 text-warm-white font-semibold hover:text-accent transition-colors duration-300 ml-1 py-1" href="#">
                                Log In
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            {/* Bottom Gradient */}
            <div className="fixed bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0"></div>
        </div>
    );
}
