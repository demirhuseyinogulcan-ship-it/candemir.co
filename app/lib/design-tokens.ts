/**
 * Design Tokens — Single Source of Truth
 * BEHANCE-GRADE DESIGN SYSTEM
 * 
 * Tüm spacing, color, typography ve animation değerleri buradan yönetilir.
 * DRY prensibi: Bir değeri değiştirmek = her yerde değişir.
 */

// ============================================
// SPACING SYSTEM — Vertical Rhythm
// ============================================
export const SPACING = {
  /** Hero sonrası mega boşluk */
  hero: "clamp(120px, 15vw, 200px)",
  
  /** Section'lar arası dikey boşluk */
  section: "clamp(160px, 20vw, 280px)",
  
  /** Alt bölümler arası boşluk */
  block: "clamp(80px, 10vw, 140px)",
  
  /** İlişkili elementler arası */
  element: "clamp(48px, 6vw, 80px)",
  
  /** Başlık ile içerik arası */
  heading: "clamp(24px, 3vw, 40px)",
  
  /** Küçük iç boşluklar */
  inner: "clamp(16px, 2vw, 24px)",
} as const;

// ============================================
// CONTAINER — Centering & Max-Width
// ============================================
export const CONTAINER = {
  /** Maksimum içerik genişliği */
  maxWidth: "1400px",
  
  /** Dar içerik için (metin blokları) */
  maxWidthNarrow: "720px",
  
  /** Geniş içerik için (grid, gallery) */
  maxWidthWide: "1600px",
  
  /** Responsive horizontal padding */
  padding: "clamp(24px, 5vw, 96px)",
} as const;

// ============================================
// COLORS — Samurai Jack + Gece Sokak Fotoğrafçılığı
// %60 Zemin (Derin Karanlık) | %30 Yüzey (Buzlu Cam) | %10 Accent (Sokak Lambası + Kan)
// ============================================
export const COLORS = {
  // ========== %60 — ZEMİN RENKLERİ (Samurai Jack Geceleri) ==========
  void: "#050505",      // En derin siyah — ana zemin
  obsidian: "#0A0A0A",  // Section arka planları
  carbon: "#111111",    // Kart / surface
  slate: "#1A1A1A",     // Hover state, yükseltilmiş yüzey
  
  // ========== %30 — METİN & BUZLU CAM (Frosted Glass) ==========
  // Beyaz Sistemi — Tam beyaz (#FFF) asla kullanılmaz, göz yorar
  chalk: "#FAFAFA",     // En parlak — başlıklar, hero text (kontrast: 19.3:1)
  snow: "#F0F0F0",      // Ana metin — body text (kontrast: 17.4:1)
  mist: "#E0E0E0",      // Pasif metin — placeholder, disabled (kontrast: 14.0:1)
  concrete: "#777777",  // İkincil metin — orta gri
  ash: "#444444",       // Tersiyer metin — koyu gri
  
  // Buzlu cam efektleri
  frost: {
    light: "rgba(255, 255, 255, 0.08)",   // Hafif buzlu yüzey
    medium: "rgba(255, 255, 255, 0.12)",  // Orta buzlu yüzey
    strong: "rgba(255, 255, 255, 0.18)",  // Güçlü buzlu yüzey
  },
  
  // Glass & Border
  glassBorder: "rgba(255, 255, 255, 0.06)",
  glassLight: "rgba(255, 255, 255, 0.03)",
  
  // ========== %10 — ACCENT: SOKAK LAMBASI (Birincil) ==========
  // Gece sokak fotoğrafçılığı — ıslak asfalta yansıyan sodyum buharlı lamba
  lamp: {
    bright: "#FFB800",   // Parlak amber — ana CTA, kritik vurgular
    warm: "#FF9F1C",     // Sıcak turuncu — hover states
    glow: "#FFAA00",     // Sodyum buharı — glow efektleri
    dim: "#CC9200",      // Karartılmış — subtle vurgular
    reflection: "rgba(255, 184, 0, 0.15)", // Asfalt yansıması
  },
  
  // ========== %10 — ACCENT: KAN (İkincil — Samurai Jack) ==========
  // Tehlike, derinlik, dramatik anlar için
  maroon: {
    neon: "#FF2D2D",     // Elektrikli kırmızı — danger, error states
    dark: "#3A0000",     // Derin kırmızı — gradient base, gölgeler
    warm: "#5C1A1A",     // Glassmorphism overlay, card tint
    shirt: "#722F37",    // Sofistike — ikincil butonlar, subtle hover
  },
} as const;

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
    boxShadow: "0 0 60px rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  subtle: {
    boxShadow: "0 0 40px rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  
  // Danger/Error — Neon Red
  danger: {
    boxShadow: "0 0 60px rgba(255, 45, 45, 0.4)",
    borderColor: "rgba(255, 45, 45, 0.5)",
  },
} as const;
