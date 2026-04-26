"use client";

import { Component } from "react";
import { COLORS, TYPOGRAPHY, SPACING } from "@/app/lib/design-tokens";

/* ═══════════════════════════════════════════════════════════════
   Error Boundary — Graceful crash recovery
   
   React Error Boundary (class component — required by React).
   Sinematik hata mesajı, terminal estetiğiyle.
   ═══════════════════════════════════════════════════════════════ */

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex items-center justify-center"
          style={{
            minHeight: "100vh",
            backgroundColor: COLORS.void,
            padding: SPACING.section,
          }}
        >
          <div className="text-center">
            <p
              className="font-mono"
              style={{
                fontSize: "clamp(10px, 1.2vw, 12px)",
                color: COLORS.ash,
                letterSpacing: "0.2em",
                marginBottom: "16px",
              }}
            >
              $ error — unexpected fault
            </p>
            <h1
              style={{
                ...TYPOGRAPHY.h2,
                color: COLORS.chalk,
                margin: 0,
                marginBottom: SPACING.heading,
              }}
            >
              Bir şeyler ters gitti.
            </h1>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="font-mono uppercase cursor-pointer bg-transparent border-none outline-none"
              style={{
                fontSize: "11px",
                color: COLORS.snow,
                letterSpacing: "0.2em",
                padding: "12px 24px",
                border: `1px solid ${COLORS.glassBorder}`,
                borderRadius: "2px",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.snow;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.glassBorder;
              }}
            >
              Tekrar dene
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
