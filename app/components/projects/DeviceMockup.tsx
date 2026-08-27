"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { COLORS } from "@/app/lib/design-tokens";
import { MOCKUP_MEDIA_CONFIG } from "@/app/lib/mockup-config";

/* ═══════════════════════════════════════════════════════════════
   DeviceMockup — MacBook Pro Laptop Mockup

   MacBook çerçevesi PNG'sinin ekran alanına video/screenshot
   yerleştirir. Birden fazla video varsa sırayla oynatır:
     Video 1 oynar → bitince Video 2 başlar → bitince Video 1…

   Video 1 oynarken Video 2 arka planda preload edilir.
   Kullanıcı performans farkı hissetmez.

   Ekran koordinatları MacBook Pro 14 mockup görseline
   (1216×735) göre kalibre edilmiştir.
   ═══════════════════════════════════════════════════════════════ */

const SCREEN = {
  top: 3.3,
  left: 11.2,
  right: 11.2,
  bottom: 11.5,
} as const;

interface DeviceMockupProps {
  /** Birden fazla video — sırayla oynatılır, döngü halinde */
  videos?: string[];
  /** Videolar yüklenene kadar gösterilecek fallback screenshot */
  screenshot?: string;
  alt?: string;
}

export default function DeviceMockup({
  videos = [],
  screenshot,
  alt = "",
}: DeviceMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showA, setShowA] = useState(true); // A/B swap for crossfade
  const [videoReady, setVideoReady] = useState(false);

  const hasVideos = videos.length > 0;
  const isSingle = videos.length === 1;

  // ── Lazy load — sadece görünür olduğunda videoları yükle ──
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
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasVideos]);

  // ── Aktif videoyu belirle ──
  const currentSrc = videos[activeIndex] ?? null;
  const nextIndex = videos.length > 1 ? (activeIndex + 1) % videos.length : 0;
  const nextSrc = videos.length > 1 ? videos[nextIndex] : null;

  // ── Video bittiğinde sıradakine geç ──
  const handleEnded = useCallback(() => {
    if (isSingle) {
      // Tek video — başa sar, loop
      const active = showA ? videoARef.current : videoBRef.current;
      if (active) {
        active.currentTime = 0;
        active.play().catch(() => {});
      }
      return;
    }

    // Sıradaki videoya geç
    setActiveIndex(nextIndex);
    setShowA((prev) => !prev);
  }, [isSingle, nextIndex, showA]);

  // ── A veya B video'yu güncelle ──
  useEffect(() => {
    if (!isVisible || !currentSrc) return;

    const activeEl = showA ? videoARef.current : videoBRef.current;
    if (!activeEl) return;

    // Aktif video'nun src'sini ayarla ve oynat
    if (activeEl.src !== new URL(currentSrc, window.location.origin).href) {
      activeEl.src = currentSrc;
      activeEl.load();
    }
    activeEl.play().catch(() => {});

    // Sıradaki videoyu preload et
    const preloadEl = showA ? videoBRef.current : videoARef.current;
    if (preloadEl && nextSrc) {
      const nextHref = new URL(nextSrc, window.location.origin).href;
      if (preloadEl.src !== nextHref) {
        preloadEl.src = nextSrc;
        preloadEl.load();
      }
    }
  }, [isVisible, activeIndex, currentSrc, nextSrc, showA]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ aspectRatio: "1216 / 735" }}
    >
      {/* ── MacBook çerçevesi (alt katman) ── */}
      <Image
        src="/images/mockup-macbook.png"
        alt="MacBook Pro"
        fill
        className="pointer-events-none"
        style={{ objectFit: "contain", zIndex: 0 }}
        sizes="(max-width: 768px) 100vw, 80vw"
        quality={95}
        priority
      />

      {/* ── Ekran içeriği (üst katman — MacBook'un siyah ekranını kapatır) ── */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: `${SCREEN.top}%`,
          left: `${SCREEN.left}%`,
          right: `${SCREEN.right}%`,
          bottom: `${SCREEN.bottom}%`,
          borderRadius: "clamp(2px, 0.5vw, 6px)",
          backgroundColor: COLORS.void,
          zIndex: 1,
        }}
      >
        {/* Screenshot fallback */}
        {screenshot && (
        <Image
          src={screenshot}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
          quality={95}
          style={{
              objectFit: MOCKUP_MEDIA_CONFIG.laptop.objectFit,
              opacity: videoReady ? 0 : 1,
              transition: "opacity 0.4s ease",
            }}
          />
        )}

        {/* Video A */}
        {hasVideos && isVisible && (
          <video
            ref={videoARef}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: MOCKUP_MEDIA_CONFIG.laptop.objectFit,
              opacity: showA ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
            onCanPlay={() => setVideoReady(true)}
            onEnded={handleEnded}
          />
        )}

        {/* Video B (swap target for crossfade) */}
        {hasVideos && isVisible && videos.length > 1 && (
          <video
            ref={videoBRef}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: MOCKUP_MEDIA_CONFIG.laptop.objectFit,
              opacity: showA ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
            onCanPlay={() => setVideoReady(true)}
            onEnded={handleEnded}
          />
        )}
      </div>
    </div>
  );
}
