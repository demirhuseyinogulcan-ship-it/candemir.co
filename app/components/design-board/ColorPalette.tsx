"use client";

import { motion } from "framer-motion";
import { 
  SPACING, 
  ANIMATION, 
  COLORS, 
  TYPOGRAPHY,
  GLOW,
  fadeUp, 
  staggerItem 
} from "@/app/lib/design-tokens";
import SectionHeader from "@/app/components/ui/SectionHeader";

// ============================================
// COLOR DATA ÔÇö Sinematik + Gece Sokak Foto─şraf├ğ─▒l─▒─ş─▒
// ============================================

// %60 ÔÇö Zemin Renkleri
const GROUNDS = [
  { name: "Void Black", hex: "#050505", usage: "Ana arka plan", ratio: "60%" },
  { name: "Deep Obsidian", hex: "#0A0A0A", usage: "Section arka plan", ratio: "" },
  { name: "Carbon", hex: "#111111", usage: "Kart / surface", ratio: "" },
  { name: "Slate", hex: "#1A1A1A", usage: "Hover state", ratio: "" },
] as const;

// %30 ÔÇö Metin & Beyaz Sistemi
const TEXT_COLORS = [
  { name: "Chalk", hex: "#FAFAFA", usage: "Ba┼şl─▒klar, hero text", contrast: "19.3:1" },
  { name: "Snow", hex: "#F0F0F0", usage: "Ana metin, body text", contrast: "17.4:1" },
  { name: "Mist", hex: "#E0E0E0", usage: "Pasif metin, placeholder", contrast: "14.0:1" },
  { name: "Concrete", hex: "#777777", usage: "Ikincil metin", contrast: "6.2:1" },
  { name: "Ash", hex: "#444444", usage: "Tersiyer metin, etiketler", contrast: "3.2:1" },
] as const;

// Alt─▒n Kurallar ÔÇö Tasar─▒m Matemati─şi
const GOLDEN_RULES = [
  { rule: "Ana metin pozisyonu", value: "Viewport %33 (1/3)", source: "Rule of Thirds" },
  { rule: "Ba┼şl─▒k / alt yaz─▒ oran─▒", value: "\u03C6\u00B3 \u2248 4.24:1", source: "Alt\u0131n Oran" },
  { rule: "Bo\u015Fluk oran\u0131", value: "%60-70 bo\u015F, %30-40 i\u00E7erik", source: "Swiss Design" },
  { rule: "Overlay opacity", value: "%70-80 karanl\u0131k", source: "Film Grading" },
  { rule: "Tipografi a\u011F\u0131rl\u0131\u011F\u0131", value: "Max 2 weight (300 + 400)", source: "Editorial Design" },
  { rule: "Renk say\u0131s\u0131", value: "Max 2 (beyaz + 1 accent)", source: "Luxury Branding" },
] as const;

// %10 ÔÇö Accent: Sokak Lambas─▒ (Birincil)
const LAMP_COLORS = [
  { name: "Lamp Bright", hex: "#FFB800", usage: "Ana CTA, kritik vurgular" },
  { name: "Lamp Warm", hex: "#FF9F1C", usage: "Hover states, s─▒cak ge├ği┼şler" },
  { name: "Lamp Glow", hex: "#FFAA00", usage: "Glow efektleri" },
  { name: "Lamp Dim", hex: "#CC9200", usage: "Subtle vurgular, scrollbar" },
] as const;

// %10 ÔÇö Accent: Kan (─░kincil ÔÇö Dramatik)
const MAROON_COLORS = [
  { name: "Neon Red", hex: "#FF2D2D", usage: "Danger, error states" },
  { name: "Dark Maroon", hex: "#3A0000", usage: "Gradient base, g├Âlgeler" },
  { name: "Maroon Warm", hex: "#5C1A1A", usage: "Glassmorphism overlay" },
  { name: "Maroon Shirt", hex: "#722F37", usage: "─░kincil butonlar" },
] as const;

// ========== ALTERNAT─░F ACCENT ├ûNER─░LER─░ ==========
const ALTERNATIVE_ACCENTS = [
  { 
    name: "Steel Blue", 
    hex: "#5B8FA8", 
    usage: "So─şuk kontrast, profesyonel",
    description: "Amber'in tamamlay─▒c─▒s─▒. Gece sokak foto─şraf├ğ─▒l─▒─ş─▒ndaki 'mavi saat' esteti─şi.",
    glow: "0 0 30px rgba(91, 143, 168, 0.4)"
  },
  { 
    name: "Copper", 
    hex: "#B87333", 
    usage: "S─▒cak metal, harmoni",
    description: "Amber ile ayn─▒ s─▒cak ailede. End├╝striyel, vintage his.",
    glow: "0 0 30px rgba(184, 115, 51, 0.4)"
  },
  { 
    name: "Sage", 
    hex: "#9CA88D", 
    usage: "Do─şal, sakinle┼ştirici",
    description: "Organik denge. S─▒cak tonlar─▒ dengelemek i├ğin n├Âtr ye┼şil.",
    glow: "0 0 30px rgba(156, 168, 141, 0.4)"
  },
  { 
    name: "Lavender Gray", 
    hex: "#9A8C98", 
    usage: "Sofistike, n├Âtr",
    description: "Elegant ara ton. Hem s─▒cak hem so─şuk ile uyumlu.",
    glow: "0 0 30px rgba(154, 140, 152, 0.4)"
  },
  { 
    name: "Emerald", 
    hex: "#2D6A4F", 
    usage: "Do─şal derinlik",
    description: "Koyu ye┼şil. Amber'in z─▒t kontrast partneri.",
    glow: "0 0 30px rgba(45, 106, 79, 0.4)"
  },
  { 
    name: "Dusty Rose", 
    hex: "#D4A5A5", 
    usage: "Yumu┼şak s─▒cakl─▒k",
    description: "Maroon'un sofistike versiyonu. Daha gentle.",
    glow: "0 0 30px rgba(212, 165, 165, 0.4)"
  },
] as const;

// ============================================
// COMPONENT
// ============================================
export default function ColorPalette() {
  return (
    <div>
      {/* Section Header */}
      <SectionHeader
        number="01"
        title="Renk Paleti"
        description="Sinematik keskinlik, gece sokak foto─şraf├ğ─▒l─▒─ş─▒n─▒n s─▒cakl─▒─ş─▒. %60-%30-%10 kural─▒."
      />

      {/* ZEMIN RENKLERI */}
      <div style={{ marginBottom: SPACING.section }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ 
            fontSize: TYPOGRAPHY.overline.size,
            color: COLORS.ash,
            marginBottom: SPACING.heading,
          }}
        >
          Zemin Renkleri
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {GROUNDS.map((color, i) => (
            <motion.div
              key={color.hex}
              {...staggerItem}
              transition={{ duration: 0.7, delay: i * 0.1, ease: ANIMATION.ease }}
              className="group cursor-pointer"
            >
              {/* Color swatch */}
              <div
                className="aspect-[3/2] rounded-xl transition-all duration-700 group-hover:scale-[0.97]"
                style={{ 
                  backgroundColor: color.hex,
                  border: `1px solid ${COLORS.glassBorder}`,
                }}
              />
              
              {/* Meta */}
              <div style={{ paddingTop: SPACING.inner }}>
                <div className="flex items-baseline justify-between">
                  <p 
                    className="font-medium"
                    style={{ fontSize: TYPOGRAPHY.small.size }}
                  >
                    {color.name}
                  </p>
                  <p 
                    className="font-mono"
                    style={{ 
                      fontSize: TYPOGRAPHY.mono.size,
                      color: COLORS.ash,
                    }}
                  >
                    {color.hex}
                  </p>
                </div>
                <p 
                  style={{ 
                    fontSize: "11px",
                    color: COLORS.concrete,
                    marginTop: "8px",
                  }}
                >
                  {color.usage}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* METIN RENKLERI */}
      <div style={{ marginBottom: SPACING.section }}>
        <motion.p
          {...fadeUp}
          className="tracking-[0.5em] uppercase"
          style={{ 
            fontSize: TYPOGRAPHY.overline.size,
            color: COLORS.ash,
            marginBottom: SPACING.heading,
          }}
        >
          Beyaz Sistemi & Metin Renkleri
        </motion.p>

        <motion.p
          {...fadeUp}
          className="leading-relaxed"
          style={{
            fontSize: TYPOGRAPHY.small.size,
            color: COLORS.concrete,
            marginBottom: SPACING.element,
            maxWidth: "560px",
          }}
        >
          Tam beyaz (#FFFFFF) asla kullan─▒lmaz ÔÇö #050505 zemininde 21:1 kontrast
          g├Âz yorar. Kademeli beyaz sistemi okunabilirli─şi korur.
        </motion.p>

        <div className="space-y-0">
          {TEXT_COLORS.map((color, i) => (
            <motion.div
              key={color.hex}
              {...staggerItem}
              transition={{ duration: 0.7, delay: i * 0.12, ease: ANIMATION.ease }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              style={{ 
                padding: "clamp(24px, 3vw, 40px) 0",
                borderBottom: `1px solid ${COLORS.glassBorder}`,
              }}
            >
              <div className="flex items-center gap-6 sm:gap-12">
                {/* Typography sample */}
                <p
                  className="font-bold leading-none"
                  style={{ 
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    color: color.hex,
                  }}
                >
                  Aa
                </p>
                
                {/* Meta */}
                <div>
                  <p 
                    className="font-medium"
                    style={{ fontSize: TYPOGRAPHY.small.size }}
                  >
                    {color.name}
                  </p>
                  <p 
                    style={{ 
                      fontSize: "11px",
                      color: COLORS.concrete,
                      marginTop: "4px",
                    }}
                  >
                    {color.usage}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <p 
                  className="font-mono"
                  style={{ 
                    fontSize: "10px",
                    color: COLORS.ash,
                  }}
                >
                  {color.contrast}
                </p>
                <p 
                  className="font-mono"
                  style={{ 
                    fontSize: TYPOGRAPHY.mono.size,
                    color: COLORS.ash,
                  }}
                >
                  {color.hex}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ========== %10 ACCENT: SOKAK LAMBASI (Birincil) ========== */}
      <div style={{ marginBottom: SPACING.section }}>
        <motion.div {...fadeUp} style={{ marginBottom: SPACING.heading }}>
          <p
            className="tracking-[0.5em] uppercase"
            style={{ 
              fontSize: TYPOGRAPHY.overline.size,
              color: COLORS.lamp.bright,
            }}
          >
            Sokak Lambas─▒ ÔÇö Birincil Accent
          </p>
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: TYPOGRAPHY.small.size,
              color: COLORS.concrete,
              marginTop: "12px",
              maxWidth: "500px",
            }}
          >
            Gece sokak foto─şraf├ğ─▒l─▒─ş─▒. Islak asfalta yans─▒yan sodyum buharl─▒ lamba ─▒┼ş─▒─ş─▒.
            Ana CTA&apos;lar ve kritik vurgular i├ğin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {LAMP_COLORS.map((color, i) => (
            <motion.div
              key={color.hex}
              {...staggerItem}
              transition={{ duration: 0.7, delay: i * 0.1, ease: ANIMATION.ease }}
              className="group cursor-pointer"
            >
              {/* Color swatch with glow on hover */}
              <motion.div
                className="aspect-[4/5] rounded-xl transition-all duration-700"
                style={{ backgroundColor: color.hex }}
                whileHover={GLOW.lamp}
              />
              
              {/* Meta */}
              <div style={{ paddingTop: SPACING.inner }}>
                <p 
                  className="font-medium"
                  style={{ fontSize: TYPOGRAPHY.small.size }}
                >
                  {color.name}
                </p>
                <p 
                  className="font-mono"
                  style={{ 
                    fontSize: TYPOGRAPHY.mono.size,
                    color: COLORS.ash,
                    marginTop: "4px",
                  }}
                >
                  {color.hex}
                </p>
                <p 
                  className="leading-relaxed"
                  style={{ 
                    fontSize: "11px",
                    color: COLORS.concrete,
                    marginTop: "12px",
                  }}
                >
                  {color.usage}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ========== %10 ACCENT: KAN (─░kincil ÔÇö Dramatik) ========== */}
      <div style={{ marginBottom: SPACING.block }}>
        <motion.div {...fadeUp} style={{ marginBottom: SPACING.heading }}>
          <p
            className="tracking-[0.5em] uppercase"
            style={{ 
              fontSize: TYPOGRAPHY.overline.size,
              color: COLORS.maroon.shirt,
            }}
          >
            Kan ÔÇö ─░kincil Accent
          </p>
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: TYPOGRAPHY.small.size,
              color: COLORS.concrete,
              marginTop: "12px",
              maxWidth: "500px",
            }}
          >
            Sinematik derinlik. Tehlike, drama, error states i├ğin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {MAROON_COLORS.map((color, i) => (
            <motion.div
              key={color.hex}
              {...staggerItem}
              transition={{ duration: 0.7, delay: i * 0.1, ease: ANIMATION.ease }}
              className="group cursor-pointer"
            >
              {/* Color swatch */}
              <motion.div
                className="aspect-[4/5] rounded-xl transition-all duration-700"
                style={{ backgroundColor: color.hex }}
                whileHover={GLOW.maroon}
              />
              
              {/* Meta */}
              <div style={{ paddingTop: SPACING.inner }}>
                <p 
                  className="font-medium"
                  style={{ fontSize: TYPOGRAPHY.small.size }}
                >
                  {color.name}
                </p>
                <p 
                  className="font-mono"
                  style={{ 
                    fontSize: TYPOGRAPHY.mono.size,
                    color: COLORS.ash,
                    marginTop: "4px",
                  }}
                >
                  {color.hex}
                </p>
                <p 
                  className="leading-relaxed"
                  style={{ 
                    fontSize: "11px",
                    color: COLORS.concrete,
                    marginTop: "12px",
                  }}
                >
                  {color.usage}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ========== ALTERNAT─░F ACCENT ├ûNER─░LER─░ ========== */}
      <div style={{ marginBottom: SPACING.block }}>
        <motion.div {...fadeUp} style={{ marginBottom: SPACING.heading }}>
          <p
            className="tracking-[0.5em] uppercase"
            style={{ 
              fontSize: TYPOGRAPHY.overline.size,
              color: "#5B8FA8",
            }}
          >
            Alternatif Accent ├ûnerileri
          </p>
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: TYPOGRAPHY.small.size,
              color: COLORS.concrete,
              marginTop: "12px",
              maxWidth: "600px",
            }}
          >
            Maroon yerine d├╝┼ş├╝n├╝lebilecek alternatifler. Hangisi amber ile daha iyi uyuyor?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {ALTERNATIVE_ACCENTS.map((color, i) => (
            <motion.div
              key={color.hex}
              {...staggerItem}
              transition={{ duration: 0.7, delay: i * 0.1, ease: ANIMATION.ease }}
              className="group cursor-pointer"
            >
              {/* Color swatch */}
              <motion.div
                className="aspect-[3/2] rounded-xl transition-all duration-700 flex items-center justify-center"
                style={{ backgroundColor: color.hex }}
                whileHover={{ boxShadow: color.glow }}
              >
                <span 
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-mono"
                  style={{ fontSize: "11px", color: "#050505" }}
                >
                  Hover for glow
                </span>
              </motion.div>
              
              {/* Meta */}
              <div style={{ paddingTop: SPACING.inner }}>
                <p 
                  className="font-medium"
                  style={{ fontSize: TYPOGRAPHY.small.size, color: color.hex }}
                >
                  {color.name}
                </p>
                <p 
                  className="font-mono"
                  style={{ 
                    fontSize: TYPOGRAPHY.mono.size,
                    color: COLORS.ash,
                    marginTop: "4px",
                  }}
                >
                  {color.hex}
                </p>
                <p 
                  className="leading-relaxed"
                  style={{ 
                    fontSize: "11px",
                    color: COLORS.concrete,
                    marginTop: "8px",
                  }}
                >
                  {color.description}
                </p>
                <p 
                  style={{ 
                    fontSize: "10px",
                    color: COLORS.ash,
                    marginTop: "6px",
                  }}
                >
                  {color.usage}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ========== %60-%30-%10 KURALI V─░ZUAL─░ZASYONU ========== */}
      <motion.div {...fadeUp} style={{ marginBottom: SPACING.block }}>
        <p
          className="tracking-[0.5em] uppercase"
          style={{ 
            fontSize: TYPOGRAPHY.overline.size,
            color: COLORS.ash,
            marginBottom: SPACING.heading,
          }}
        >
          %60 ÔÇö %30 ÔÇö %10 Kural─▒
        </p>

        <p 
          className="leading-relaxed"
          style={{ 
            fontSize: TYPOGRAPHY.small.size,
            color: COLORS.concrete,
            marginBottom: SPACING.element,
            maxWidth: "500px",
          }}
        >
          Ayn─▒ zemin ve y├╝zey, farkl─▒ accent tonlar─▒. Hangisi en iyi ├ğal─▒┼ş─▒yor?
        </p>

        <div className="space-y-4">
          {/* 1. Lamp (Sar─▒) ÔÇö Mevcut */}
          <div>
            <p className="font-mono" style={{ fontSize: "10px", color: COLORS.lamp.bright, marginBottom: "8px" }}>
              Sokak Lambas─▒ (Mevcut)
            </p>
            <div 
              className="flex rounded-xl overflow-hidden"
              style={{ height: "clamp(50px, 8vw, 70px)" }}
            >
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "60%", backgroundColor: COLORS.void, borderRight: `1px solid ${COLORS.glassBorder}` }}
                whileHover={{ backgroundColor: COLORS.obsidian }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.ash }}>60%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "30%", backgroundColor: COLORS.carbon, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.concrete }}>30%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "10%", backgroundColor: COLORS.lamp.bright }}
                whileHover={GLOW.lamp}
              >
                <span className="font-mono font-medium" style={{ fontSize: "10px", color: COLORS.void }}>10%</span>
              </motion.div>
            </div>
          </div>

          {/* 2. Maroon (K─▒rm─▒z─▒) */}
          <div>
            <p className="font-mono" style={{ fontSize: "10px", color: "#FF2D2D", marginBottom: "8px" }}>
              Kan / Maroon
            </p>
            <div 
              className="flex rounded-xl overflow-hidden"
              style={{ height: "clamp(50px, 8vw, 70px)" }}
            >
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "60%", backgroundColor: COLORS.void, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.ash }}>60%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "30%", backgroundColor: COLORS.carbon, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.concrete }}>30%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "10%", backgroundColor: "#FF2D2D" }}
                whileHover={{ boxShadow: "0 0 30px rgba(255, 45, 45, 0.5)" }}
              >
                <span className="font-mono font-medium" style={{ fontSize: "10px", color: COLORS.void }}>10%</span>
              </motion.div>
            </div>
          </div>

          {/* 3. Steel Blue */}
          <div>
            <p className="font-mono" style={{ fontSize: "10px", color: "#5B8FA8", marginBottom: "8px" }}>
              Steel Blue
            </p>
            <div 
              className="flex rounded-xl overflow-hidden"
              style={{ height: "clamp(50px, 8vw, 70px)" }}
            >
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "60%", backgroundColor: COLORS.void, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.ash }}>60%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "30%", backgroundColor: COLORS.carbon, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.concrete }}>30%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "10%", backgroundColor: "#5B8FA8" }}
                whileHover={{ boxShadow: "0 0 30px rgba(91, 143, 168, 0.5)" }}
              >
                <span className="font-mono font-medium" style={{ fontSize: "10px", color: COLORS.void }}>10%</span>
              </motion.div>
            </div>
          </div>

          {/* 4. Copper */}
          <div>
            <p className="font-mono" style={{ fontSize: "10px", color: "#B87333", marginBottom: "8px" }}>
              Copper
            </p>
            <div 
              className="flex rounded-xl overflow-hidden"
              style={{ height: "clamp(50px, 8vw, 70px)" }}
            >
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "60%", backgroundColor: COLORS.void, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.ash }}>60%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "30%", backgroundColor: COLORS.carbon, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.concrete }}>30%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "10%", backgroundColor: "#B87333" }}
                whileHover={{ boxShadow: "0 0 30px rgba(184, 115, 51, 0.5)" }}
              >
                <span className="font-mono font-medium" style={{ fontSize: "10px", color: COLORS.void }}>10%</span>
              </motion.div>
            </div>
          </div>

          {/* 5. Emerald */}
          <div>
            <p className="font-mono" style={{ fontSize: "10px", color: "#2D6A4F", marginBottom: "8px" }}>
              Emerald
            </p>
            <div 
              className="flex rounded-xl overflow-hidden"
              style={{ height: "clamp(50px, 8vw, 70px)" }}
            >
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "60%", backgroundColor: COLORS.void, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.ash }}>60%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "30%", backgroundColor: COLORS.carbon, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.concrete }}>30%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "10%", backgroundColor: "#2D6A4F" }}
                whileHover={{ boxShadow: "0 0 30px rgba(45, 106, 79, 0.5)" }}
              >
                <span className="font-mono font-medium" style={{ fontSize: "10px", color: "#F0F0F0" }}>10%</span>
              </motion.div>
            </div>
          </div>

          {/* 6. Dusty Rose */}
          <div>
            <p className="font-mono" style={{ fontSize: "10px", color: "#D4A5A5", marginBottom: "8px" }}>
              Dusty Rose
            </p>
            <div 
              className="flex rounded-xl overflow-hidden"
              style={{ height: "clamp(50px, 8vw, 70px)" }}
            >
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "60%", backgroundColor: COLORS.void, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.ash }}>60%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "30%", backgroundColor: COLORS.carbon, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.concrete }}>30%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "10%", backgroundColor: "#D4A5A5" }}
                whileHover={{ boxShadow: "0 0 30px rgba(212, 165, 165, 0.5)" }}
              >
                <span className="font-mono font-medium" style={{ fontSize: "10px", color: COLORS.void }}>10%</span>
              </motion.div>
            </div>
          </div>

          {/* 7. Lavender Gray */}
          <div>
            <p className="font-mono" style={{ fontSize: "10px", color: "#9A8C98", marginBottom: "8px" }}>
              Lavender Gray
            </p>
            <div 
              className="flex rounded-xl overflow-hidden"
              style={{ height: "clamp(50px, 8vw, 70px)" }}
            >
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "60%", backgroundColor: COLORS.void, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.ash }}>60%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "30%", backgroundColor: COLORS.carbon, borderRight: `1px solid ${COLORS.glassBorder}` }}
              >
                <span className="font-mono" style={{ fontSize: "11px", color: COLORS.concrete }}>30%</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center"
                style={{ width: "10%", backgroundColor: "#9A8C98" }}
                whileHover={{ boxShadow: "0 0 30px rgba(154, 140, 152, 0.5)" }}
              >
                <span className="font-mono font-medium" style={{ fontSize: "10px", color: COLORS.void }}>10%</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ========== GLOW DEMO ÔÇö Sokak Lambas─▒ vs Kan ========== */}
      <motion.div {...fadeUp}>
        <p
          className="tracking-[0.5em] uppercase"
          style={{ 
            fontSize: TYPOGRAPHY.overline.size,
            color: COLORS.ash,
            marginBottom: SPACING.heading,
          }}
        >
          Glow Kar┼ş─▒la┼şt─▒rmas─▒
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sokak Lambas─▒ Glow */}
          <motion.div
            className="rounded-2xl flex flex-col items-center justify-center"
            style={{ 
              backgroundColor: COLORS.obsidian,
              padding: "clamp(40px, 6vw, 64px)",
              border: `1px solid ${COLORS.glassBorder}`,
            }}
            whileHover={GLOW.lamp}
            transition={{ duration: 0.6 }}
          >
            <p 
              className="tracking-[0.4em] uppercase"
              style={{ 
                fontSize: "10px",
                color: COLORS.lamp.dim,
                marginBottom: SPACING.heading,
              }}
            >
              Sokak Lambas─▒
            </p>
            <h3 
              className="font-normal tracking-tight"
              style={{ 
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                color: COLORS.lamp.bright,
              }}
            >
              Can
            </h3>
            <p 
              className="leading-relaxed text-center"
              style={{ 
                fontSize: TYPOGRAPHY.body.size,
                color: COLORS.concrete,
                marginTop: SPACING.inner,
              }}
            >
              S─▒cak, davetkar, odak noktas─▒
            </p>
          </motion.div>

          {/* Kan Glow */}
          <motion.div
            className="rounded-2xl flex flex-col items-center justify-center"
            style={{ 
              backgroundColor: COLORS.obsidian,
              padding: "clamp(40px, 6vw, 64px)",
              border: `1px solid ${COLORS.glassBorder}`,
            }}
            whileHover={GLOW.maroon}
            transition={{ duration: 0.6 }}
          >
            <p 
              className="tracking-[0.4em] uppercase"
              style={{ 
                fontSize: "10px",
                color: COLORS.maroon.shirt,
                marginBottom: SPACING.heading,
              }}
            >
              Kan / Maroon
            </p>
            <h3 
              className="font-normal tracking-tight"
              style={{ 
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                color: COLORS.maroon.neon,
              }}
            >
              Can
            </h3>
            <p 
              className="leading-relaxed text-center"
              style={{ 
                fontSize: TYPOGRAPHY.body.size,
                color: COLORS.concrete,
                marginTop: SPACING.inner,
              }}
            >
              Dramatik, tehlikeli, sinematik
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ========== ALTIN KURALLAR ÔÇö Tasar─▒m Matemati─şi ========== */}
      <motion.div {...fadeUp} style={{ marginTop: SPACING.section }}>
        <p
          className="tracking-[0.5em] uppercase"
          style={{ 
            fontSize: TYPOGRAPHY.overline.size,
            color: COLORS.lamp.dim,
            marginBottom: "12px",
          }}
        >
          Alt─▒n Kurallar
        </p>
        <p
          className="leading-relaxed"
          style={{
            fontSize: TYPOGRAPHY.small.size,
            color: COLORS.concrete,
            marginBottom: SPACING.element,
            maxWidth: "560px",
          }}
        >
          Premium tasar─▒m hissetme ile de─şil, matematik ile yap─▒l─▒r. 
          Bu kurallar her karar─▒n arkas─▒ndaki temeldir.
        </p>

        <div className="space-y-0">
          {GOLDEN_RULES.map((item, i) => (
            <motion.div
              key={item.rule}
              {...staggerItem}
              transition={{ duration: 0.7, delay: i * 0.08, ease: ANIMATION.ease }}
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
              style={{
                padding: "clamp(16px, 2vw, 24px) 0",
                borderBottom: `1px solid ${COLORS.glassBorder}`,
              }}
            >
              <p
                className="font-medium"
                style={{ fontSize: TYPOGRAPHY.small.size, minWidth: "200px" }}
              >
                {item.rule}
              </p>
              <p
                className="font-mono"
                style={{
                  fontSize: TYPOGRAPHY.mono.size,
                  color: COLORS.snow,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {item.value}
              </p>
              <p
                className="font-mono"
                style={{
                  fontSize: "10px",
                  color: COLORS.ash,
                  minWidth: "120px",
                  textAlign: "right",
                }}
              >
                {item.source}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}