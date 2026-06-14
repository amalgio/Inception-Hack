import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center py-24 text-stone-500 text-sm gap-3">
            <span className="text-2xl">⚠️</span>
            <p className="font-semibold">Something went wrong loading this section.</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="text-xs text-[#ff5500] underline"
            >
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
