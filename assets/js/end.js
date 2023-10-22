// import { pauseTheme, playTheme } from "./script";
// Variables stored in local Storage are retrieved
// Elements are assigned variables so they can be filled with text content.

let finalScore = document.getElementById("final-score");
let finalScoreUser = document.getElementById("final-score-user");
let mostRecentScore = localStorage.getItem("mostRecentScore");
let userLevel = localStorage.getItem("userLevel");
let user = window.localStorage.getItem("username");

// Set personalized content of text fields on final page
finalScoreUser.innerText = `Hi ${user}! Your final score was:`;
finalScore.innerText = `${mostRecentScore} @ ${userLevel}`;

// If statement designed to display a custom message depending on the users score
if (mostRecentScore < 4) {
  document.getElementById("final-message").innerText =
    "Listen closer! Better luck next time!";
} else if (mostRecentScore <= 8) {
  document.getElementById("final-message").innerText =
    "Not bad! Give it another whirl!";
} else {
  document.getElementById("final-message").innerText =
    "Well you are a real Sound Ninja, aren't you?";
}

const playAgainSameUser = document.getElementById("play-again-same-user");
playAgainSameUser.innerHTML = `<i class="fa-solid fa-rotate-left"></i> Play again as ${user}`;
// playAgainSameUser.innerHTML = `<i class="fa-solid fa-rotate-left"></i> Play again as ${user}`;

const playagain = document.getElementById("play-again-btn");
playagain.addEventListener("click", returntostart);

/**
 * This function allows a user to clear the username stored and start the game over
 * with a new username.
 * @param {event} e - event of a click
 */
function returntostart(e) {
  // pauseTheme();
  e.preventDefault();
  localStorage.clear();
  load(startOver);
  // playTheme();
}

/**
 * This function delays the loading of myURL
 * @param {string} myURL - URL is loaded with time delay
 */
function load(myURL) {
  setTimeout(myURL, 0);
}

/**
 * This function loads the last page when the game is over
 */
function startOver() {
  // pauseTheme();
  window.location.assign("index.html");
  // playTheme();
}

function playTheme() {
  var soundFile = "./assets/audio/halloween-theme.mp3";
  audio = new Audio(soundFile);
  audio.play();
}

function pauseTheme() {
  if (audio) {
    audio.pause();
  }
}
