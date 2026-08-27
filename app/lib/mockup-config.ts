export const MOCKUP_MEDIA_CONFIG = {
  laptop: {
    captureViewport: { width: 1024, height: 680 },
    objectFit: "contain",
  },
  mobile: {
    captureViewport: { width: 390, height: 844 },
    objectFit: "cover",
    notchColor: "var(--hero-background)",
  },
} as const;
