/* Início da Lógica do Jogo - Descrição das constantes */
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const KeyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector("button");
/* Fim da Lógica do Jogo - Descrição das constantes */

/* Início da Lógica do Jogo - Descrição das variáveis Globais */
let currentWord, correctLetters, wrongGuessCount;
constmaxGuesses = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/hangman-0.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => <li class="letter"></li>)
    .join("");
  KeyboardDiv.querySelectorAll("button").forEach(
    (btn) => (btn.disabled = false)
  );
  gameModal.classList.remove("show");
};
/* Fim da Lógica do Jogo - Descrição das variáveis Globais */
