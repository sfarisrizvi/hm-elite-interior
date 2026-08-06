"use client";

/**
 * Inline script that runs before first paint to set the theme from localStorage,
 * preventing a flash of wrong theme.
 */
export function ThemeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('hm-theme');
        if (theme === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
