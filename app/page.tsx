"use client";

import { useState } from "react";
import HeroSection from "./components/hero/HeroSection";
import IntroOverlay from "./components/hero/IntroOverlay";
import { COLORS } from "./lib/design-tokens";

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="overflow-hidden" style={{ backgroundColor: COLORS.void }}>
      {/* Intro Overlay — plays once then exits */}
      {!introComplete && (
        <IntroOverlay onComplete={() => setIntroComplete(true)} />
      )}

      {/* Hero — Full viewport */}
      <HeroSection />
    </main>
  );
}
