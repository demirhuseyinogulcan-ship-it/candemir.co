"use client";

import { COLORS, SPACING } from "@/app/lib/design-tokens";
import { PROJECTS, SECTION_PATHS } from "@/app/lib/constants";
import Container from "@/app/components/ui/Container";
import PathHeader from "@/app/components/ui/PathHeader";
import CinematicProjectCard from "@/app/components/sections/CinematicProjectCard";

/* ═══════════════════════════════════════════════════════════════
   SEÇİLİ İŞLER — Cinematic Letterbox Layout
   
   Her proje 21:9 sinematik frame içinde.
   Viewport'a girince letterbox barlar iner,
   üst bar: proje kodu, alt bar: tech stack + yıl,
   altında: başlık + açıklama caption olarak.
   ═══════════════════════════════════════════════════════════════ */

export default function SelectedWork() {
  return (
    <section
      id="work"
      style={{
        backgroundColor: COLORS.void,
        paddingTop: SPACING.section,
        paddingBottom: SPACING.section,
      }}
    >
      <Container>
        <PathHeader
          path={SECTION_PATHS.work}
          title="Seçili İşler"
        />

        <div className="flex flex-col" style={{ gap: SPACING.section }}>
          {PROJECTS.map((project, i) => (
            <CinematicProjectCard
              key={project.id}
              project={project}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
