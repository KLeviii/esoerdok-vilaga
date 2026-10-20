const THEMES = ["light", "dark", "auto"]
const THEME_STORAGE_KEY = "theme"
const SCROLL_JITTER_PX = 5
const TEASER_CORRECT_ANSWER = "lajhar"

const siteHeader = document.querySelector("#siteHeader")
const backToTop = document.querySelector("#backToTop")
const isMobile = matchMedia("(width < 768px)")
const prefersLight = matchMedia("(prefers-color-scheme: light)")
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)")

const readStoredTheme = () => {
    try {
        const theme = localStorage.getItem(THEME_STORAGE_KEY)
        return THEMES.includes(theme) ? theme : "auto"
    } catch {
        return "auto"
    }
}

const storeTheme = (theme) => {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {}
}

const swapLogoVariant = (img, pattern, prefix, variant) => {
    img.src = img.getAttribute("src").replace(pattern, `${prefix}-${variant}`)
}

const setupThemeSwitcher = () => {
    const toggleIcon = document.querySelector("#themeToggleIcon")
    const options = document.querySelectorAll("[data-theme-value]")
    let theme = readStoredTheme()

    const apply = () => {
        const variant = theme === "light" || (theme === "auto" && prefersLight.matches) ? "light" : "dark"
        document.body.classList.toggle("light", variant === "light")
        document.documentElement.dataset.bsTheme = variant
        swapLogoVariant(document.querySelector(".navbar-brand img"), /icon-(dark|light)/, "icon", variant)
        swapLogoVariant(document.querySelector(".footer-brand img"), /brand-(logo|dark|light)/, "brand", variant)

        options.forEach((option) => {
            const isSelected = option.dataset.themeValue === theme
            option.classList.toggle("selected", isSelected)
            option.classList.toggle("active", isSelected)
            option.setAttribute("aria-pressed", isSelected)
            if (!isSelected) return
            const icon = option.querySelector(".menu-item-icon").cloneNode(true)
            icon.classList.remove("menu-item-icon")
            toggleIcon.replaceChildren(icon)
        })
    }

    options.forEach((option) =>
        option.addEventListener("click", () => {
            theme = option.dataset.themeValue
            storeTheme(theme)
            apply()
        })
    )
    prefersLight.addEventListener("change", () => theme === "auto" && apply())
    apply()
}

const resetGalleryCarousels = () => {
    document.querySelectorAll('.gallery .carousel-indicators [data-bs-slide-to="0"]').forEach((dot) => dot.click())
}

const setupTeaserQuestion = () => {
    const form = document.querySelector("#probaKerdes")
    if (!form) return

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const isCorrect = form.elements.proba.value === TEASER_CORRECT_ANSWER
        document.querySelector("#probaHelyes").hidden = !isCorrect
        document.querySelector("#probaHibas").hidden = isCorrect
    })
}

const setupScrollBehavior = () => {
    let lastScrollY = scrollY

    const updateHeader = () => {
        if (Math.abs(scrollY - lastScrollY) < SCROLL_JITTER_PX) return
        const isScrollingDown = scrollY > lastScrollY && scrollY > siteHeader.offsetHeight
        siteHeader.classList.toggle("header-hidden", isScrollingDown)
        lastScrollY = scrollY
    }

    const updateBackToTop = () => {
        const isNearTop = scrollY < innerHeight
        const isHiddenWithHeader = isMobile.matches && siteHeader.classList.contains("header-hidden")
        backToTop.classList.toggle("is-hidden", isNearTop || isHiddenWithHeader)
    }

    addEventListener("scroll", () => {
        updateHeader()
        updateBackToTop()
    }, { passive: true })
    isMobile.addEventListener("change", updateBackToTop)
    updateBackToTop()

    backToTop.addEventListener("click", (event) => {
        event.preventDefault()
        scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" })
        backToTop.blur()
        document.querySelector(".navbar-brand").focus({ preventScroll: true })
    })
}

setupThemeSwitcher()
resetGalleryCarousels()
setupTeaserQuestion()
setupScrollBehavior()
