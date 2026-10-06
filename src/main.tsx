import React, { StrictMode, ReactNode, Component, ErrorInfo } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Handle cross-origin "Script error." gracefully from third-party scripts (e.g. Instagram embeds)
if (typeof window !== 'undefined') {
  const originalOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const msgStr = String(message || '');
    if (msgStr === 'Script error.' || msgStr.includes('Script error') || (!source && lineno === 0)) {
      console.warn('Suppressed cross-origin script error:', message);
      return true; // Returning true prevents the browser from firing the global error dialog/handler
    }
    if (typeof originalOnError === 'function') {
      return originalOnError.call(window, message, source, lineno, colno, error);
    }
    return false;
  };

  window.addEventListener(
    'error',
    (event) => {
      const msg = event.message || '';
      if (msg === 'Script error.' || msg.includes('Script error')) {
        console.warn('Suppressed cross-origin script error via event listener:', msg);
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener('unhandledrejection', (event) => {
    const reasonMsg = event.reason?.message || String(event.reason || '');
    if (reasonMsg === 'Script error.' || reasonMsg.includes('Script error')) {
      console.warn('Suppressed unhandled promise rejection script error:', reasonMsg);
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error?.message || error, error?.stack, errorInfo?.componentStack);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const isDev = Boolean(import.meta.env?.DEV) || (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production');
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
          <div className="max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-slate-100 text-left">
            <h2 className="text-xl font-bold text-slate-800 mb-2 text-center">Something went wrong</h2>
            <p className="text-sm text-slate-500 mb-4 text-center">A temporary script issue occurred. Please try reloading the page.</p>

            {isDev && this.state.error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 font-mono text-xs overflow-auto max-h-60">
                <p className="font-bold mb-1">{this.state.error.name}: {this.state.error.message}</p>
                {this.state.error.stack && (
                  <pre className="whitespace-pre-wrap text-[11px] opacity-80 mt-2">{this.state.error.stack}</pre>
                )}
                {this.state.errorInfo?.componentStack && (
                  <pre className="whitespace-pre-wrap text-[11px] opacity-70 mt-2 border-t border-rose-200 pt-2">{this.state.errorInfo.componentStack}</pre>
                )}
              </div>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
              >
                Reload Page
              </button>
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition cursor-pointer"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const container = document.getElementById('root')!;

let preloadedData: any = null;
if (typeof document !== 'undefined') {
  const preloadedScript = document.getElementById('__PRELOADED_DATA__');
  if (preloadedScript && preloadedScript.textContent) {
    try {
      preloadedData = JSON.parse(preloadedScript.textContent);
    } catch (e) {
      console.warn('Failed to parse preloaded data JSON:', e);
    }
  }
}

// In the dev preview (Vite dev server) there is no prerendered markup and no __PRELOADED_DATA__.
// hydrateRoot must ONLY be used when both prerendered DOM elements (firstElementChild)
// and valid __PRELOADED_DATA__ exist. In all other cases (including dev preview), use createRoot.
const hasPrerenderedContent = Boolean(
  container &&
  container.firstElementChild &&
  container.innerHTML.trim() !== '' &&
  preloadedData !== null
);

if (hasPrerenderedContent) {
  try {
    hydrateRoot(
      container,
      <StrictMode>
        <ErrorBoundary>
          <App preloadedData={preloadedData} />
        </ErrorBoundary>
      </StrictMode>,
      {
        onRecoverableError(err, errInfo) {
          console.warn('Hydration recoverable warning (suppressed):', err, errInfo);
        }
      }
    );
  } catch (hydrationErr) {
    console.warn('Hydration failed fatally, falling back to createRoot:', hydrationErr);
    createRoot(container).render(
      <StrictMode>
        <ErrorBoundary>
          <App preloadedData={preloadedData} />
        </ErrorBoundary>
      </StrictMode>
    );
  }
} else {
  createRoot(container).render(
    <StrictMode>
      <ErrorBoundary>
        <App preloadedData={preloadedData} />
      </ErrorBoundary>
    </StrictMode>
  );
}

