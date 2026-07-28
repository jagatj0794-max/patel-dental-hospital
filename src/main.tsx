import React, { StrictMode, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
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
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  props: ErrorBoundaryProps;
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
          <div className="max-w-md bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-500 mb-6">A temporary script issue occurred. Please try reloading the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

