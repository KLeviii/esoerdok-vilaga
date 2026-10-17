const THEMES = ["light", "dark", "auto"]
const STORAGE_KEY = "theme"

let body = document.querySelector("body")
let themeToggleIcon = document.querySelector("#themeToggleIcon")
let themeItems = document.querySelectorAll("[data-theme-value]")
let brandLogo = document.querySelector(".navbar-brand img")
let systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)")
let footerLogo = document.querySelector(".footer-brand img")

const loadTheme = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        return THEMES.includes(saved) ? saved : "auto"
    } catch {
        return "auto"
    }
}

const saveTheme = (theme) => {
    try {
        localStorage.setItem(STORAGE_KEY, theme)
    } catch {}
}

let currentTheme = loadTheme()

const applyTheme = () => {
    const isLight = currentTheme === "light" || (currentTheme === "auto" && systemPrefersLight.matches)

    body.classList.toggle("light", isLight)
    document.documentElement.setAttribute("data-bs-theme", isLight ? "light" : "dark")

    brandLogo.src = isLight ? "assets/brand/icon-light.webp" : "assets/brand/icon-dark.webp"
    footerLogo.src = isLight ? "assets/brand/brand-light.webp" : "assets/brand/brand-dark.webp"

    themeItems.forEach((item) => {
        const isSelected = item.dataset.themeValue === currentTheme
        item.classList.toggle("selected", isSelected)
        item.classList.toggle("active", isSelected)
        item.setAttribute("aria-pressed", isSelected)
        if (isSelected) {
            const icon = item.querySelector(".menu-item-icon").cloneNode(true)
            icon.classList.remove("menu-item-icon")
            themeToggleIcon.replaceChildren(icon)
        }
    })
}

themeItems.forEach((item) => {
    item.addEventListener("click", () => {
        currentTheme = item.dataset.themeValue
        saveTheme(currentTheme)
        applyTheme()
    })
})

systemPrefersLight.addEventListener("change", () => {
    if (currentTheme === "auto") applyTheme()
})

applyTheme()

document.querySelectorAll('.gallery .carousel-indicators [data-bs-slide-to="0"]').forEach((dot) => dot.click())

// --- Próbakérdés ---
let probaKerdes = document.querySelector("#probaKerdes")
let probaHelyes = document.querySelector("#probaHelyes")
let probaHibas = document.querySelector("#probaHibas")

probaKerdes.addEventListener("submit", (event) => {
    event.preventDefault()
    const isCorrect = probaKerdes.elements.proba.value === "lajhar"
    probaHelyes.hidden = !isCorrect
    probaHibas.hidden = isCorrect
})

// --- Vissza a tetejére gomb: csak lefelé görgetés után látszik ---
let backToTop = document.querySelector("#backToTop")

const updateBackToTop = () => {
    backToTop.hidden = window.scrollY < window.innerHeight
}

window.addEventListener("scroll", updateBackToTop, { passive: true })
updateBackToTop()
