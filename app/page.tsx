"use client";

import { useState } from "react";
import HeroSection from "./components/hero/HeroSection";
import IntroOverlay from "./components/hero/IntroOverlay";
import Statement from "./components/sections/Statement";
import Process from "./components/sections/Process";
import Expertise from "./components/sections/Expertise";
import SelectedWork from "./components/sections/SelectedWork";
import ContactCTA from "./components/sections/ContactCTA";
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

      {/* 01 — Statement: Manifestonun genişlemesi */}
      <Statement />

      {/* 02 — Süreç: Scroll-driven process flow */}
      <Process />

      {/* 03 — Uzmanlık: φ-zigzag kartlar */}
      <Expertise />

      {/* 04 — Seçili İşler: Alternating project cards */}
      <SelectedWork />

      {/* 05 — İletişim CTA: Son replik */}
      <ContactCTA />
    </main>
  );
}
