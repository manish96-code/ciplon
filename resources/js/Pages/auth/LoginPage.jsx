import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { props } = usePage();
  const companyProfile = props.company || {};
  const [showPassword, setShowPassword] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login', {
      onFinish: () => reset('password'),
    });
  };

  const companyName = companyProfile?.company_name || companyProfile?.name || 'ApexBio Life Sciences';
  const logoUrl = companyProfile?.logo_url || companyProfile?.logoUrl || '';

  return (
    <div className="min-h-screen bg-slate-50/70 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />

      {/* Main Login Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 sm:p-10 ring-1 ring-slate-200/80 relative z-10 space-y-6">
        {/* Company Header */}
        <div className="text-center space-y-3">
          {logoUrl ? (
            <div className="h-10 flex items-center justify-center">
              <img src={logoUrl} alt={companyName} className="h-9 w-auto object-contain" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white flex items-center justify-center font-extrabold text-xl mx-auto">
              A
            </div>
          )}

          <div className="space-y-0.5">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              {companyName}
            </h1>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 block">
              Admin Portal
            </span>
          </div>
        </div>

        {props.flash?.error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-700 text-xs leading-relaxed text-center">
            {props.flash.error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Email
            </label>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="name@company.com"
                autoComplete="email"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs font-medium placeholder-slate-400 focus:outline-none transition-all ${
                  errors.email
                    ? 'bg-rose-50/40 text-slate-900 border border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-500'
                    : 'bg-slate-50/80 text-slate-900 border border-transparent focus:bg-white focus:ring-2 focus:ring-teal-600'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-rose-600 flex items-center gap-1 font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Password
            </label>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium placeholder-slate-400 focus:outline-none transition-all ${
                  errors.password
                    ? 'bg-rose-50/40 text-slate-900 border border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-500'
                    : 'bg-slate-50/80 text-slate-900 border border-transparent focus:bg-white focus:ring-2 focus:ring-teal-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-rose-600 flex items-center gap-1 font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 cursor-pointer"
          >
            {processing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Forgot Password Link Positioned at the Bottom */}
        <div className="text-center pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => alert('Please contact the system administrator to reset your password.')}
            className="text-xs font-medium text-slate-500 hover:text-teal-700 transition-colors cursor-pointer"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}
