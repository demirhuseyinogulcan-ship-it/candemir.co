"use client";

import { useState } from "react";
import HeroSection from "@/app/components/hero/HeroSection";
import IntroOverlay from "@/app/components/hero/IntroOverlay";
import Process from "@/app/components/sections/Process";
import Expertise from "@/app/components/sections/Expertise";
import SelectedWork from "@/app/components/sections/SelectedWork";
import ContactCTA from "@/app/components/sections/ContactCTA";
import { COLORS } from "@/app/lib/design-tokens";

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

      {/* ~/candemir/process/ — Interactive file tree system */}
      <Process />

      {/* ~/candemir/expertise/ — φ-zigzag kartlar */}
      <Expertise />

      {/* ~/candemir/work/ — Seçili İşler */}
      <SelectedWork />

      {/* ~/candemir/signal/ — İletişim CTA */}
      <ContactCTA />
    </main>
  );
}
