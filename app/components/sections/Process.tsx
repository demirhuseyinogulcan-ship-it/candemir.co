"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { COLORS, TYPOGRAPHY, ANIMATION, SPACING } from "@/app/lib/design-tokens";
import { PROCESS_TREE } from "@/app/lib/constants";
import type { ProcessNode } from "@/app/lib/constants";
import Container from "@/app/components/ui/Container";

/* ═══════════════════════════════════════════════════════════════
   Sn. 01 — SÜREÇ (Process Tree)
   
   Kişisel metodoloji — dosya sistemi metaforu.
   Her adım bir klasör, tıklayınca alt dosyalar/sorular açılır.
   Temiz mimari yapısı gibi görünür.
   
   candemir.co/system — çalışma hayatı boyunca kullanılacak sistem.
   ═══════════════════════════════════════════════════════════════ */

export default function Process() {
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  function toggle(name: string) {
    setOpenFolder((prev) => (prev === name ? null : name));
  }

  return (
    <section
      style={{
        backgroundColor: COLORS.void,
        paddingTop: SPACING.section,
        paddingBottom: SPACING.section,
      }}
    >
      <Container>
        {/* Overline */}
        <motion.span
          className="block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION.duration.normal }}
          style={{
            ...TYPOGRAPHY.overline,
            color: COLORS.ash,
            marginBottom: SPACING.heading,
          }}
        >
          01 — süreç
        </motion.span>

        {/* Root path */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION.duration.normal, delay: 0.1 }}
          style={{
            ...TYPOGRAPHY.mono,
            color: COLORS.concrete,
            marginBottom: SPACING.heading,
          }}
        >
          ~/candemir/system/
        </motion.p>

        {/* Tree */}
        <div
          className="flex flex-col"
          style={{ gap: "2px" }}
        >
          {PROCESS_TREE.map((node, i) => (
            <TreeFolder
              key={node.name}
              node={node}
              index={i}
              isOpen={openFolder === node.name}
              onToggle={() => toggle(node.name)}
              isLast={i === PROCESS_TREE.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Tree Folder ─── */

function TreeFolder({
  node,
  index,
  isOpen,
  onToggle,
  isLast,
}: {
  node: ProcessNode;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const prefix = isLast ? "└──" : "├──";
  const childPrefix = isLast ? "    " : "│   ";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: ANIMATION.duration.normal,
        delay: index * 0.06,
        ease: ANIMATION.ease,
      }}
    >
      {/* Folder row */}
      <button
        onClick={onToggle}
        className="cursor-pointer flex items-baseline w-full text-left bg-transparent border-none outline-none group"
        style={{ padding: "6px 0" }}
      >
        {/* Tree connector */}
        <span
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
          className="group-hover:!text-[#F0F0F0]"
          style={{
            ...TYPOGRAPHY.mono,
            color: isOpen ? COLORS.snow : COLORS.concrete,
            transition: "color 0.3s",
            flexShrink: 0,
          }}
        >
          {node.name}/
        </span>

        {/* Label */}
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
      </button>

      {/* Children — expand/collapse */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: ANIMATION.ease }}
            style={{ overflow: "hidden" }}
          >
            {node.children.map((child, ci) => {
              const isChildLast = ci === node.children.length - 1;
              const connector = isChildLast ? "└──" : "├──";
              const icon = child.type === "folder" ? "▸ " : "";

              return (
                <motion.div
                  key={child.name}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: ci * 0.04,
                    ease: ANIMATION.ease,
                  }}
                  className="flex items-baseline"
                  style={{ padding: "3px 0" }}
                >
                  {/* Parent connector */}
                  <span
                    style={{
                      ...TYPOGRAPHY.mono,
                      color: COLORS.ash,
                      marginRight: "8px",
                      userSelect: "none",
                      flexShrink: 0,
                      whiteSpace: "pre",
                    }}
                  >
                    {childPrefix}{connector}
                  </span>

                  {/* File/folder name */}
                  <span
                    style={{
                      ...TYPOGRAPHY.mono,
                      color: child.type === "folder" ? COLORS.concrete : COLORS.ash,
                    }}
                  >
                    {icon}{child.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
