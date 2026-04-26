"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ANIMATION } from "@/app/lib/design-tokens";

/* ═══════════════════════════════════════════════════════════════
   PageTransition — Sayfa Geçiş Animasyonu
   
   Route değişimlerinde fade + subtle slide animasyonu.
   AnimatePresence mode="wait" ile mevcut sayfa çıkar, yeni girer.
   Scroll sıfırlama SmoothScroll (Lenis) tarafında yapılıyor.
   ═══════════════════════════════════════════════════════════════ */

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.4,
          ease: ANIMATION.ease,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
