/* Início da Lógica do Jogo - Descrição das constantes */
const wordDisplay = document.querySelector(".word-display");
const hintText = document.querySelector(".hint-text b");
const guessesText = document.querySelector(".guesses-text b");
const KeyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector("button");
/* Fim da Lógica do Jogo - Descrição das constantes */

/* Início da Lógica do Jogo - Descrição das variáveis Globais */
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/hangman-0.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  KeyboardDiv.querySelectorAll("button").forEach(
    (btn) => (btn.disabled = false)
  );
  gameModal.classList.remove("show");
};
/* Fim da Lógica do Jogo - Descrição das variáveis Globais */

/* Início da Lógica do Jogo - Escolha Aleatória da Palavra */
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  hintText.innerText = hint;
  resetGame();
};
/* Fim da Lógica do Jogo - Escolha Aleatória da Palavra */

/* Início da Lógica do Jogo - Fim de jogo */
const gameOver = (isVictory) => {
  const modalText = isVictory
    ? "Parabéns! Você venceu!"
    : `Fim de jogo! A palavra era`;
  gameModal.querySelector("img").src = `images/${
    isVictory ? "victory" : "lost"
  }.gif`;
  gameModal.querySelector("h4").innerText = isVictory
    ? "Parabens!"
    : "Que pena!";
  gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
  gameModal.classList.add("show");
};
/* Fim da Lógica do Jogo - Fim de jogo */

/* Início do Init */
const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};
/* Fim do Init */

/* Início do Teclado do Jogo */
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  KeyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
/* Fim do Teclado do Jogo */

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);
