import React, { Component } from 'react';

class SectionErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex items-center justify-center min-h-[30vh] px-6 text-center">
          <p className="text-os-muted font-mono text-sm">
            Section failed to load.{' '}
            <button
              type="button"
              onClick={() => this.setState({ error: null })}
              className="text-accent hover:underline"
            >
              Retry
            </button>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default SectionErrorBoundary;
