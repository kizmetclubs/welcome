import { THEME_NAMES } from "@/themes/registry";

/**
 * Applies a theme override before paint, so a theme chosen in /kitchensink (or passed via
 * ?theme=) persists across navigation without a flash of the default theme.
 *
 * Order: the ?theme= query param (and remembers it), then a previously stored choice.
 * Falls back to the server default already on <html data-theme>. This is a dev/preview
 * affordance — harmless on the public page, which has no theme switcher.
 */
export function ThemeInit() {
  const names = JSON.stringify(THEME_NAMES);
  const script =
    `(function(){try{` +
    `var A=${names};` +
    `var p=new URLSearchParams(location.search).get("theme");` +
    `var s=localStorage.getItem("nf-theme");` +
    `var t=A.indexOf(p)>-1?p:(A.indexOf(s)>-1?s:null);` +
    `if(t){document.documentElement.dataset.theme=t;if(p===t)localStorage.setItem("nf-theme",t);}` +
    `}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
