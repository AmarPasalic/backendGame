const url = "http://localhost:3000"
const underscoreWords = document.getElementById("underscoreWords")
const guess = document.getElementById("guess")
const restart = document.getElementById("restart")
const input = document.getElementById("input")

const guessletters = []

async function fetchRandomWord() {

    const response = await fetch(`${url}/word`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    return data

}


async function handleLetter(value) {

    const response = await fetch(`${url}/check`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
    });
    return response.json()

}



async function displayRandomWord() {
    underscoreWords.innerHTML = ""

    const obj = await fetchRandomWord()

    const word = obj.word
    const indexes = obj.indexes
    if(indexes.length===word.length){
        console.log("You won")
       
    }
    console.log(word)
    console.log(indexes)
    const underscore = " _ "
    let displayWord = ""
    for (let i = 0; i < word.length; i++) {
        if (indexes.includes(i)) {
            displayWord += word[i];
        }
        else {
            displayWord += underscore
        }

    }
    underscoreWords.innerHTML = displayWord


}

document.addEventListener("DOMContentLoaded", displayRandomWord)


async function handleGuessWords() {
    const letter = input.value.toUpperCase().trim(); 
    if (!letter || (letter.length>1 && letter==!"LJ" && letter==!"NJ") ) {
        console.log("No letter entered!");
        return;
    }
    const res = await handleLetter(letter)
    console.log(res)
    input.value = ""
    displayRandomWord()
}


guess.addEventListener("click", handleGuessWords)




async function newGame(){
 const response = await fetch(`${url}/newgame`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    displayRandomWord()
    return data
}



restart.addEventListener("click", newGame)