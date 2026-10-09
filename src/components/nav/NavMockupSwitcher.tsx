"use client";

import { useNavVariant } from "./useNavVariant";

const OPTIONS = [
  { key: "a", variant: "header", label: "A · Header links" },
  { key: "b", variant: "bar", label: "B · Quick-link bar" },
  { key: "c", variant: "jump", label: "C · Hero jump links" },
] as const;

/**
 * Review aid, only visible with ?nav= in the URL: switch between the navigation mockups.
 * Delete together with the unused options once one is picked.
 */
export function NavMockupSwitcher() {
  const { variant, reviewing } = useNavVariant();
  if (!reviewing) return null;
  return (
    <div className="mockup-switch" role="group" aria-label="Navigation mockup">
      <span className="eyebrow">Nav mockup</span>
      {OPTIONS.map((option) => (
        <a
          key={option.key}
          href={`?nav=${option.key}`}
          aria-current={variant === option.variant ? "true" : undefined}
        >
          {option.label}
        </a>
      ))}
    </div>
  );
}
