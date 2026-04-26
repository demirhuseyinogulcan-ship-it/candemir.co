"use client";

import { useState, useSyncExternalStore } from "react";
import HeroSection from "@/app/components/hero/HeroSection";
import IntroOverlay from "@/app/components/hero/IntroOverlay";
import Process from "@/app/components/sections/Process";
import Expertise from "@/app/components/sections/Expertise";
import SelectedWork from "@/app/components/sections/SelectedWork";
import ContactCTA from "@/app/components/sections/ContactCTA";
import { COLORS } from "@/app/lib/design-tokens";

const INTRO_FLAG = "candemir.intro.played";

/**
 * sessionStorage'dan intro durumunu oku — SSR-safe.
 * Server snapshot her zaman "false" (oynamadı) döner; bu sayede
 * ilk ziyarette server-rendered HTML overlay'i ÇALIŞTIRMAYA hazırdır.
 * Sekme içi gezinmede client zaten true alır → overlay basılmaz.
 */
function getPlayedClient(): boolean {
  try {
    return sessionStorage.getItem(INTRO_FLAG) === "1";
  } catch {
    return false;
  }
}
const subscribeNoop = () => () => {};

export default function HomePage() {
  /**
   * useSyncExternalStore: sessionStorage'ı external store gibi okur.
   * - İlk ziyaret (storage boş): false → overlay çalar
   * - Sekme içi gezinme (storage "1"): true → overlay atlanır
   */
  const persistedPlayed = useSyncExternalStore(
    subscribeNoop,
    getPlayedClient,
    () => false
  );
  const [dismissed, setDismissed] = useState(false);
  const showIntro = !persistedPlayed && !dismissed;

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem(INTRO_FLAG, "1");
    } catch {
      /* private mode / quota — sessizce geç */
    }
    setDismissed(true);
  };

  return (
    <main className="overflow-hidden" style={{ backgroundColor: COLORS.void }}>
      {/* Intro Overlay — sadece ilk ziyarette (sessionStorage gate) */}
      {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}

      {/* Hero — Full viewport */}
      <HeroSection />

      {/* ~/candemir/process/ — Interactive file tree system */}
      <Process />

      {/* ~/candemir/expertise/ — Bento kart grid */}
      <Expertise />

      {/* ~/candemir/work/ — Seçili İşler */}
      <SelectedWork />

      {/* ~/candemir/signal/ — İletişim CTA */}
      <ContactCTA />
    </main>
  );
}
