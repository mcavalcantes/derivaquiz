export const LIGHT = "light";
export const DARK = "dark";

export function getToggledTheme(currentTheme: string): string {
  return currentTheme === DARK ? LIGHT : DARK;
}

export function applyThemeToDOM(theme: string): void {
  if (theme === DARK) {
    document.documentElement.classList.add(DARK);
  } else {
    document.documentElement.classList.remove(DARK);
  }
}
