import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: 'rgba(255, 0, 0, 0.05)',
          border: '1px solid rgba(255, 0, 0, 0.2)',
          borderRadius: '12px',
          margin: '2rem auto',
          maxWidth: '600px',
          color: 'var(--text-primary, #fff)'
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Something went wrong.</h2>
          <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
            We encountered an unexpected error while loading this section.
          </p>
          <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', opacity: 0.7, marginBottom: '1.5rem' }}>
            {this.state.error && this.state.error.toString()}
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
