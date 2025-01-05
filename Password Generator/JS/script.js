// Elements
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

// New features
const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#lenght")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolInput = document.querySelector("#symbol")
const copyPasswordButton = document.querySelector("#copy-password")

// Functions
const getLetterLowerCase = () => {
   return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
 };

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
 };

const getSymbol = () => {
    const symbols = "(){}[]=<>/.,!@#+-$%*&";
     return symbols[Math.floor(Math.random() * symbols.length)]
    };

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    let password = ""

    const passwordLenght = +lengthInput.value;

    const generators = [];

    if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }

    if(numbersInput.checked) {
        generators.push(getNumber)
    }

    if(symbolInput.checked) {
        generators.push(getSymbol)
    }

    if(generators.length === 0) {
        return
    }

    for(i=0; i < passwordLenght; i = i + generators.length) {
        generators.forEach(() => {

            const randomValue = generators[Math.floor(Math.random() * generators.length)]();

            password += randomValue;
        })
    }
    password = password.slice(0, passwordLenght);

    generatedPasswordElement.style.display = "block"
    generatedPasswordElement.querySelector("h4").innerText = password;
}
// Events

generatePasswordButton.addEventListener("click", () => {
    generatePassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol)
});

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide")
})

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault()

    const password = generatedPasswordElement.querySelector("h4").innerText

    navigator.clipboard.writeText(password).then(() => {

        copyPasswordButton.innerText = "Password copied successfully"

        setTimeout(() => {
            copyPasswordButton.innerText = "Copy";
        }, 1000)
    })
})

