/**
 * Container Component
 * 
 * Merkezi hizalama ve maksimum genişlik.
 * Inline styles ile Tailwind override bypass.
 */

import { ReactNode } from "react";
import { CONTAINER } from "@/app/lib/design-tokens";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Dar içerik (metin blokları) için */
  narrow?: boolean;
  /** Geniş içerik (grid, gallery) için */
  wide?: boolean;
}

export default function Container({ 
  children, 
  className = "",
  narrow = false,
  wide = false,
}: ContainerProps) {
  const maxWidth = narrow 
    ? CONTAINER.maxWidthNarrow 
    : wide 
      ? CONTAINER.maxWidthWide 
      : CONTAINER.maxWidth;

  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: CONTAINER.padding,
        paddingRight: CONTAINER.padding,
      }}
    >
      {children}
    </div>
  );
}
