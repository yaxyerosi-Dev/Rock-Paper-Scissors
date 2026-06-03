const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("resultText");
const userChoiceText = document.getElementById("userChoiceText");
const computerChoiceText = document.getElementById("computerChoiceText");
const userScoreText = document.getElementById("userScore");
const computerScoreText = document.getElementById("computerScore");
const resetBtn = document.getElementById("resetBtn");

let userScore = 0;
let computerScore = 0;

const winningScore = 3;

const emojis = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️"
};

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.dataset.choice;
    playGame(userChoice);
  });
});

function playGame(userChoice) {
  if (userScore === winningScore || computerScore === winningScore) {
    return;
  }

  const computerChoice = getComputerChoice();

  userChoiceText.textContent = emojis[userChoice];
  computerChoiceText.textContent = emojis[computerChoice];

  const result = checkWinner(userChoice, computerChoice);

  if (result === "win") {
    userScore++;
    resultText.textContent = "🎉 Round Won!";
    resultText.className = "text-2xl font-bold text-green-400";
  } else if (result === "lose") {
    computerScore++;
    resultText.textContent = "😢 Round Lost!";
    resultText.className = "text-2xl font-bold text-red-400";
  } else {
    resultText.textContent = "🤝 Draw!";
    resultText.className = "text-2xl font-bold text-yellow-400";
  }

  userScoreText.textContent = userScore;
  computerScoreText.textContent = computerScore;

  checkChampion();
}

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function checkWinner(user, computer) {
  if (user === computer) {
    return "draw";
  }

  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    return "win";
  }

  return "lose";
}

function checkChampion() {
  if (userScore === winningScore) {
    resultText.textContent = "🏆 YOU ARE THE CHAMPION!";
    resultText.className = "text-2xl font-bold text-green-400 animate-pulse";
    disableGame();
  }

  if (computerScore === winningScore) {
    resultText.textContent = "🤖 COMPUTER IS THE CHAMPION!";
    resultText.className = "text-2xl font-bold text-red-400 animate-pulse";
    disableGame();
  }
}

function disableGame() {
  choices.forEach(choice => {
    choice.disabled = true;
    choice.classList.add("opacity-50", "cursor-not-allowed");
  });
}

function resetGame() {
  userScore = 0;
  computerScore = 0;

  userScoreText.textContent = "0";
  computerScoreText.textContent = "0";

  userChoiceText.textContent = "❔";
  computerChoiceText.textContent = "❔";

  resultText.textContent = "First To 3 Wins!";
  resultText.className = "text-2xl font-bold text-yellow-400";

  choices.forEach(choice => {
    choice.disabled = false;
    choice.classList.remove("opacity-50", "cursor-not-allowed");
  });
}

resetBtn.addEventListener("click", resetGame);