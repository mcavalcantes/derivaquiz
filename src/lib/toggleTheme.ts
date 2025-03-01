export function toggleTheme(setTheme: React.Dispatch<React.SetStateAction<string>>) {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    setTheme("light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  }
}
