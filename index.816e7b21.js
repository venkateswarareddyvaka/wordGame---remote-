__parcel__require__();
const letters = document.querySelectorAll(".boxes");
let spinnerElement = document.querySelector(".spinnerContainer");
console.log(spinnerElement);
const originalStringLength = 5;
let afterGettingOutput = false;
let currentGuess = "";
let currentRow = 0;
function fetchingAndAddingEventListener(addLetter) {
    document.addEventListener("keydown", function(event) {
        if (afterGettingOutput) return;
        let action = event.key;
        if (action === "Enter") {
            spinner(false);
            checkingAndComparing();
        } else if (action === "Backspace") backSpace();
        else if (isLetter(action)) addLetter(action.toUpperCase());
    });
}
function addLetter(letter) {
    if (currentGuess.length < originalStringLength) currentGuess = currentGuess + letter;
    else currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    letters[originalStringLength * currentRow + currentGuess.length - 1].innerText = letter;
}
function isLetter(letter) {
    return /^[a-zA-z]$/.test(letter);
}
function backSpace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[originalStringLength * currentRow + currentGuess.length].innerText = "";
}
async function checkingAndComparing() {
    spinner(true);
    let obtainedWordSplit = obtainedWord.split("");
    if (currentGuess.length !== originalStringLength) return alert("please provide five letter words");
    let currentGuessSplit = currentGuess.split("");
    const map = toCheckDoubles(obtainedWordSplit);
    for(let i = 0; i < originalStringLength; i++){
        if (currentGuessSplit[i] === obtainedWordSplit[i]) {
            letters[currentRow * originalStringLength + i].classList.add("green");
            map[currentGuessSplit[i]]--;
        } else if (obtainedWordSplit.includes(currentGuessSplit[i]) && map[currentGuessSplit[i]] > 0) {
            letters[currentRow * originalStringLength + i].classList.add("yellow");
            map[currentGuessSplit[i]]--;
        } else letters[currentRow * originalStringLength + i].classList.add("grey");
    }
    currentRow++;
    if (currentGuess === obtainedWord) {
        alert("You Win");
        afterGettingOutput = true;
        return;
    } else if (currentRow === 6) {
        alert(`you loose ans:${obtainedWord}`);
        afterGettingOutput = done;
    }
    currentGuess = "";
}
function spinner(isLoading) {
    spinnerElement.classList.toggle("show", isLoading);
}
spinner(true);
function toCheckDoubles(array) {
    let object = {};
    for(let i = 0; i < originalStringLength; i++)if (object[array[i]]) object[array[i]]++;
    else object[array[i]] = 1;
    return object;
}
fetchingAndAddingEventListener(addLetter);

//# sourceMappingURL=index.816e7b21.js.map
