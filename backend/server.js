const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const words = ["APPLE", "TIGER", "HOUSE", "PHONE", "MAC"];
let Indexes = [];
let letters = []
app.use(cors());
app.use(express.json());
let randomWord=""
function newGame(){
    const randomIndex = Math.floor(Math.random() * words.length)
     randomWord = words[randomIndex]
    Indexes=[]
    letters=[]
}

newGame()

app.get("/word", (req, res) => {
    res.send({ message: "okay", word: randomWord, indexes: Indexes })
})

app.post("/check", (req, res) => {
    const letter = req.body.value.toUpperCase();
    let newIndexes = []

    if (letters.includes(letter)) {

        return res.send({ message: "duble word", indexes: Indexes })
    }
    for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === letter) {
            newIndexes.push(i);
        }
    }

    letters.push(letter);

    if (newIndexes.length > 0) {
        Indexes.push(...newIndexes)
    }

    res.send({ correct: newIndexes.length > 0,indexes: Indexes  });
});

app.post("/newgame", (req,res)=>{
    newGame()
    res.send({message:"New game started"})
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});