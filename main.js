const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numbersCheckEl = document.querySelector("#numbers-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

let passwordLength = 16

function generatePassword() {
    let chars = "abcdefghjklmnpqrstuvwxyz"

    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numbersChars = "123456789"
    const symbolChars = "?!@&*()[]"

    if(upperCaseCheckEl.checked) {
        chars += upperCaseChars
    }

    if(numbersCheckEl.checked) {
        chars += numbersChars
    }

    if(symbolCheckEl.checked) {
        chars += symbolChars
    }

    let password = ""

    for(let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)

        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputEl.value = password
    
    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    const percent = Math.round((passwordLength / 64) * 25 + 
        (upperCaseCheckEl.checked ? 15 : 0) + 
        (numbersCheckEl.checked ? 25 : 0) + 
        (symbolCheckEl.checked ? 35 : 0))

    securityIndicatorBarEl.style.width = `${percent}%`

    if(percent > 69) {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('safe')
    } else if (percent > 50) {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('warning')
        securityIndicatorBarEl.classList.remove('safe')
    } else {
        securityIndicatorBarEl.classList.add('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('safe')
    }

    if(percent >= 100) {
        securityIndicatorBarEl.classList.add('completed')
    } else {
        securityIndicatorBarEl.classList.remove('completed')
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

function calculateFontSize() {
    if(passwordLength > 45) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-xxs")
    } else if (passwordLength > 32) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.add("font-xs")
        inputEl.classList.remove("font-xxs")
    } else if (passwordLength > 22) {
        inputEl.classList.add("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    } else {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    }
}

const passwordlengthEl = document.querySelector("#password-length")
passwordlengthEl.addEventListener("input", function() {
    passwordLength = passwordlengthEl.value

    document.querySelector("#password-length-text").innerText = passwordLength

    generatePassword()
})

upperCaseCheckEl.addEventListener("click", generatePassword)
numbersCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)

const copyButtonEl = document.querySelector("#copy-1")
copyButtonEl.addEventListener("click", copy)

const copyButtonEl2 = document.querySelector("#copy-2")
copyButtonEl2.addEventListener("click", copy)

const renewEl = document.querySelector("#renew")
renewEl.addEventListener("click", generatePassword)

generatePassword()