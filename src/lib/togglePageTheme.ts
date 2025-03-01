import type { UserPreferences } from "../types/types";

const LIGHT: string = "light";
const DARK: string = "dark";

export function togglePageTheme(setPageTheme: React.Dispatch<React.SetStateAction<string>>) {
  const userPreferences: UserPreferences = JSON.parse(localStorage.getItem("userPreferences")!);

  if (userPreferences.pageTheme === DARK) {
    document.documentElement.classList.remove(DARK);
    userPreferences.pageTheme = LIGHT;
    localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
    setPageTheme(LIGHT);
  } else {
    document.documentElement.classList.add(DARK);
    userPreferences.pageTheme = DARK;
    localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
    setPageTheme(DARK);
  }
}
