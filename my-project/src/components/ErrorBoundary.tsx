
/*
<ai_context>
Minimal React error boundary to avoid blank white screen on runtime errors.
Shows a simple fallback with the error message and a refresh hint.
Used to wrap the entire App.
</ai_context>
*/
import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message?: string };

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : String(error);
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // eslint-disable-next-line no-console
    console.error('App crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
          <h2 style={{ margin: 0, marginBottom: 8 }}>Something went wrong.</h2>
          {this.state.message && (
            <pre
              style={{
                background: '#111827',
                color: '#e5e7eb',
                padding: 12,
                borderRadius: 8,
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
              }}
            >
              {this.state.message}
            </pre>
          )}
          <p style={{ marginTop: 12 }}>Try fixing the error in code or <button onClick={() => location.reload()}>reload</button>.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
