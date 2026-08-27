"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { COLORS } from "@/app/lib/design-tokens";
import { MOCKUP_MEDIA_CONFIG } from "@/app/lib/mockup-config";

/* ═══════════════════════════════════════════════════════════════
   MobileDeviceMockup — iPhone Çerçevesi

   Bir veya daha fazla video alır:
     - Tek video      → loop oynar
     - Birden fazla   → A/B crossfade ile sırayla oynar (1 → 2 → 1...)

   IntersectionObserver ile lazy-load — sadece görünürken yüklenir.
   Çerçeve PNG: 421×850. Ekran kalibrasyonu yaklaşık %3.5 / %6.5.
   ═══════════════════════════════════════════════════════════════ */

const SCREEN = {
  top: 2.2,
  left: 6.4,
  right: 6.4,
  bottom: 3.4,
} as const;

interface MobileDeviceMockupProps {
  videos: readonly string[];
  alt?: string;
}

export default function MobileDeviceMockup({
  videos,
  alt = "",
}: MobileDeviceMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showA, setShowA] = useState(true);

  const hasVideos = videos.length > 0;
  const isSingle = videos.length === 1;

  /* ── Lazy load ── */
  useEffect(() => {
    if (!hasVideos) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasVideos]);

  const currentSrc = videos[activeIndex] ?? null;
  const nextIndex = videos.length > 1 ? (activeIndex + 1) % videos.length : 0;
  const nextSrc = videos.length > 1 ? videos[nextIndex] : null;

  /* ── Bir video bittiğinde sıradakine geç ── */
  const handleEnded = useCallback(() => {
    if (isSingle) {
      const active = showA ? videoARef.current : videoBRef.current;
      if (active) {
        active.currentTime = 0;
        active.play().catch(() => {});
      }
      return;
    }
    setActiveIndex(nextIndex);
    setShowA((prev) => !prev);
  }, [isSingle, nextIndex, showA]);

  /* ── A/B src yönetimi + sıradakini preload ── */
  useEffect(() => {
    if (!isVisible || !currentSrc) return;

    const activeEl = showA ? videoARef.current : videoBRef.current;
    if (!activeEl) return;

    const activeHref = new URL(currentSrc, window.location.origin).href;
    if (activeEl.src !== activeHref) {
      activeEl.src = currentSrc;
      activeEl.load();
    }
    activeEl.play().catch(() => {});

    if (nextSrc) {
      const preloadEl = showA ? videoBRef.current : videoARef.current;
      const nextHref = new URL(nextSrc, window.location.origin).href;
      if (preloadEl && preloadEl.src !== nextHref) {
        preloadEl.src = nextSrc;
        preloadEl.load();
      }
    }
  }, [isVisible, activeIndex, currentSrc, nextSrc, showA]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "421 / 850",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* iPhone çerçevesi */}
      <Image
        src="/images/mockup-mobile.png"
        alt="iPhone"
        fill
        className="pointer-events-none"
        style={{ objectFit: "contain", zIndex: 1 }}
        sizes="(max-width: 768px) 80vw, 360px"
        quality={95}
      />

      {/* Ekran içeriği — çerçevenin üstünde, ekran alanına kilitli */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: `${SCREEN.top}%`,
          left: `${SCREEN.left}%`,
          right: `${SCREEN.right}%`,
          bottom: `${SCREEN.bottom}%`,
          borderRadius: "clamp(18px, 6%, 36px)",
          backgroundColor: COLORS.void,
          zIndex: 2,
        }}
      >
        {hasVideos && isVisible && (
          <video
            ref={videoARef}
            muted
            playsInline
            autoPlay
            preload="auto"
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: MOCKUP_MEDIA_CONFIG.mobile.objectFit,
              opacity: showA ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
            aria-label={alt}
            onEnded={handleEnded}
          />
        )}

        {hasVideos && isVisible && videos.length > 1 && (
          <video
            ref={videoBRef}
            muted
            playsInline
            autoPlay
            preload="auto"
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: MOCKUP_MEDIA_CONFIG.mobile.objectFit,
              opacity: showA ? 0 : 1,
              transition: "opacity 0.4s ease",
            }}
            aria-hidden="true"
            onEnded={handleEnded}
          />
        )}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: "1.85%",
          left: "50%",
          width: "38%",
          height: "5.6%",
          transform: "translateX(-50%)",
          borderBottomLeftRadius: "18px",
          borderBottomRightRadius: "18px",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          backgroundColor: MOCKUP_MEDIA_CONFIG.mobile.notchColor,
          zIndex: 3,
        }}
      />
    </div>
  );
}
