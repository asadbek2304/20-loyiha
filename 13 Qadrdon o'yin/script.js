import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById("playerScore");
const playerChoiseEl = document.getElementById("playerChoise");
const computerScoreEl = document.getElementById("computerScore");
const computerChoiseEl = document.getElementById("computerChoise");
const resultText = document.getElementById("resultText");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");

const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");

const allGameIcons = document.querySelectorAll(".far");

const choices = {
  rock: { name: "Rock", defeat: ["scissors"] },
  paper: { name: "Paper", defeat: ["rock"] },
  scissors: { name: "Scissors", defeat: ["paper"] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoise = "";

function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove("selected");
  });
  stopConfetti();
  removeConfetti();
}

function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiseEl.textContent = "";
  computerChoiseEl.textContent = "";
  resetSelected();
  resultText.textContent = `O'yinni boshlang`;
}
window.resetAll = resetAll;

function computerRandomChoise() {
  const computerChoiseNumber = Math.random();
  if (computerChoiseNumber < 0.33) {
    computerChoise = "rock";
  } else if (computerChoiseNumber <= 0.66) {
    computerChoise = "paper";
  } else {
    computerChoise = "scissors";
  }
}

function computerResults() {
  switch (computerChoise) {
    case "rock":
      computerRock.classList.add("selected");
      computerChoiseEl.textContent = " --- Tosh";
      break;
    case "paper":
      computerPaper.classList.add("selected");
      computerChoiseEl.textContent = ` --- Qog'oz`;
      break;
    case "scissors":
      computerScissors.classList.add("selected");
      computerChoiseEl.textContent = " --- Qaychi";
      break;
    default:
      break;
  }
}

function updateScore(playerChoise) {
  if (playerChoise === computerChoise) {
    resultText.textContent = `Teng bo'lib qoldi`;
  } else {
    const choise = choices[playerChoise];
    if (choise.defeat.indexOf(computerChoise) > -1) {
      startConfetti()
      resultText.textContent = `Siz yutdingiz!`;
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = `Siz yutqazdingiz`;
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

function checkResult(playerChoise) {
  resetSelected();
  computerRandomChoise();
  computerResults();
  updateScore(playerChoise);
}

function select(playerChoise) {
  checkResult(playerChoise);
  switch (playerChoise) {
    case "rock":
      playerRock.classList.add("selected");
      playerChoiseEl.textContent = " --- Tosh";
      break;
    case "paper":
      playerPaper.classList.add("selected");
      playerChoiseEl.textContent = ` --- Qog'oz`;
      break;
    case "scissors":
      playerScissors.classList.add("selected");
      playerChoiseEl.textContent = " --- Qaychi";
      break;
    default:
      break;
  }
}
window.select = select;

resetAll();
