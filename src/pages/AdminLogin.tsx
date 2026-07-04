/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Mail, ArrowLeft, AlertCircle, CheckCircle2, Loader2, Eye, EyeOff } from 'lucide-react';
import { PageId } from '../types';
import { supabase, isSupabaseConfigured, sanitizeEnvValue, getSupabaseConfigError } from '../utils/supabase';

interface AdminLoginProps {
  setCurrentPage: (page: PageId) => void;
  session: any;
}

export default function AdminLogin({ setCurrentPage, session }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Helper to safely mask and format values for logging
  const getMaskedValue = (val: string | undefined, isUrl = false) => {
    if (!val) return 'undefined/empty';
    const trimmed = val.trim();
    if (isUrl) {
      try {
        const url = new URL(trimmed);
        return `${url.protocol}//${url.hostname.substring(0, 3)}***${url.hostname.substring(url.hostname.lastIndexOf('.'))}`;
      } catch {
        return `${trimmed.substring(0, Math.min(15, trimmed.length))}... (invalid URL)`;
      }
    }
    if (trimmed.length <= 12) return '*** (too short)';
    return `${trimmed.substring(0, 6)}...${trimmed.substring(trimmed.length - 6)} (len: ${trimmed.length})`;
  };

  // Log connection info when component mounts to help user debug
  useEffect(() => {
    const rawUrl = import.meta.env.VITE_SUPABASE_URL;
    const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const url = sanitizeEnvValue(rawUrl);
    const key = sanitizeEnvValue(rawKey);
    const isConfigured = isSupabaseConfigured();
    const configError = getSupabaseConfigError();

    console.log('%c🔍 SUPABASE CONNECTION DIAGNOSTICS 🔍', 'background: #0f172a; color: #38bdf8; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
    console.log('1. RAW VITE_SUPABASE_URL:', getMaskedValue(rawUrl, true));
    console.log('2. RAW VITE_SUPABASE_ANON_KEY:', getMaskedValue(rawKey));
    console.log('3. SANITIZED URL:', getMaskedValue(url, true));
    console.log('4. SANITIZED KEY:', getMaskedValue(key));
    console.log('5. Is Configured helper:', isConfigured);
    console.log('5b. Config Error description:', configError || 'None (valid configuration)');
    
    if (url) {
      console.log('6. URL starts with "https://":', url.startsWith('https://'));
      console.log('7. Has trailing/leading spaces:', url.endsWith(' ') || url.startsWith(' '));
      console.log('8. Wrapped in quotes:', url.startsWith('"') || url.endsWith('"') || url.startsWith("'") || url.endsWith("'"));
    }
    if (key) {
      console.log('9. Key starts with "eyJ":', key.startsWith('eyJ'));
      console.log('10. Key has trailing/leading spaces:', key.endsWith(' ') || key.startsWith(' '));
      console.log('11. Key wrapped in quotes:', key.startsWith('"') || key.endsWith('"') || key.startsWith("'") || key.endsWith("'"));
    }

    try {
      const client = supabase.client;
      console.log('12. Supabase client initialized successfully:', !!client);
      console.log('13. Client endpoint:', (client as any).supabaseUrl);
    } catch (err) {
      console.error('❌ Supabase client initialization failed:', err);
    }
    console.log('%c----------------------------------------', 'color: #38bdf8;');
  }, []);

  // If already logged in, redirect to admin immediately
  useEffect(() => {
    if (session) {
      setCurrentPage('admin');
      window.location.hash = 'admin';
    }
  }, [session, setCurrentPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const configError = getSupabaseConfigError();
    if (configError) {
      setErrorMsg(`Configuration Error: ${configError}`);
      return;
    }

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const client = supabase.client;
      console.log('[Supabase Auth] Attempting sign in with email:', email);
      console.log('[Supabase Auth] Executing auth.signInWithPassword with client at URL:', (client as any).supabaseUrl);

      console.log("=== LOGIN DEBUG START ===");
      console.log("typeof supabase =", typeof supabase);
      console.log("supabase =", supabase);

      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('[Supabase Auth] Authentication service returned an error:', error);
        throw error;
      }

      console.log('[Supabase Auth] Authentication succeeded! Session acquired:', !!data.session);

      if (data.session) {
        setSuccessMsg('Login successful! Loading administrator workspace...');
        setTimeout(() => {
          setCurrentPage('admin');
          window.location.hash = 'admin';
        }, 1200);
      }
    } catch (err: any) {
      console.group('%c❌ Supabase Sign In Failed ❌', 'background: #f43f5e; color: white; font-weight: bold; padding: 4px;');
      console.error('Error Object:', err);
      console.error('Error Message:', err.message);
      console.error('Error Status:', err.status);
      console.error('Full stack trace:', err.stack);
      console.groupEnd();

      let errMsg = err.message || 'An error occurred during authentication.';
      if (errMsg.includes('Failed to fetch') || errMsg.includes('fetch')) {
        errMsg = `Failed to connect to the authentication server (Failed to fetch). \n\nDetailed error message: "${err.message || 'No message'}". \n\nPlease make sure your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correctly entered in your Environment Secrets (e.g. they should not contain spaces, quotes, or newlines) and your Supabase project is active (not paused).`;
      }
      setErrorMsg(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSite = () => {
    setCurrentPage('home');
    window.location.hash = 'home';
  };

  return (
    <div id="admin-login-container" className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative px-4 py-12">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-cyan/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-brand-teal/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative z-10"
      >
        {/* Header styling */}
        <div className="bg-brand-navy p-8 text-center relative">
          <div className="absolute top-4 left-4">
            <button
              onClick={handleBackToSite}
              className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-1 text-xs font-semibold cursor-pointer"
              id="back-to-site-btn"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          </div>

          <div className="mx-auto h-12 w-12 rounded-xl bg-brand-cyan/15 flex items-center justify-center text-brand-cyan mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <h1 className="text-xl font-display font-bold text-white tracking-wide">
            Patel Dental Hospital
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Clinical Administration Access
          </p>
        </div>

        {/* Form area */}
        <div className="p-8">
          {/* Feedback alerts */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-5 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs flex items-start space-x-2.5"
            >
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-5 p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs flex items-start space-x-2.5"
            >
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="admin@pateldental.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-cyan focus:bg-white text-sm rounded-xl outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-cyan focus:bg-white text-sm rounded-xl outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-brand-navy hover:bg-brand-slate text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Authenticate Security Access</span>
              )}
            </button>
          </form>

          {/* Quick Notice about newly provisioned Supabase DB */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              🔑 Secure clinical administration panel. Only registered administrator credentials are authorized to log in.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
