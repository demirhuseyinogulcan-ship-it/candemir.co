"use client";

import { useState } from "react";
import HeroSection from "./components/hero/HeroSection";
import IntroOverlay from "./components/hero/IntroOverlay";
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

      {/* 01 — Süreç: Interactive file tree system */}
      <Process />

      {/* 02 — Uzmanlık: φ-zigzag kartlar */}
      <Expertise />

      {/* 03 — Seçili İşler: Alternating project cards */}
      <SelectedWork />

      {/* 04 — İletişim CTA: Son replik */}
      <ContactCTA />
    </main>
  );
}
