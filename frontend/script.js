const url= "http://localhost:3000"
const underscoreWords = document.getElementById("underscoreWords")
const guess=document.getElementById("guess")
const restart=document.getElementById("restart")
 const input=document.getElementById("input")

 const guessletters=[]

async function fetchRandomWord(){

    const response = await fetch(`${url}/word`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    return data

}

async function displayRandomWord(){  
    underscoreWords.innerHTML=""
    const obj= await fetchRandomWord()
    const word= obj.word
     console.log(word)
  
    const underscore="_  "
    underscoreWords.innerHTML=underscore.repeat(word.length)
     
}

document.addEventListener("DOMContentLoaded", displayRandomWord)

function handleGuessWords(){
const value= input.value
if(value.length>1) console.log("You must enter one letter")
if(!guessletters.includes(input.value)){
    guessletters.push(input.value)
}

console.log(guessletters) 
}


guess.addEventListener("click", handleGuessWords)