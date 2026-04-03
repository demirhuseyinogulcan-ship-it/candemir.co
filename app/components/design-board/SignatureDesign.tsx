"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { 
  SPACING, 
  ANIMATION, 
  COLORS, 
  TYPOGRAPHY,
  fadeUp 
} from "@/app/lib/design-tokens";
import SectionHeader from "@/app/components/ui/SectionHeader";

// ============================================
// SIGNATURE DATA
// ============================================
const GLOW_VARIANTS = [
  {
    label: "Neon Red",
    shadow: "0 0 60px rgba(255, 45, 45, 0.2), inset 0 0 60px rgba(255, 45, 45, 0.03)",
    border: "rgba(255, 45, 45, 0.25)",
  },
  {
    label: "Maroon",
    shadow: "0 0 60px rgba(114, 47, 55, 0.3), inset 0 0 60px rgba(114, 47, 55, 0.05)",
    border: "rgba(114, 47, 55, 0.35)",
  },
  {
    label: "Deep Maroon",
    shadow: "0 0 80px rgba(58, 0, 0, 0.5), inset 0 0 60px rgba(58, 0, 0, 0.1)",
    border: "rgba(92, 26, 26, 0.35)",
  },
];

const ASPECT_RATIOS = [
  { label: "16:9 — Standart", ratio: "16/9", value: "1.78:1", isSignature: false },
  { label: "21:9 — Can Imzasi", ratio: "21/9", value: "2.33:1", isSignature: true },
  { label: "2.39:1 — Anamorphic", ratio: "2.39/1", value: "2.39:1", isSignature: false },
  { label: "4:1 — Banner", ratio: "4/1", value: "4.00:1", isSignature: false },
  { label: "5:1 — Slim Banner", ratio: "5/1", value: "5.00:1", isSignature: false },
];

const GLASS_CARDS = [
  { title: "Web Gelistirme", desc: "Next.js ile uctan uca" },
  { title: "Fotograf", desc: "Fujifilm X-H2S ile sinematik" },
  { title: "3D / WebGL", desc: "React Three Fiber ile interaktif" },
];

// ============================================
// SUB-COMPONENTS
// ============================================
interface SignatureItemProps {
  number: string;
  title: string;
  description: string;
}

function SignatureItem({ number, title, description }: SignatureItemProps) {
  return (
    <motion.div {...fadeUp} style={{ marginBottom: SPACING.heading }}>
      <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:gap-8">
        <span
          className="tracking-[0.5em] uppercase font-mono"
          style={{ 
            fontSize: TYPOGRAPHY.overline.size,
            color: COLORS.ash,
          }}
        >
          {number}
        </span>
        <div>
          <p 
            className="font-medium"
            style={{ fontSize: TYPOGRAPHY.h3.size }}
          >
            {title}
          </p>
          <p
            className="max-w-md leading-relaxed"
            style={{ 
              fontSize: TYPOGRAPHY.small.size,
              color: COLORS.concrete,
              marginTop: "16px",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// CINEMATIC LETTERBOX — Blog style
// Her gorsel dikey olarak siralanir, scroll ile
// viewport'a girince letterbox barlari iner,
// barlar arkasindaki tarih/mekan yazilari ortaya cikar.
// ============================================
const CINEMA_FRAMES = [
  { src: "/images/DSCF0378.JPG", date: "14 Aralik 2024", location: "Kadikoy, Istanbul", caption: "Aksam olunca sokaklar bambaska bir ruha burunuyor. Isiklar yanlisiyla uzanan golgelerin arasinda yurumek, sehrin sessiz tarafini kesfetmek gibi." },
  { src: "/images/DSCF0749.JPG", date: "22 Ocak 2025", location: "Beyoglu, Istanbul", caption: "Istiklal&apos;in kalabaligini birakip yan sokaklara dalinca bambaška bir dunya aciliyor. Duvarlar konusuyor burada." },
  { src: "/images/DSCF1315.JPG", date: "8 Subat 2025", location: "Moda, Istanbul", caption: "Deniz kenarinda soguk bir aksam. Ruzgar sert esiyordu ama isik o kadar guzeldi ki tripodumu kurmak zorunda kaldim." },
  { src: "/images/DSCF1356.JPG", date: "15 Subat 2025", location: "Uskudar, Istanbul", caption: "Kiz Kulesi&apos;nin arkasindaki gun batimi. Her seferinde farkli bir renk paleti cikartiyor gokyuzu." },
  { src: "/images/DSCF2394.JPG", date: "3 Mart 2025", location: "Balat, Istanbul", caption: "Renkli evlerin arasinda kayboldum. Her kose ayri bir fotograf, her pencere ayri bir hikaye anlatiyor." },
  { src: "/images/DSCF3771.JPG", date: "18 Mart 2025", location: "Karakoy, Istanbul", caption: "Gece yuruyusleri en cok burada severim. Sokak lambalari ve islanmis kaldirimlar kusursuz bir yansima olusturuyor." },
];

function CinematicFrame({ frame, index }: { frame: typeof CINEMA_FRAMES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });
  const [barsActive, setBarsActive] = useState(false);

  useEffect(() => {
    if (isInView) {
      // Viewport'a girince kisa bir bekleme sonrasi barlar iner
      const timer = setTimeout(() => setBarsActive(true), 400);
      return () => clearTimeout(timer);
    } else {
      setBarsActive(false);
    }
  }, [isInView]);

  const barPercent = barsActive ? 12 : 0;

  return (
    <div ref={ref}>
      {/* Gorsel + letterbox */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          aspectRatio: "21/9",
          backgroundColor: COLORS.void,
        }}
      >
        {/* Gorsel */}
        <Image
          src={frame.src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="absolute inset-0"
          style={{ objectFit: "cover", objectPosition: "center" }}
          loading="lazy"
        />

        {/* Ust bar arkasindaki metin — bar inmeden once gorunmez, bar inince ortaya cikar */}
        <div
          className="absolute top-0 left-0 right-0 z-[5] flex items-center justify-between pointer-events-none"
          style={{ height: "12%", padding: "0 clamp(12px, 3vw, 24px)" }}
        >
          <motion.span
            className="font-mono uppercase"
            style={{
              fontSize: "clamp(8px, 1.2vw, 11px)",
              color: COLORS.snow,
              letterSpacing: "0.2em",
              textShadow: "0 1px 6px rgba(0,0,0,0.9)",
            }}
            animate={{ opacity: barsActive ? 0.85 : 0 }}
            transition={{ duration: 0.6, delay: barsActive ? 0.8 : 0 }}
          >
            DSCF — {String(index + 1).padStart(2, "0")}/{CINEMA_FRAMES.length}
          </motion.span>
          <motion.span
            className="font-mono"
            style={{
              fontSize: "clamp(8px, 1.1vw, 10px)",
              color: COLORS.snow,
              opacity: 0.6,
              textShadow: "0 1px 6px rgba(0,0,0,0.9)",
            }}
            animate={{ opacity: barsActive ? 0.6 : 0 }}
            transition={{ duration: 0.6, delay: barsActive ? 0.9 : 0 }}
          >
            2.39:1 — Anamorphic
          </motion.span>
        </div>

        {/* Alt bar arkasindaki metin — tarih ve mekan */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[5] flex items-center justify-between pointer-events-none"
          style={{ height: "12%", padding: "0 clamp(12px, 3vw, 24px)" }}
        >
          <motion.span
            className="font-mono"
            style={{
              fontSize: "clamp(8px, 1.1vw, 10px)",
              color: COLORS.lamp.dim,
              textShadow: "0 1px 6px rgba(0,0,0,0.9)",
              letterSpacing: "0.08em",
            }}
            animate={{ opacity: barsActive ? 0.9 : 0 }}
            transition={{ duration: 0.6, delay: barsActive ? 1.0 : 0 }}
          >
            {frame.location}
          </motion.span>
          <motion.span
            className="font-mono"
            style={{
              fontSize: "clamp(7px, 1vw, 9px)",
              color: COLORS.concrete,
              textShadow: "0 1px 6px rgba(0,0,0,0.9)",
            }}
            animate={{ opacity: barsActive ? 0.7 : 0 }}
            transition={{ duration: 0.6, delay: barsActive ? 1.1 : 0 }}
          >
            {frame.date}
          </motion.span>
        </div>

        {/* Ust letterbox bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-[4]"
          style={{ backgroundColor: COLORS.void }}
          animate={{ height: `${barPercent}%` }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Alt letterbox bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-[4]"
          style={{ backgroundColor: COLORS.void }}
          animate={{ height: `${barPercent}%` }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Ince cizgi — sinematik ayrac */}
        <motion.div
          className="absolute left-0 right-0 z-[6] pointer-events-none"
          style={{
            top: "12%",
            height: "1px",
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.lamp.dim}40 20%, ${COLORS.lamp.dim}40 80%, transparent 100%)`,
          }}
          animate={{ opacity: barsActive ? 0.5 : 0 }}
          transition={{ duration: 0.8, delay: barsActive ? 0.6 : 0 }}
        />
        <motion.div
          className="absolute left-0 right-0 z-[6] pointer-events-none"
          style={{
            bottom: "12%",
            height: "1px",
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.lamp.dim}40 20%, ${COLORS.lamp.dim}40 80%, transparent 100%)`,
          }}
          animate={{ opacity: barsActive ? 0.5 : 0 }}
          transition={{ duration: 0.8, delay: barsActive ? 0.6 : 0 }}
        />
      </div>

      {/* Blog yazisi — gorselin altinda */}
      <motion.p
        style={{
          fontSize: TYPOGRAPHY.small.size,
          color: COLORS.concrete,
          lineHeight: 1.7,
          marginTop: "16px",
          maxWidth: "640px",
        }}
        animate={{ opacity: barsActive ? 1 : 0.3 }}
        transition={{ duration: 0.8, delay: barsActive ? 1.2 : 0 }}
      >
        {frame.caption}
      </motion.p>
    </div>
  );
}

function CinematicLetterbox() {
  return (
    <motion.div {...fadeUp}>
      <div className="space-y-16">
        {CINEMA_FRAMES.map((frame, i) => (
          <CinematicFrame key={frame.src} frame={frame} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function SignatureDesign() {
  return (
    <div>
      {/* Section Header */}
      <SectionHeader
        number="04"
        title="Imza Tasarimi"
        description="'Bunu Can yapmis' dedirten 5 imza ozellik. Her biri canli demo olarak asagida."
      />

      {/* 01 — NEFES ALAN BOSLUK */}
      <div style={{ marginBottom: SPACING.section }}>
        <SignatureItem
          number="01"
          title="Nefes Alan Bosluk"
          description="Elemanlar arasi cesurca buyuk bosluklar. Cogu tasarimci yapamiyor — alan israfi sanarlar."
        />

        <motion.div {...fadeUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sikisik */}
            <div
              className="rounded-xl"
              style={{ 
                backgroundColor: COLORS.obsidian,
                padding: "clamp(32px, 4vw, 48px)",
              }}
            >
              <p
                className="tracking-[0.5em] uppercase"
                style={{ 
                  fontSize: "9px",
                  color: COLORS.maroon.neon,
                  marginBottom: SPACING.inner,
                }}
              >
                Klasik / Sikisik
              </p>
              <h3 className="text-2xl font-medium">Can Demir</h3>
              <p style={{ fontSize: TYPOGRAPHY.small.size, color: COLORS.concrete, marginTop: "8px" }}>
                Dijital tasarimci ve gelistirici
              </p>
              <p style={{ fontSize: TYPOGRAPHY.small.size, color: COLORS.concrete, marginTop: "4px" }}>
                Web sitesi, fotograf, 3D
              </p>
              <button
                className="px-5 py-2.5 rounded-lg"
                style={{
                  backgroundColor: COLORS.carbon,
                  color: COLORS.concrete,
                  border: `1px solid ${COLORS.glassBorder}`,
                  fontSize: "12px",
                  marginTop: "16px",
                }}
              >
                Iletisim
              </button>
            </div>

            {/* Nefes alan */}
            <div
              className="rounded-xl"
              style={{ 
                backgroundColor: COLORS.obsidian,
                padding: "clamp(32px, 4vw, 48px)",
              }}
            >
              <p
                className="tracking-[0.5em] uppercase"
                style={{ 
                  fontSize: "9px",
                  color: COLORS.snow,
                  marginBottom: SPACING.inner,
                }}
              >
                Can Imzasi
              </p>

              <h3 className="text-2xl font-medium" style={{ marginTop: SPACING.element }}>Can Demir</h3>

              <p style={{ fontSize: TYPOGRAPHY.small.size, color: COLORS.concrete, marginTop: SPACING.heading }}>
                Dijital tasarimci ve gelistirici
              </p>

              <p style={{ fontSize: TYPOGRAPHY.small.size, color: COLORS.ash, marginTop: SPACING.inner }}>
                Web sitesi, fotograf, 3D
              </p>

              <button
                className="px-5 py-2.5 rounded-lg font-medium transition-all duration-300 hover:bg-[rgba(255,255,255,0.06)]"
                style={{
                  backgroundColor: COLORS.carbon,
                  color: COLORS.snow,
                  border: `1px solid ${COLORS.ash}`,
                  fontSize: "12px",
                  marginTop: SPACING.element,
                }}
              >
                Iletisim
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 02 — ACCENT PULSE */}
      <div style={{ marginBottom: SPACING.section }}>
        <SignatureItem
          number="02"
          title="Accent Pulse"
          description="Etkilesimde ortaya cikan pariltisi. Normal halde gorulmez, hover canlandirir."
        />

        <motion.div {...fadeUp}>
          <div className="flex flex-wrap gap-10 justify-center" style={{ padding: `${SPACING.element} 0` }}>
            {GLOW_VARIANTS.map((item) => (
              <motion.div
                key={item.label}
                className="w-56 h-28 rounded-xl flex items-center justify-center cursor-pointer"
                style={{
                  border: `1px solid ${COLORS.glassBorder}`,
                  backgroundColor: COLORS.carbon,
                }}
                whileHover={{
                  boxShadow: item.shadow,
                  borderColor: item.border,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span style={{ fontSize: "11px", color: COLORS.ash }}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 03 — SINEMATIK CROP */}
      <div style={{ marginBottom: SPACING.section }}>
        <SignatureItem
          number="03"
          title="Sinematik Crop"
          description="Tum gorseller sinema perdesi oraninda. 21:9 genisindan 2.39:1 anamorphic letterbox'a gecis animasyonu."
        />

        <CinematicLetterbox />
      </div>

      {/* 04 — GLASSMORPHISM */}
      <div style={{ marginBottom: SPACING.section }}>
        <SignatureItem
          number="04"
          title="Glassmorphism Kartlar"
          description="Seffaf, buzlu cam efektli kartlar. Arka plan gradient ile derinlik kazanir."
        />

        <motion.div {...fadeUp}>
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              background: `linear-gradient(160deg, ${COLORS.obsidian} 0%, ${COLORS.maroon.dark} 35%, #151525 70%, ${COLORS.obsidian} 100%)`,
              padding: "clamp(40px, 6vw, 80px)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GLASS_CARDS.map((item) => (
                <motion.div
                  key={item.title}
                  className="rounded-lg cursor-pointer"
                  style={{
                    background: COLORS.glassLight,
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${COLORS.glassBorder}`,
                    padding: "clamp(24px, 3vw, 40px)",
                  }}
                  whileHover={{
                    background: "rgba(255, 255, 255, 0.06)",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <h4 className="font-medium" style={{ fontSize: "15px" }}>{item.title}</h4>
                  <p
                    className="leading-relaxed"
                    style={{ 
                      fontSize: TYPOGRAPHY.small.size,
                      color: COLORS.concrete,
                      marginTop: SPACING.inner,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 05 — TIPOGRAFI HERO */}
      <div>
        <SignatureItem
          number="05"
          title="Tipografi Agirlikli Hero"
          description="Gorsel yerine devasa, tok yazilar. Imzanin en guclu parcasi."
        />

        <motion.div {...fadeUp}>
          <div
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: COLORS.obsidian }}
          >
            <div 
              className="min-h-[75vh] flex flex-col justify-center"
              style={{ padding: "clamp(48px, 8vw, 128px)" }}
            >
              <motion.p
                className="tracking-[0.5em] uppercase"
                style={{ 
                  fontSize: TYPOGRAPHY.overline.size,
                  color: COLORS.ash,
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Portfolyo — 2026
              </motion.p>

              <motion.h1
                className="font-normal tracking-tighter"
                style={{ 
                  fontSize: TYPOGRAPHY.display.size,
                  lineHeight: TYPOGRAPHY.display.lineHeight,
                  marginTop: SPACING.heading,
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: ANIMATION.ease }}
                viewport={{ once: true }}
              >
                Can
                <br />
                <span style={{ color: COLORS.concrete }}>Demir</span>
              </motion.h1>

              <motion.p
                className="max-w-lg leading-relaxed"
                style={{ 
                  fontSize: TYPOGRAPHY.body.size,
                  color: COLORS.concrete,
                  marginTop: SPACING.element,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Girdigi ortama can veren.
                Dijital deneyimler, sinematik gorseller
                ve gelecegi sekillendiren teknolojiler.
              </motion.p>

              <motion.div
                className="flex gap-5"
                style={{ marginTop: SPACING.element }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45 }}
                viewport={{ once: true }}
              >
                {/* Primary 3D button */}
                <motion.button
                  className="relative px-8 py-4 rounded-lg font-medium cursor-pointer overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, #8a3a44 0%, ${COLORS.maroon.shirt} 40%, ${COLORS.maroon.warm} 100%)`,
                    color: COLORS.snow,
                    boxShadow: `0 6px 0 ${COLORS.maroon.dark}, 0 8px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`,
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    fontSize: TYPOGRAPHY.small.size,
                  }}
                  whileHover={{ 
                    y: -2,
                    boxShadow: `0 8px 0 ${COLORS.maroon.dark}, 0 12px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)`,
                  }}
                  whileTap={{ 
                    y: 4,
                    boxShadow: `0 2px 0 ${COLORS.maroon.dark}, 0 4px 8px rgba(0,0,0,0.3)`,
                  }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="relative z-10">Birlikte Calisalim</span>
                </motion.button>
                
                {/* Secondary button */}
                <motion.button
                  className="relative px-8 py-4 rounded-lg font-medium cursor-pointer overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, #2a2a2a 0%, ${COLORS.slate} 40%, ${COLORS.carbon} 100%)`,
                    color: COLORS.snow,
                    boxShadow: `0 6px 0 ${COLORS.void}, 0 8px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
                    border: `1px solid ${COLORS.glassBorder}`,
                    fontSize: TYPOGRAPHY.small.size,
                  }}
                  whileHover={{ 
                    y: -2,
                    boxShadow: `0 8px 0 ${COLORS.void}, 0 12px 24px rgba(0,0,0,0.5)`,
                  }}
                  whileTap={{ 
                    y: 4,
                    boxShadow: `0 2px 0 ${COLORS.void}, 0 4px 8px rgba(0,0,0,0.3)`,
                  }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="relative z-10">Projeler</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}