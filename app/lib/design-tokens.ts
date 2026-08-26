/**
 * Design Tokens — Single Source of Truth
 * BEHANCE-GRADE DESIGN SYSTEM
 * 
 * Tüm spacing, color, typography ve animation değerleri buradan yönetilir.
 * DRY prensibi: Bir değeri değiştirmek = her yerde değişir.
 */

// ============================================
// SPACING SYSTEM — 8pt Grid (Vercel/Linear style)
// Yoğun ama nefes alan kompakt sistem.
// Tüm değerler 8'in katı (mobilde min, desktopta max).
// ============================================
//   step  px    use
//   ────  ───   ──────────────────────────────
//   1     8     atom (icon-text gap, micro)
//   2     16    inner (paragraph gap)
//   3     24    heading→body
//   4     32    element (related items)
//   5     48    block (subsections)
//   6     64    section (between sections)
//   7     96    section-lg (max desktop)
//   8     128   hero/landing only
// ============================================
export const SPACING = {
  /** Hero sonrası ana boşluk — kompakt başlangıç */
  hero: "clamp(56px, 6vw, 96px)",

  /** Section'lar arası dikey ritim — Vercel/Linear yoğunluğu */
  section: "clamp(64px, 7vw, 112px)",

  /** Alt bölümler arası — section'dan küçük */
  block: "clamp(40px, 5vw, 72px)",

  /** İlişkili elementler arası */
  element: "clamp(24px, 3vw, 40px)",

  /** Başlık ile içerik arası */
  heading: "clamp(16px, 2vw, 24px)",

  /** Küçük iç boşluklar (paragraf, gap-y) */
  inner: "clamp(12px, 1.25vw, 16px)",

  /** Micro — icon/label gaps */
  atom: "8px",
} as const;

// ============================================
// CONTAINER — Centering & Max-Width
// Linear/Vercel: 1200-1280px standardı
// ============================================
export const CONTAINER = {
  /** Maksimum içerik genişliği */
  maxWidth: "1280px",

  /** Dar içerik için (metin blokları) */
  maxWidthNarrow: "680px",

  /** Geniş içerik için (grid, gallery) */
  maxWidthWide: "1440px",

  /** Responsive horizontal padding */
  padding: "clamp(20px, 4vw, 64px)",
} as const;

// ============================================
// COLORS — Semantic roles backed by the active CSS theme
// %60 Zemin | %30 Yüzey/metin | %10 Accent (Sokak Lambası + Kan)
// ============================================
export const COLORS = {
  // ========== %60 — ZEMİN ROLLERİ ==========
  void: "var(--void)",
  obsidian: "var(--obsidian)",
  carbon: "var(--carbon)",
  slate: "var(--slate)",
  
  // ========== %30 — METİN & BUZLU CAM ==========
  chalk: "var(--chalk)",
  snow: "var(--snow)",
  mist: "var(--mist)",
  concrete: "var(--concrete)",
  ash: "var(--ash)",
  
  // Buzlu cam efektleri
  frost: {
    light: "var(--frost-light)",
    medium: "var(--frost-medium)",
    strong: "var(--frost-strong)",
  },
  
  // Glass & Border
  glassBorder: "var(--glass-border)",
  glassLight: "var(--glass-bg)",
  
  // ========== %10 — ACCENT: SOKAK LAMBASI ==========
  lamp: {
    bright: "var(--lamp-bright)",
    warm: "var(--lamp-warm)",
    glow: "var(--lamp-glow)",
    dim: "var(--lamp-dim)",
    reflection: "var(--lamp-reflection)",
  },
  
  // ========== %10 — ACCENT: KAN ==========
  maroon: {
    neon: "var(--neon-red)",
    dark: "var(--dark-maroon)",
    warm: "var(--maroon-warm)",
    shirt: "var(--maroon-shirt)",
  },
} as const;

/**
 * Apply transparency to a theme-aware color value without concatenating a
 * hexadecimal alpha suffix onto a CSS custom property.
 */
export const withAlpha = (color: string, opacity: number) =>
  `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;

// ============================================
// TYPOGRAPHY — Scale & Hierarchy
// ============================================
export const TYPOGRAPHY = {
  // Display — Hero, büyük başlıklar
  display: {
    size: "clamp(3rem, 8vw, 8rem)",
    weight: 400,
    lineHeight: 0.85,
    letterSpacing: "-0.04em",
  },
  
  // H1 — Section başlıkları
  h1: {
    size: "clamp(3rem, 8vw, 6rem)",
    weight: 500,
    lineHeight: 0.9,
    letterSpacing: "-0.03em",
  },
  
  // H2 — Alt başlıklar
  h2: {
    size: "clamp(2rem, 4vw, 3rem)",
    weight: 500,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  
  // H3 — Card başlıkları
  h3: {
    size: "clamp(1.25rem, 2vw, 1.5rem)",
    weight: 500,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  
  // Body — Ana metin
  body: {
    size: "clamp(1rem, 1.2vw, 1.125rem)",
    weight: 400,
    lineHeight: 1.7,
    letterSpacing: "0",
  },
  
  // Small — Etiketler, meta
  small: {
    size: "13px",
    weight: 400,
    lineHeight: 1.5,
    letterSpacing: "0",
  },
  
  // Overline — Section numaraları, kategoriler
  overline: {
    size: "11px",
    weight: 400,
    lineHeight: 1,
    letterSpacing: "0.5em",
    textTransform: "uppercase" as const,
  },
  
  // Mono — Kod, hex değerleri
  mono: {
    size: "12px",
    weight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.02em",
    fontFamily: "monospace",
  },
} as const;

// ============================================
// ANIMATION — Organic Motion
// ============================================
export const ANIMATION = {
  // Cubic bezier — "ağır kütle" hissi
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  
  // Daha yumuşak ease
  easeSoft: [0.4, 0, 0.2, 1] as [number, number, number, number],
  
  // Duration
  duration: {
    instant: 0.15,
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
    dramatic: 1.2,
  },
} as const;

// ============================================
// MOTION PRESETS — Reusable Framer Motion Props
// ============================================

/** Fade up — Genel giriş animasyonu */
export const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: ANIMATION.duration.slow, ease: ANIMATION.ease },
};

/** Fade up fast — Hızlı giriş */
export const fadeUpFast = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: ANIMATION.duration.normal, ease: ANIMATION.ease },
};

/** Scale in — Zoom effect */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: ANIMATION.duration.slow, ease: ANIMATION.ease },
};

/** Stagger children helper */
export const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-80px" },
  transition: { staggerChildren: 0.1 },
};

/** Stagger child item */
export const staggerItem = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: ANIMATION.duration.normal, ease: ANIMATION.ease },
};

// ============================================
// GLOW EFFECTS — Hover states (Samurai Jack Işık Fiziği)
// ============================================
export const GLOW = {
  // Sokak Lambası — Birincil Accent Glow
  lamp: {
    boxShadow: "0 0 80px rgba(255, 184, 0, 0.4), inset 0 0 40px rgba(255, 184, 0, 0.05)",
    borderColor: "rgba(255, 184, 0, 0.5)",
  },
  lampSubtle: {
    boxShadow: "0 0 40px rgba(255, 184, 0, 0.2)",
    borderColor: "rgba(255, 184, 0, 0.3)",
  },
  lampReflection: {
    boxShadow: "0 20px 60px rgba(255, 184, 0, 0.15), 0 0 80px rgba(255, 159, 28, 0.1)",
    borderColor: "rgba(255, 184, 0, 0.25)",
  },
  
  // Kan/Maroon — İkincil Accent Glow  
  maroon: {
    boxShadow: "0 0 80px rgba(58, 0, 0, 0.5), inset 0 0 60px rgba(58, 0, 0, 0.1)",
    borderColor: "rgba(92, 26, 26, 0.35)",
  },
  maroonSubtle: {
    boxShadow: "0 0 40px rgba(114, 47, 55, 0.3)",
    borderColor: "rgba(114, 47, 55, 0.4)",
  },
  
  // Nötr Glow'lar
  white: {
    boxShadow: "var(--neutral-glow)",
    borderColor: "var(--neutral-glow-border)",
  },
  subtle: {
    boxShadow: "var(--subtle-glow)",
    borderColor: "var(--subtle-glow-border)",
  },
  
  // Danger/Error — Neon Red
  danger: {
    boxShadow: "0 0 60px rgba(255, 45, 45, 0.4)",
    borderColor: "rgba(255, 45, 45, 0.5)",
  },
} as const;
