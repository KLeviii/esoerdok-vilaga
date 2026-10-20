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

let probaKerdes = document.querySelector("#probaKerdes")
let probaHelyes = document.querySelector("#probaHelyes")
let probaHibas = document.querySelector("#probaHibas")

probaKerdes.addEventListener("submit", (event) => {
    event.preventDefault()
    const isCorrect = probaKerdes.elements.proba.value === "lajhar"
    probaHelyes.hidden = !isCorrect
    probaHibas.hidden = isCorrect
})

let siteHeader = document.querySelector("#siteHeader")
let lastScrollY = window.scrollY

const updateNavbar = () => {
    const scrollY = window.scrollY
    if (Math.abs(scrollY - lastScrollY) < 5) return
    siteHeader.classList.toggle("header-hidden", scrollY > lastScrollY && scrollY > siteHeader.offsetHeight)
    lastScrollY = scrollY
}

window.addEventListener("scroll", updateNavbar, { passive: true })

let backToTop = document.querySelector("#backToTop")
let isMobile = window.matchMedia("(width < 768px)")
let prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

const updateBackToTop = () => {
    // mobilon lefelé görgetéskor elrejtjük, hogy ne takarja a galéria lapozó gombjait
    const scrollingDown = isMobile.matches && siteHeader.classList.contains("header-hidden")
    backToTop.classList.toggle("is-hidden", window.scrollY < window.innerHeight || scrollingDown)
}

backToTop.addEventListener("click", (event) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" })
    // a fókusz ne maradjon az eltűnő gombon
    backToTop.blur()
    document.querySelector(".navbar-brand").focus({ preventScroll: true })
})

window.addEventListener("scroll", updateBackToTop, { passive: true })
isMobile.addEventListener("change", updateBackToTop)
updateBackToTop()
