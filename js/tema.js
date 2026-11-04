// A body elején, szinkron fut, hogy a mentett téma még az első kirajzolás előtt érvényesüljön.
try {
  const saved = localStorage.getItem("theme")
  if (saved === "light" || (saved !== "dark" && matchMedia("(prefers-color-scheme: light)").matches)) {
    document.body.classList.add("light")
  }
} catch {}
