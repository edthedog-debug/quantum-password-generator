const charset = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

const passwordDisplay = document.getElementById("passwordDisplay");
const lengthRange = document.getElementById("lengthRange");
const lengthVal = document.getElementById("lengthVal");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

lengthRange.addEventListener("input", (e) => {
    lengthVal.textContent = e.target.value;
});

function generatePassword() {
    let validChars = "";
    if (uppercaseEl.checked) validChars += charset.uppercase;
    if (lowercaseEl.checked) validChars += charset.lowercase;
    if (numbersEl.checked) validChars += charset.numbers;
    if (symbolsEl.checked) validChars += charset.symbols;

    if (validChars === "") {
        alert("Please select at least one character type!");
        return;
    }

    const length = parseInt(lengthRange.value);
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    let password = "";
    for (let i = 0; i < length; i++) {
        password += validChars[array[i] % validChars.length];
    }

    passwordDisplay.value = password;
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
    if (!passwordDisplay.value) return;
    navigator.clipboard.writeText(passwordDisplay.value);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 2000);
});

// Generate initial password on load
window.addEventListener("DOMContentLoaded", generatePassword);
