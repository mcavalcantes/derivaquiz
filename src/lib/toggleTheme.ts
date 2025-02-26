export function toggleTheme(setTheme: (theme: string) => void) {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    setTheme("light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  }
}
