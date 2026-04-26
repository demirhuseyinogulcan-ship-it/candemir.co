"use client";

import { useState } from "react";
import ColorPalette from "@/app/components/design-board/ColorPalette";
import Typography from "@/app/components/design-board/Typography";
import ButtonSystem from "@/app/components/design-board/ButtonSystem";
import SignatureDesign from "@/app/components/design-board/SignatureDesign";
import Architecture from "@/app/components/design-board/Architecture";
import AnimationShowcase from "@/app/components/design-board/AnimationShowcase";
import BloodPhysics from "@/app/components/design-board/BloodPhysics";
import ChaosProtocol from "@/app/components/design-board/ChaosProtocol";
import Section from "@/app/components/ui/Section";
import Container from "@/app/components/ui/Container";
import Divider from "@/app/components/ui/Divider";
import { COLORS, SPACING } from "@/app/lib/design-tokens";

export default function DesignBoardPage() {
  return (
    <main className="overflow-hidden" style={{ backgroundColor: COLORS.void }}>
      {/* Header */}
      <div
        className="text-center"
        style={{
          paddingTop: SPACING.section,
          paddingBottom: SPACING.element,
        }}
      >
        <Container>
          <p
            className="tracking-[0.5em] uppercase"
            style={{ fontSize: "10px", color: COLORS.ash }}
          >
            candemir.co — tasarım tahtası
          </p>
        </Container>
      </div>

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
            style={{ fontSize: "10px", color: COLORS.ash }}
          >
            Tasarım tahtası — dahili kullanım
          </p>
        </Container>
      </footer>
    </main>
  );
}
