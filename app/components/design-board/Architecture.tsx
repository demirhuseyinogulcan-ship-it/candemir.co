"use client";

import { motion } from "framer-motion";
import { 
  SPACING, 
  COLORS, 
  TYPOGRAPHY,
  fadeUp 
} from "@/app/lib/design-tokens";
import SectionHeader from "@/app/components/ui/SectionHeader";

// ============================================
// DATA
// ============================================
interface TreeNode {
  name: string;
  comment?: string;
  children?: TreeNode[];
}

const TREE: TreeNode[] = [
  {
    name: "candemir/",
    children: [
      {
        name: "src/",
        children: [
          {
            name: "app/",
            children: [
              {
                name: "[lang]/",
                comment: "i18n ilk gunden",
                children: [
                  { name: "layout.tsx" },
                  { name: "page.tsx", comment: "Hero / Anasayfa" },
                  { name: "hakkimda/" },
                  { name: "projeler/" },
                  { name: "galeri/" },
                  {
                    name: "blog/",
                    children: [{ name: "[slug]/" }],
                  },
                  { name: "hizmetler/" },
                  { name: "iletisim/" },
                ],
              },
            ],
          },
          {
            name: "components/",
            children: [
              { name: "ui/", comment: "Butonlar, kartlar, CTA" },
              { name: "sections/", comment: "Hero, About, Services" },
              { name: "layout/", comment: "Navbar, Footer" },
              { name: "motion/", comment: "Framer Motion wrapper" },
            ],
          },
          {
            name: "lib/",
            children: [
              { name: "i18n/", comment: "Dil dosyalari, helper" },
              { name: "seo/", comment: "JSON-LD, meta helper" },
              { name: "utils/", comment: "Genel utility" },
            ],
          },
          {
            name: "content/",
            children: [
              { name: "blog/", comment: "MDX yazilar" },
              { name: "projects/", comment: "Proje verileri" },
            ],
          },
          {
            name: "styles/",
            children: [
              { name: "globals.css", comment: "Tailwind + font-face + CSS vars" },
            ],
          },
          {
            name: "dictionaries/",
            children: [
              { name: "tr.json", comment: "Turkce" },
              { name: "en.json", comment: "Ingilizce" },
            ],
          },
        ],
      },
      {
        name: "public/",
        children: [
          { name: "fonts/", comment: "Neue Montreal woff2" },
          { name: "images/" },
          { name: "videos/" },
        ],
      },
      { name: "next.config.ts" },
      { name: "tailwind.config.ts" },
      { name: "tsconfig.json" },
    ],
  },
];

const TECH_STACK = [
  { name: "Next.js 16", desc: "App Router, Turbopack, RSC" },
  { name: "TypeScript", desc: "Strict mode, tip guvenligi" },
  { name: "Tailwind CSS v4", desc: "Utility-first, CSS vars" },
  { name: "Framer Motion", desc: "Organik animasyonlar" },
  { name: "React Three Fiber", desc: "3D deneyimler (planlanan)" },
  { name: "MDX", desc: "Blog icerigi" },
] as const;

// ============================================
// TREE COMPONENT
// ============================================
function TreeLine({
  node,
  depth = 0,
  isLast = false,
  prefix = "",
  index = 0,
}: {
  node: TreeNode;
  depth?: number;
  isLast?: boolean;
  prefix?: string;
  index?: number;
}) {
  const isFolder = node.name.endsWith("/");
  const connector = depth === 0 ? "" : isLast ? "ÔööÔöÇÔöÇ " : "Ôö£ÔöÇÔöÇ ";
  const childPrefix = depth === 0 ? "" : prefix + (isLast ? "    " : "Ôöé   ");

  return (
    <>
      <motion.div
        className="flex items-baseline gap-0 font-mono whitespace-pre"
        style={{ fontSize: TYPOGRAPHY.small.size, lineHeight: "1.9" }}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.015 }}
      >
        <span style={{ color: COLORS.ash }}>{prefix}{connector}</span>
        <span
          style={{ color: isFolder ? COLORS.snow : COLORS.concrete }}
          className={isFolder ? "font-medium" : ""}
        >
          {node.name}
        </span>
        {node.comment && (
          <span style={{ color: COLORS.ash }}>
            {"  "}ÔåÉ {node.comment}
          </span>
        )}
      </motion.div>
      {node.children?.map((child, i) => (
        <TreeLine
          key={child.name}
          node={child}
          depth={depth + 1}
          isLast={i === node.children!.length - 1}
          prefix={childPrefix}
          index={index + i + 1}
        />
      ))}
    </>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function Architecture() {
  return (
    <div>
      {/* Section Header */}
      <SectionHeader
        number="05"
        title="Mimari"
        description="Temiz klasor yapisi ve teknoloji secimi. i18n ilk gunden, SEO-first, modular component yapisi."
      />

      {/* Folder Tree */}
      <motion.div {...fadeUp} style={{ marginBottom: SPACING.section }}>
        <p
          className="tracking-[0.5em] uppercase"
          style={{ 
            fontSize: TYPOGRAPHY.overline.size,
            color: COLORS.ash,
            marginBottom: SPACING.heading,
          }}
        >
          Klasor Yapisi
        </p>

        <div
          className="rounded-xl overflow-x-auto"
          style={{ 
            backgroundColor: COLORS.carbon,
            padding: "clamp(32px, 4vw, 56px)",
          }}
        >
          {TREE.map((node, i) => (
            <TreeLine key={node.name} node={node} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Tech Stack Grid */}
      <motion.div {...fadeUp}>
        <p
          className="tracking-[0.5em] uppercase"
          style={{ 
            fontSize: TYPOGRAPHY.overline.size,
            color: COLORS.ash,
            marginBottom: SPACING.heading,
          }}
        >
          Teknoloji
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-xl overflow-hidden">
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="cursor-default"
              style={{ 
                backgroundColor: COLORS.carbon,
                padding: "clamp(24px, 3vw, 40px)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ backgroundColor: "#151515" }}
            >
              <p className="font-medium" style={{ fontSize: "15px" }}>{tech.name}</p>
              <p
                className="leading-relaxed"
                style={{ 
                  fontSize: TYPOGRAPHY.small.size,
                  color: COLORS.concrete,
                  marginTop: "12px",
                }}
              >
                {tech.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}