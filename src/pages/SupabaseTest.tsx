/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured, getSupabaseConfigError, sanitizeEnvValue } from '../utils/supabase';
import { ShieldCheck, AlertCircle, CheckCircle2, Loader2, ArrowLeft, RefreshCw, Server, HelpCircle } from 'lucide-react';
import { PageId } from '../types';

interface SupabaseTestProps {
  setCurrentPage: (page: PageId) => void;
}

export default function SupabaseTest({ setCurrentPage }: SupabaseTestProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorObj, setErrorObj] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setDiagnosticLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const runTest = async () => {
    setLoading(true);
    setStatus('idle');
    setErrorMsg(null);
    setErrorObj(null);
    setSessionData(null);
    setDiagnosticLogs([]);

    addLog('Starting Supabase diagnostic check...');

    // 1. Check Configuration
    const rawUrl = import.meta.env.VITE_SUPABASE_URL;
    const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const url = sanitizeEnvValue(rawUrl);
    const key = sanitizeEnvValue(rawKey);
    const isConfig = isSupabaseConfigured();
    const configErr = getSupabaseConfigError();

    addLog(`Raw URL: ${rawUrl ? 'Defined' : 'Undefined'}`);
    addLog(`Raw Key: ${rawKey ? 'Defined' : 'Undefined'}`);
    addLog(`Sanitized URL: ${url ? 'Defined' : 'Undefined'}`);
    addLog(`Sanitized Key: ${key ? 'Defined' : 'Undefined'}`);
    addLog(`Is Supabase Configured helper: ${isConfig}`);
    if (configErr) {
      addLog(`❌ Configuration Error: ${configErr}`);
      setErrorMsg(`Configuration Error: ${configErr}`);
      setStatus('error');
      setLoading(false);
      return;
    }

    addLog('Configuration is valid. Initializing client and calling auth.getSession()...');

    try {
      const client = supabase.client;
      if (!client) {
        throw new Error('Supabase client was undefined after initialization.');
      }

      addLog(`Client endpoint: ${(client as any).supabaseUrl}`);
      
      // Call getSession() as requested by the user
      addLog('Invoking client.auth.getSession()...');
      const { data, error } = await client.auth.getSession();

      if (error) {
        addLog(`❌ auth.getSession() returned an error: ${error.message}`);
        throw error;
      }

      addLog('✅ client.auth.getSession() completed successfully!');
      setSessionData(data);
      setStatus('success');
    } catch (err: any) {
      console.error('[Supabase Test] Diagnostic failure:', err);
      const msg = err?.message || err?.error_description || String(err);
      addLog(`❌ Caught Exception: ${msg}`);
      
      setErrorMsg(msg);
      setErrorObj(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation / Header */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
          <button
            onClick={() => {
              window.location.hash = 'admin/login';
              setCurrentPage('admin/login');
            }}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Admin Login
          </button>
          
          <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-500/20">
            <Server className="h-3.5 w-3.5" />
            Isolated Diagnostic Route: #/supabase-test
          </div>
        </div>

        {/* Brand / Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Supabase Connection Diagnostic
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-lg mx-auto">
            This utility executes <code className="text-indigo-300 bg-indigo-950/40 px-1 py-0.5 rounded font-mono">auth.getSession()</code> on mount to isolate and verify the Supabase integration.
          </p>
        </div>

        {/* Main Status Cards */}
        <div className="space-y-6">
          
          {/* Diagnostic Result */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/60 p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                Test Result
              </h2>
              <button
                onClick={runTest}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-xs font-medium text-white rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                Re-Run Test
              </button>
            </div>

            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <Loader2 className="h-10 w-10 text-indigo-400 animate-spin mb-4" />
                <p className="text-sm font-medium text-slate-300">Contacting Supabase API...</p>
                <p className="text-xs text-slate-500 mt-1">Executing fetch request to auth endpoints</p>
              </div>
            ) : status === 'success' ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-400 text-sm">Success! Request Completed</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    The Supabase client successfully established a connection and received a response from the authorization service.
                  </p>
                  
                  {/* Session data display */}
                  <div className="mt-4 bg-slate-900/60 rounded-lg p-3 border border-slate-800 font-mono text-[11px] text-slate-400 max-h-40 overflow-y-auto">
                    <span className="text-emerald-500">Session status: </span> 
                    {sessionData?.session ? 'Authenticated' : 'No active session (Guest)'}
                    <pre className="mt-2 text-slate-300">
                      {JSON.stringify(sessionData || { message: 'Response contains empty session' }, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            ) : status === 'error' ? (
              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-5 flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-rose-400 text-sm">Request Failed</h3>
                    <p className="text-xs text-rose-200 font-medium mt-1">
                      {errorMsg}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      This usually indicates that the client was unable to perform a <code className="text-indigo-300 font-mono">fetch</code> call to the configured Supabase URL. Verify your VITE_SUPABASE_URL is correct and the project is active.
                    </p>
                  </div>
                </div>

                {/* Technical details block */}
                {errorObj && (
                  <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-4 font-mono text-[11px] text-rose-300 overflow-x-auto">
                    <p className="font-bold text-slate-400 border-b border-slate-800 pb-2 mb-2">Detailed Error Object:</p>
                    <pre>{JSON.stringify(
                      {
                        name: errorObj.name || 'Error',
                        message: errorObj.message || 'No message provided',
                        status: errorObj.status || 'No status code',
                        stack: errorObj.stack ? errorObj.stack.split('\n').slice(0, 5).join('\n') : undefined,
                        ...errorObj
                      },
                      null,
                      2
                    )}</pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                Press "Re-Run Test" to execute.
              </div>
            )}
          </div>

          {/* Diagnostic Step-by-Step Logs */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/60 p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-white mb-3">
              Diagnostic Logs
            </h2>
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-[11px] text-slate-300 space-y-1.5 border border-slate-800 h-64 overflow-y-auto">
              {diagnosticLogs.map((log, idx) => {
                let color = 'text-slate-300';
                if (log.includes('❌')) color = 'text-rose-400 font-semibold';
                if (log.includes('✅')) color = 'text-emerald-400 font-semibold';
                return (
                  <div key={idx} className={color}>
                    {log}
                  </div>
                );
              })}
              {diagnosticLogs.length === 0 && (
                <div className="text-slate-600 text-center py-12">No logs generated.</div>
              )}
            </div>
          </div>

          {/* Quick Troubleshooting Guide */}
          <div className="bg-slate-800/35 rounded-2xl border border-slate-800 p-6">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-slate-400" />
              Connection Troubleshooting Tips
            </h3>
            <ul className="text-xs text-slate-400 space-y-2 list-disc pl-5">
              <li>
                <strong className="text-slate-300">"Failed to fetch"</strong>: This means the browser could not send the HTTP request to the Supabase endpoint. Check if the domain name is completely correct (no extra subdomains, typos, or local IPs).
              </li>
              <li>
                <strong className="text-slate-300">Quotes & Whitespace</strong>: Ensure that when pasting keys in your Settings, you did not copy surrounding quotes (<code className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded font-mono">"</code> or <code className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded font-mono">'</code>) or trailing whitespaces/newlines.
              </li>
              <li>
                <strong className="text-slate-300">Active Status</strong>: Log into your Supabase Dashboard to confirm that your project is active and has not been paused due to inactivity.
              </li>
              <li>
                <strong className="text-slate-300">Anon Key JWT</strong>: The public/anon key should be a long string starting with <code className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded font-mono">eyJ</code>. If it is shorter or has a different format, you might have copied the wrong key (e.g. service_role key or DB password).
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
