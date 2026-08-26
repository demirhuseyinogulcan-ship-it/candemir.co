"use client";

const THEME_STORAGE_KEY = "candemir-theme";
const TRANSITION_DURATION = 400;

type Theme = "light" | "dark";

type ViewTransition = {
  readonly ready: Promise<void>;
  readonly finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransition;
};

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function persistTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private browsing and restricted storage should not break the toggle.
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  persistTheme(theme);
}

function getRevealClipPath(button: HTMLButtonElement): [string, string] {
  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
  const { top, left, width, height } = button.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const maxRadius = Math.hypot(
    Math.max(x, viewportWidth - x),
    Math.max(y, viewportHeight - y)
  );

  return [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${maxRadius}px at ${x}px ${y}px)`,
  ];
}

function toggleTheme(button: HTMLButtonElement) {
  const nextTheme: Theme = getCurrentTheme() === "dark" ? "light" : "dark";
  const transitionDocument = document as ViewTransitionDocument;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!transitionDocument.startViewTransition || prefersReducedMotion) {
    applyTheme(nextTheme);
    return;
  }

  const root = document.documentElement;
  const clipPath = getRevealClipPath(button);
  root.dataset.themeTransition = "active";
  root.style.setProperty("--theme-toggle-clip-from", clipPath[0]);

  const transition = transitionDocument.startViewTransition(() => {
    applyTheme(nextTheme);
  });

  const cleanup = () => {
    delete root.dataset.themeTransition;
    root.style.removeProperty("--theme-toggle-clip-from");
  };

  transition.ready.then(() => {
    root.animate(
      { clipPath },
      {
        duration: TRANSITION_DURATION,
        easing: "ease-in-out",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  });

  transition.finished.then(cleanup, cleanup);
}

export default function ThemeToggle({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      data-theme-toggle
      aria-label={label}
      title={label}
      onClick={(event) => toggleTheme(event.currentTarget)}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <g className="theme-toggle__sun">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
        </g>
        <path
          className="theme-toggle__moon"
          d="M20.5 15.2A7.5 7.5 0 0 1 8.8 3.5 7.5 7.5 0 1 0 20.5 15.2Z"
        />
      </svg>
    </button>
  );
}
