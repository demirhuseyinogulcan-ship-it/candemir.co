"use client";

import { useState } from "react";
import ColorPalette from "./components/ColorPalette";
import Typography from "./components/Typography";
import ButtonSystem from "./components/ButtonSystem";
import SignatureDesign from "./components/SignatureDesign";
import Architecture from "./components/Architecture";
import AnimationShowcase from "./components/AnimationShowcase";
import BloodPhysics from "./components/BloodPhysics";
import ChaosProtocol from "./components/ChaosProtocol";
import HeroHeader from "./components/HeroHeader";
import SideNav from "./components/SideNav";
import IntroOverlay from "./components/IntroOverlay";
import Section from "./components/ui/Section";
import Container from "./components/ui/Container";
import Divider from "./components/ui/Divider";
import { COLORS, SPACING } from "./lib/design-tokens";

export default function DesignBoard() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="overflow-hidden" style={{ backgroundColor: COLORS.void }}>
      {/* Intro Overlay — plays once then exits */}
      {!introComplete && <IntroOverlay onComplete={() => setIntroComplete(true)} />}
      {/* Side Navigation — scroll sonrasi sag kenarda belirir */}
      <SideNav />

      {/* Hero — Full viewport */}
      <HeroHeader />

      {/* Transition space from Hero */}
      <div style={{ height: SPACING.hero }} />

      {/* Section 01: COLOR PALETTE */}
      <Section id="renkler" background="void">
        <Container>
          <ColorPalette />
        </Container>
      </Section>

      <Divider variant="gradient" />

      {/* Section 02: TYPOGRAPHY */}
      <Section id="tipografi" background="obsidian">
        <Container>
          <Typography />
        </Container>
      </Section>

      <Divider variant="line" />

      {/* Section 03: BUTTON SYSTEM */}
      <Section id="butonlar" background="carbon">
        <Container>
          <ButtonSystem />
        </Container>
      </Section>

      <Divider variant="gradient" />

      {/* Section 04: SIGNATURE DESIGN */}
      <Section id="imza" background="void">
        <Container>
          <SignatureDesign />
        </Container>
      </Section>

      <Divider variant="line" />

      {/* Section 05: ARCHITECTURE */}
      <Section id="mimari" background="obsidian" spacingBottom="block">
        <Container>
          <Architecture />
        </Container>
      </Section>

      <Divider variant="gradient" />

      {/* Section 06: ANIMATION SHOWCASE */}
      <Section id="animasyonlar" background="void">
        <Container>
          <AnimationShowcase />
        </Container>
      </Section>

      <Divider variant="line" />

      {/* Section 07: BLOOD PHYSICS */}
      <Section id="kan" background="obsidian">
        <Container>
          <BloodPhysics />
        </Container>
      </Section>

      <Divider variant="gradient" />

      {/* Section 08: CHAOS PROTOCOL */}
      <Section id="kaos" background="void">
        <Container>
          <ChaosProtocol />
        </Container>
      </Section>

      {/* Footer */}
      <footer 
        style={{ 
          backgroundColor: COLORS.void,
          borderTop: `1px solid ${COLORS.glassBorder}`,
          paddingTop: SPACING.element,
          paddingBottom: SPACING.element,
        }}
      >
        <Container className="text-center">
          <p
            className="tracking-[0.5em] uppercase"
            style={{ 
              fontSize: "10px",
              color: COLORS.ash,
            }}
          >
            Tasarim tahtasi kesinlestikten sonra site insasi baslar
          </p>
          <p
            style={{ 
              fontSize: "13px",
              color: COLORS.concrete,
              marginTop: SPACING.heading,
            }}
          >
            Can Demir — 2026
          </p>
        </Container>
      </footer>
    </main>
  );
}
