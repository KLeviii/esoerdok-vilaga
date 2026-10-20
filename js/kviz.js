let kviz = document.querySelector("#kviz")
let questions = [...kviz.querySelectorAll("fieldset")]
let haladas = document.querySelector("#kvizHaladas")
let haladasSzoveg = document.querySelector("#kvizHaladasSzoveg")
let haladasSav = haladas.querySelector(".progress")
let sugo = document.querySelector("#kvizSugo")
let visszaGomb = document.querySelector("#kvizVissza")
let tovabbGomb = document.querySelector("#kvizTovabb")
let kiertekelesGomb = document.querySelector("#kvizKiertekeles")

let eredmeny = document.querySelector("#eredmeny")
let eredmenyTitle = document.querySelector("#eredmenyTitle")
let eredmenyPont = document.querySelector("#eredmenyPont")
let eredmenySzazalek = document.querySelector("#eredmenySzazalek")
let eredmenySav = document.querySelector("#eredmenySav")
let eredmenyErtekeles = document.querySelector("#eredmenyErtekeles")
let eredmenyValaszok = document.querySelector("#eredmenyValaszok")

const ICON_HELYES = '<svg class="bi flex-shrink-0" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>'
const ICON_HIBAS = '<svg class="bi flex-shrink-0" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg>'

let current = 0

const isAnswered = (question) => question.querySelector("input:checked") !== null

const updateButtons = () => {
    const answered = isAnswered(questions[current])
    tovabbGomb.disabled = !answered
    kiertekelesGomb.disabled = !answered
    sugo.hidden = answered
}

const showQuestion = (index, moveFocus) => {
    current = index
    const isLast = index === questions.length - 1

    questions.forEach((question, i) => {
        question.hidden = i !== index
    })

    haladasSzoveg.textContent = `${index + 1}. kérdés / ${questions.length}`
    haladasSav.setAttribute("aria-valuenow", index + 1)
    haladasSav.querySelector(".progress-bar").style.width = `${((index + 1) / questions.length) * 100}%`

    visszaGomb.disabled = index === 0
    tovabbGomb.hidden = isLast
    kiertekelesGomb.hidden = !isLast
    updateButtons()

    if (moveFocus) questions[index].querySelector("legend").focus()
}

const labelText = (question, value) => question.querySelector(`input[value="${value}"] + label`).textContent

const ertekeles = (pont) => {
    if (pont <= 4) return "Most még nehezen boldogulnál. A Tippek oldalon az alapokkal kezdheted."
    if (pont <= 7) return "Az alapokat ismered, de egy-két hiba a vadonban sokba kerülhet."
    return "Jól felkészültél. Túravezető mellett biztonsággal mozognál az esőerdőben."
}

const showResult = () => {
    let pont = 0
    eredmenyValaszok.replaceChildren()

    questions.forEach((question) => {
        const valasz = question.querySelector("input:checked").value
        const helyes = question.dataset.correct
        const isCorrect = valasz === helyes
        if (isCorrect) pont++

        const item = document.createElement("li")
        item.className = "list-group-item"

        const cim = document.createElement("p")
        cim.className = `d-flex align-items-center gap-2 fw-semibold mb-1 ${isCorrect ? "fg-success" : "fg-danger"}`
        cim.innerHTML = isCorrect ? ICON_HELYES : ICON_HIBAS
        cim.append(isCorrect ? "Helyes" : "Hibás")

        const kerdes = document.createElement("p")
        kerdes.className = "mb-1"
        kerdes.textContent = question.querySelector("legend").textContent

        item.append(cim, kerdes)

        if (!isCorrect) {
            const sajat = document.createElement("p")
            sajat.className = "small mb-1"
            sajat.textContent = `A te válaszod: ${labelText(question, valasz)}`
            item.append(sajat)
        }

        const jo = document.createElement("p")
        jo.className = "small mb-1"
        jo.textContent = `Helyes válasz: ${labelText(question, helyes)}`

        const magyarazat = document.createElement("p")
        magyarazat.className = "small text-muted mb-0"
        magyarazat.textContent = question.dataset.explanation

        item.append(jo, magyarazat)
        eredmenyValaszok.append(item)
    })

    const szazalek = pont * 10
    eredmenyPont.textContent = `${pont} / ${questions.length}`
    eredmenySzazalek.textContent = `${szazalek}%`
    eredmenySav.setAttribute("aria-valuenow", szazalek)
    eredmenySav.querySelector(".progress-bar").style.width = `${szazalek}%`
    eredmenyErtekeles.textContent = ertekeles(pont)

    kviz.hidden = true
    eredmeny.hidden = false
    eredmenyTitle.focus()
}

questions.forEach((question) => {
    question.querySelector("legend").tabIndex = -1
    question.addEventListener("change", updateButtons)
})

visszaGomb.addEventListener("click", () => showQuestion(current - 1, true))
tovabbGomb.addEventListener("click", () => showQuestion(current + 1, true))

kviz.addEventListener("submit", (event) => {
    event.preventDefault()
    const unanswered = questions.findIndex((question) => !isAnswered(question))
    if (unanswered !== -1) {
        showQuestion(unanswered, true)
        return
    }
    showResult()
})

document.querySelector("#kvizUjra").addEventListener("click", () => {
    kviz.reset()
    eredmeny.hidden = true
    kviz.hidden = false
    showQuestion(0, true)
})

// JavaScript nélkül minden kérdés látszik egymás alatt, ezért a léptetés csak itt kapcsol be
haladas.hidden = false
visszaGomb.hidden = false
showQuestion(0, false)
