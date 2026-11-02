const VERDICTS = [
    { maxScore: 4, text: "Most még nehezen boldogulnál. A Tippek oldalon az alapokkal kezdheted." },
    { maxScore: 7, text: "Az alapokat ismered, de egy-két hiba a vadonban sokba kerülhet." },
    { maxScore: Infinity, text: "Jól felkészültél. Túravezető mellett biztonsággal mozognál az esőerdőben." },
]

const ICONS = {
    correct: '<svg class="bi flex-shrink-0" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>',
    wrong: '<svg class="bi flex-shrink-0" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg>',
}

const form = document.querySelector("#kviz")
const questions = [...form.querySelectorAll("fieldset")]
const progress = document.querySelector("#kvizHaladas")
const progressLabel = document.querySelector("#kvizHaladasSzoveg")
const hint = document.querySelector("#kvizSugo")
const prevButton = document.querySelector("#kvizVissza")
const nextButton = document.querySelector("#kvizTovabb")
const submitButton = document.querySelector("#kvizKiertekeles")
const result = document.querySelector("#eredmeny")

let currentIndex = 0

const selectedValue = (question) => question.querySelector("input:checked")?.value
const answerLabel = (question, value) => question.querySelector(`input[value="${value}"] + label`).textContent
const isCorrect = (question) => selectedValue(question) === question.dataset.correct

const setProgressBar = (bar, value, max) => {
    bar.setAttribute("aria-valuenow", value)
    bar.querySelector(".progress-bar").style.width = `${(value / max) * 100}%`
}

const createParagraph = (className, text) => {
    const paragraph = document.createElement("p")
    paragraph.className = className
    paragraph.textContent = text
    return paragraph
}

const updateNavigation = () => {
    const isAnswered = selectedValue(questions[currentIndex]) !== undefined
    nextButton.disabled = !isAnswered
    submitButton.disabled = !isAnswered
    hint.hidden = isAnswered
}

const showQuestion = (index, { moveFocus = true } = {}) => {
    currentIndex = index
    const isLast = index === questions.length - 1

    questions.forEach((question, i) => (question.hidden = i !== index))
    progressLabel.textContent = `${index + 1}. kérdés / ${questions.length}`
    setProgressBar(progress.querySelector(".progress"), index + 1, questions.length)
    prevButton.disabled = index === 0
    nextButton.hidden = isLast
    submitButton.hidden = !isLast
    updateNavigation()

    if (moveFocus) questions[index].querySelector("legend").focus()
}

const createAnswerReview = (question) => {
    const correct = isCorrect(question)
    const item = document.createElement("li")
    item.className = "list-group-item"

    const status = createParagraph(`d-flex align-items-center gap-2 fw-semibold mb-1 ${correct ? "fg-success" : "fg-danger"}`, "")
    status.innerHTML = correct ? ICONS.correct : ICONS.wrong
    status.append(correct ? "Helyes" : "Hibás")

    item.append(status, createParagraph("mb-1", question.querySelector("legend").textContent))
    if (!correct) item.append(createParagraph("small mb-1", `A te válaszod: ${answerLabel(question, selectedValue(question))}`))
    item.append(
        createParagraph("small mb-1", `Helyes válasz: ${answerLabel(question, question.dataset.correct)}`),
        createParagraph("small text-muted mb-0", question.dataset.explanation)
    )
    return item
}

const showResult = () => {
    const score = questions.filter(isCorrect).length
    const percent = Math.round((score / questions.length) * 100)

    document.querySelector("#eredmenyPont").textContent = `${score} / ${questions.length}`
    document.querySelector("#eredmenySzazalek").textContent = `${percent}%`
    setProgressBar(document.querySelector("#eredmenySav"), percent, 100)
    document.querySelector("#eredmenyErtekeles").textContent = VERDICTS.find((verdict) => score <= verdict.maxScore).text
    document.querySelector("#eredmenyValaszok").replaceChildren(...questions.map(createAnswerReview))

    form.hidden = true
    result.hidden = false
    document.querySelector("#eredmenyTitle").focus()
}

const restart = () => {
    form.reset()
    result.hidden = true
    form.hidden = false
    showQuestion(0)
}

questions.forEach((question) => {
    question.querySelector("legend").tabIndex = -1
    question.addEventListener("change", updateNavigation)
})

prevButton.addEventListener("click", () => showQuestion(currentIndex - 1))
nextButton.addEventListener("click", () => showQuestion(currentIndex + 1))
document.querySelector("#kvizUjra").addEventListener("click", restart)

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const firstUnanswered = questions.findIndex((question) => selectedValue(question) === undefined)
    if (firstUnanswered === -1) showResult()
    else showQuestion(firstUnanswered)
})

progress.hidden = false
prevButton.hidden = false
showQuestion(0, { moveFocus: false })
