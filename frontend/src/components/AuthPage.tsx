import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface AuthPageProps {
  onLogin: () => void;
}

type AuthMode = 'login' | 'signup' | 'verify';

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.every(c => c !== '')) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-info/10 blur-[120px] rounded-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-surface border border-border rounded-none p-6 sm:p-8 relative z-10 shadow-lg"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-accent/10 rounded-none flex items-center justify-center mb-4 border border-accent/20">
            <TrendingDown className="text-accent w-8 h-8" />
          </div>
          <h1 className="font-display text-3xl tracking-[3px] text-accent">PRICEWATCH</h1>
          <p className="text-muted text-sm mt-1">Smart Price Monitoring</p>
        </div>

        {mode === 'verify' ? (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground">Verify your email</h2>
              <p className="text-muted text-sm mt-2">We've sent a 6-digit code to <span className="text-foreground">{email}</span></p>
            </div>

            <div className="flex justify-between gap-1.5 sm:gap-2">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`code-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(idx, e.target.value)}
                  className="w-full aspect-square max-w-[48px] bg-background border border-border rounded-none text-center text-lg sm:text-xl font-bold text-accent outline-none focus:border-accent transition-colors"
                />
              ))}
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-accent text-background rounded-none font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Verify Account
            </button>

            <button 
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-sm text-muted hover:text-foreground transition-colors"
            >
              Back to login
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex bg-background p-1 rounded-none border border-border">
              <button 
                onClick={() => setMode('login')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-none transition-all",
                  mode === 'login' ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground"
                )}
              >
                Login
              </button>
              <button 
                onClick={() => setMode('signup')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-none transition-all",
                  mode === 'signup' ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground"
                )}
              >
                Sign Up
              </button>
            </div>

            <div className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-[11px] text-muted tracking-wider uppercase mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input 
                      className="w-full bg-background border border-border rounded-none text-sm pl-10 pr-4 py-2.5 outline-none focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] text-muted tracking-wider uppercase mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background border border-border rounded-none text-sm pl-10 pr-4 py-2.5 outline-none focus:border-accent transition-colors"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-muted tracking-wider uppercase mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input 
                    type="password"
                    className="w-full bg-background border border-border rounded-none text-sm pl-10 pr-4 py-2.5 outline-none focus:border-accent transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                if (mode === 'login') {
                  onLogin();
                } else {
                  setMode('verify');
                }
              }}
              className="w-full py-3 bg-accent text-background rounded-none font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface px-2 text-muted">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button 
                onClick={onLogin}
                className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-none text-sm hover:bg-surface-hover transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button 
                onClick={onLogin}
                className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-none text-sm hover:bg-surface-hover transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
