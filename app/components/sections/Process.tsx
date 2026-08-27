"use client";

import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { forwardRef, useState, useCallback, useEffect, useRef } from "react";
import { COLORS, TYPOGRAPHY, ANIMATION, SPACING } from "@/app/lib/design-tokens";
import { PROCESS_TREE, SECTION_PATHS } from "@/app/lib/constants";
import type { ProcessNode, ProcessTreeChild } from "@/app/lib/constants";
import Container from "@/app/components/ui/Container";
import PathHeader from "@/app/components/ui/PathHeader";

const PROCESS_PHRASE_INTERVAL = 5200;

/* ═══════════════════════════════════════════════════════════════
   Sn. 01 — SÜREÇ (Process Tree)
   
   Kişisel metodoloji — dosya sistemi metaforu.
   Her adım bir klasör, tıklayınca alt dosyalar/sorular açılır.
   Temiz mimari yapısı gibi görünür.
   
   Erişilebilirlik: role="tree" + aria-expanded + Arrow key nav
   ═══════════════════════════════════════════════════════════════ */

export default function Process() {
  const [openFolders, setOpenFolders] = useState<string[]>(["observe"]);
  const [hovered, setHovered] = useState(false);
  const [isProcessVisible, setIsProcessVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const folderRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsProcessVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsProcessVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback((name: string) => {
    setOpenFolders((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const glow = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, var(--interaction-glow), transparent 65%)`;

  const handleTreeKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const current = folderRefs.current.findIndex(
        (ref) => ref === document.activeElement
      );
      if (current === -1) return;

      let next = current;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        next = Math.min(current + 1, PROCESS_TREE.length - 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        next = Math.max(current - 1, 0);
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = PROCESS_TREE.length - 1;
      }
      folderRefs.current[next]?.focus();
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-label="Süreç"
      style={{
        backgroundColor: COLORS.void,
        paddingTop: SPACING.section,
        paddingBottom: SPACING.section,
      }}
    >
      <Container>
        <PathHeader
          path={SECTION_PATHS.process}
          title="Süreç"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative overflow-hidden"
          style={{
            backgroundColor: COLORS.obsidian,
            boxShadow: `inset 0 0 0 1px ${hovered ? "var(--interaction-border)" : COLORS.glassBorder}`,
            borderRadius: "16px",
            padding: "clamp(24px, 3vw, 44px)",
            transition: "box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Mouse-tracked radial glow */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: glow, opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }}
          />


          <div
            role="tree"
            aria-label="Süreç ağacı"
            className="relative flex flex-col"
            style={{ gap: "2px" }}
            onKeyDown={handleTreeKeyDown}
          >
          {PROCESS_TREE.map((node, i) => (
            <TreeFolder
              key={node.name}
              node={node}
              index={i}
              isOpen={openFolders.includes(node.name)}
              isProcessVisible={isProcessVisible}
              onToggle={() => toggle(node.name)}
              isLast={i === PROCESS_TREE.length - 1}
              ref={(el) => { folderRefs.current[i] = el; }}
            />
          ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ─── Tree Folder ─── */

const TreeFolder = forwardRef<
  HTMLButtonElement,
  {
    node: ProcessNode;
    index: number;
    isOpen: boolean;
    isProcessVisible: boolean;
    onToggle: () => void;
    isLast: boolean;
  }
>(function TreeFolder({ node, index, isOpen, isProcessVisible, onToggle, isLast }, ref) {
  const prefix = isLast ? "└──" : "├──";
  const childPrefix = isLast ? "    " : "│   ";
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (!isProcessVisible || node.phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let intervalId: number | undefined;
    const advance = () => {
      setPhraseIndex((current) => (current + 1) % node.phrases.length);
    };
    const timeoutId = window.setTimeout(() => {
      advance();
      intervalId = window.setInterval(advance, PROCESS_PHRASE_INTERVAL);
    }, index * 320);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [index, isProcessVisible, node.phrases]);

  const activePhrase = node.phrases[phraseIndex] ?? node.phrases[0];

  return (
    <motion.div
      role="treeitem"
      aria-expanded={isOpen}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: ANIMATION.duration.normal,
        delay: index * 0.06,
        ease: ANIMATION.ease,
      }}
    >
      {/* Folder row — min 44px touch target */}
      <h3 style={{ margin: 0, fontSize: "inherit", fontWeight: "inherit" }}>
        <button
          ref={ref}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={`${node.label} — ${node.summary}`}
          className="cursor-pointer flex items-baseline w-full text-left bg-transparent border-none outline-none group"
          style={{ padding: "7px 0", minHeight: "44px" }}
        >
        {/* Tree connector */}
        <span
          aria-hidden="true"
          style={{
            ...TYPOGRAPHY.mono,
            color: COLORS.ash,
            marginRight: "8px",
            userSelect: "none",
            flexShrink: 0,
            whiteSpace: "pre",
          }}
        >
          {prefix}
        </span>

        {/* Chevron */}
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            ...TYPOGRAPHY.mono,
            color: COLORS.concrete,
            marginRight: "6px",
            display: "inline-block",
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          ▸
        </motion.span>

        {/* Folder name */}
        <span
          className="group-hover:!text-snow"
          style={{
            ...TYPOGRAPHY.mono,
            color: isOpen ? COLORS.snow : COLORS.concrete,
            transition: "color 0.3s",
            flexShrink: 0,
          }}
        >
          {node.name}/
        </span>

        {/* Label — mobilde de görünür */}
        <span
          style={{
            ...TYPOGRAPHY.mono,
            color: COLORS.ash,
            marginLeft: "12px",
            fontStyle: "italic",
            transition: "color 0.3s",
          }}
        >
          {node.label}
        </span>

        {/* Summary — sadece geniş ekran */}
        <span
          className="hidden lg:inline"
          style={{
            ...TYPOGRAPHY.mono,
            color: COLORS.ash,
            marginLeft: "14px",
          }}
        >
          ← {node.summary}
        </span>
        </button>
      </h3>

      <div
        style={{
          marginLeft: "clamp(40px, 4vw, 68px)",
          maxWidth: "78ch",
          padding: "0 0 12px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.84rem, 1vw, 0.98rem)",
            lineHeight: 1.55,
            color: COLORS.mist,
            margin: 0,
          }}
        >
          {node.description}
        </p>
        <div
          data-process-phrase={node.name}
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            minHeight: "1.5em",
            marginTop: "5px",
            ...TYPOGRAPHY.mono,
            color: COLORS.ash,
          }}
        >
          <span>↳</span>
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={activePhrase}
              initial={{ opacity: 0, y: 7, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -7, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: ANIMATION.ease }}
              style={{ display: "inline-block", color: COLORS.concrete }}
            >
              {activePhrase}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Children — expand/collapse */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="group"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: ANIMATION.ease }}
            style={{ overflow: "hidden" }}
          >
            {node.children.map((child, ci) => {
              return <TreeChild key={child.name} node={child} prefix={childPrefix} isLast={ci === node.children.length - 1} index={ci} />;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

function TreeChild({
  node,
  prefix,
  isLast,
  index,
}: {
  node: ProcessTreeChild;
  prefix: string;
  isLast: boolean;
  index: number;
}) {
  const connector = isLast ? "└── " : "├── ";
  const nextPrefix = prefix + (isLast ? "    " : "│   ");
  const isFolder = Boolean(node.children?.length) || node.name.endsWith("/");

  return (
    <>
      <motion.div
        role="treeitem"
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.2,
          delay: index * 0.04,
          ease: ANIMATION.ease,
        }}
        className="flex items-baseline"
        style={{ padding: "3px 0", minHeight: "36px" }}
      >
        <span
          aria-hidden="true"
          style={{
            ...TYPOGRAPHY.mono,
            color: COLORS.ash,
            marginRight: "8px",
            userSelect: "none",
            flexShrink: 0,
            whiteSpace: "pre",
          }}
        >
          {prefix}{connector}
        </span>

        <span
          style={{
            ...TYPOGRAPHY.mono,
            color: isFolder ? COLORS.snow : COLORS.concrete,
          }}
        >
          {node.name}
        </span>

        {node.comment && (
          <span
            className="hidden lg:inline"
            style={{
              ...TYPOGRAPHY.mono,
              color: COLORS.ash,
              marginLeft: "12px",
            }}
          >
            ← {node.comment}
          </span>
        )}
      </motion.div>

      {node.children?.map((child, childIndex) => (
        <TreeChild
          key={`${node.name}-${child.name}`}
          node={child}
          prefix={nextPrefix}
          isLast={childIndex === node.children!.length - 1}
          index={index + childIndex + 1}
        />
      ))}
    </>
  );
}
