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
    generatePassword();
});

function generatePassword() {
    let validChars = "";
    if (uppercaseEl.checked) validChars += charset.uppercase;
    if (lowercaseEl.checked) validChars += charset.lowercase;
    if (numbersEl.checked) validChars += charset.numbers;
    if (symbolsEl.checked) validChars += charset.symbols;

    if (validChars === "") {
        passwordDisplay.value = "Select at least one option!";
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

// Automatic clipboard copy with anonymous security notice
copyBtn.addEventListener("click", () => {
    if (!passwordDisplay.value || passwordDisplay.value.startsWith("Select")) return;
    
    navigator.clipboard.writeText(passwordDisplay.value).then(() => {
        copyBtn.textContent = "Copied! 🔒";
        copyBtn.style.background = "#10b981"; // Green feedback
        
        setTimeout(() => {
            copyBtn.textContent = "Copy";
            copyBtn.style.background = "";
        }, 2000);
    });
});

// Event listeners to regenerate instantly on preference change
[uppercaseEl, lowercaseEl, numbersEl, symbolsEl].forEach(el => {
    el.addEventListener("change", generatePassword);
});

// Generate initial password on load
window.addEventListener("DOMContentLoaded", generatePassword);
