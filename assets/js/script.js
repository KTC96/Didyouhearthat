// Elements of code where taken from - Code by Marek https://www.codehim.com/vanilla-javascript/javascript-multiple-choice-questions-code/
// Inpsiration and guidance for certain aspect of code were also obtained from the Code Institutes Love Maths game
// and the Movie Quotes Quiz by Jose Maciel https://zemaciel.github.io/project-02/index.html
// Validation of username was adapted from https://www.freecodecamp.org/news/form-validation-with-html5-and-javascript/

// If a user is loading the game for the first time, it will require input of a username.
// The username is stored in localStorage.
// If a user has already provided a username and wants to play again with the same username,
// the user is not required to enter the username again.
playTheme();
if (window.localStorage.getItem("username")) {
  document.getElementById("levelchoice-area").style.display = "initial";
  document.getElementById("username-area").style.display = "none";
  let user = window.localStorage.getItem("username");
  document.getElementById(
    "levelchoice-heading"
  ).innerText = `Welcome to the game ${user}!`;
} else if (!window.localStorage.getItem("username")) {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", validate);
}

/**
 * This function validates that a username was input. It shows an error message if not.
 * If a username is provided it saves it so it can be displayed throughout the game.
 * Adapted from https://www.freecodecamp.org/news/form-validation-with-html5-and-javascript/
 * @param {event} e - event of a click
 */
function validate(e) {
  e.preventDefault();

  const usernameField = document.getElementById("username");

  if (!usernameField.value) {
    const usernameError = document.getElementById("usernameError");
    usernameError.classList.add("visible");
    usernameError.setAttribute("aria-hidden", false);
    usernameError.setAttribute("aria-invalid", true);
    usernameError.innerText = "Please enter a username to proceed!";
  } else if (usernameField.value) {
    window.localStorage.setItem("username", usernameField.value);
    document.getElementById("levelchoice-area").style.display = "initial";
    document.getElementById("username-area").style.display = "none";
    window.localStorage.setItem("username", usernameField.value);
  }

  let user = window.localStorage.getItem("username");
  document.getElementById(
    "levelchoice-heading"
  ).innerText = `Welcome to the game ${user}!`;

  openRandomVideo();
}

let questionArea = document.getElementById("question-area");
let answerArea = document.getElementById("answers-list");
let audioArea = document.getElementById("mp4_src");
let allQuestions;
let current = 0;
let score = 0;
let questionIndex;
let answersDone = [];

/**
 * This function grabs the users choice of questions level.
 *
 * @param {string} levelChoice - level at which the user chooses to play the game
 * @param {number} curr - the number of the current question
 * @returns {array} allQuestions - array of questions used in the quiz
 */
function questionChoice(levelChoice, curr) {
  pauseTheme();
  let userChoice = levelChoice.textContent;
  if (userChoice === "Old Classic Movies") {
    allQuestions = QuestionsMovieSoundsOld;
  } else if (userChoice === "New Movies") {
    allQuestions = QuestionsMovieSoundsNew;
  }

  // Start the quiz
  loadQuestion(curr);

  document.getElementById("total-questions").textContent = allQuestions.length;
  document.getElementById("level").textContent = userChoice;
  document.getElementById("game-area").style.display = "initial";
  document.getElementById("levelchoice-area").style.display = "none";
  localStorage.setItem("userLevel", userChoice);

  return allQuestions;
}

/**
 * This function loads the current question with answers into the game area
 * Adapted from https://www.codehim.com/vanilla-javascript/javascript-multiple-choice-questions-code/
 * @param {number} curr - number variable of the current question
 */
function loadQuestion(curr) {
  let question = allQuestions[curr].movie;
  let questionAudio = document.getElementById("mp4_src");

  questionArea.innerHTML = "";
  questionArea.innerHTML = question;
  questionAudio.setAttribute("src", `assets/audio/${allQuestions[curr].audio}`);

  let answers = allQuestions[curr].answers;

  answerArea.innerHTML = "";

  for (let i = 0; i < answers.length - 1; i += 1) {
    let createList = document.createElement("li");
    let text = document.createTextNode(answers[i]);

    createList.appendChild(text);
    createList.addEventListener("click", checkAnswer(i, answers));

    answerArea.appendChild(createList);
  }
}

/**
 * This function will run when an answer is clicked on. It checks if the clicked answer
 * is the same as the correct answer. Then it checks if that was the last question
 * in the question array. If it is not, then the next question will be loaded,
 * if it is the last question, then it will give feedback to say the game is over.
 * Adapted from https://www.codehim.com/vanilla-javascript/javascript-multiple-choice-questions-code/
 * @param {number} i - index of the answer clicked by the user
 * @param {array} arr - array of possible answers for the current question
 * @returns {function}
 */
function checkAnswer(i, arr) {
  return function () {
    let givenAnswer = i;
    let correctAnswer = arr[arr.length - 1];

    if (givenAnswer === correctAnswer) {
      incrementScore();
    } else {
      incrementWrongAnswer();
    }

    if (current == 0) {
      answersDone.push(current);
    } else {
      answersDone.push(questionIndex);
    }
    // console.log(answersDone);
    if (answersDone.length < allQuestions.length) {
      do {
        questionIndex = Math.floor(Math.random() * allQuestions.length);
      } while (answersDone.includes(questionIndex));
    } else {
      console.log("All questions have been answered");
    }

    if (answersDone.length < allQuestions.length) {
      current += 1;
      document.getElementById("current-question").innerText = current + 1;
      loadQuestion(questionIndex);
    } else {
      questionArea.innerHTML = "Done! Final Score Page is loading ...";
      answerArea.innerHTML = "";
      audioArea.style.display = "none";
      score = document.getElementById("correct-counter").innerText;
      localStorage.setItem("mostRecentScore", score);
      load(gameOver);
    }
  };
}

function update(e) {
  var x = e.clientX || e.touches[0].clientX;
  var y = e.clientY || e.touches[0].clientY;

  document.documentElement.style.setProperty("--cursorX", x + "px");
  document.documentElement.style.setProperty("--cursorY", y + "px");
}

document.addEventListener("mousemove", update);
document.addEventListener("touchmove", update);

/**
 * This function increments the correct score.
 * Adapted from Love Maths project
 */
function incrementScore() {
  let oldscore = parseInt(document.getElementById("correct-counter").innerText);
  document.getElementById("correct-counter").innerText = ++oldscore;
}

/**
 * This function increments the wrong answer counter
 * Adapted from Love Maths project
 */
function incrementWrongAnswer() {
  let oldscore = parseInt(document.getElementById("wrong-counter").innerText);
  document.getElementById("wrong-counter").innerText = ++oldscore;
}

/**
 * This function delays the loading of myURL
 * @param {string} myURL - URL is loaded with time delay
 */
function load(myURL) {
  setTimeout(myURL, 2000);
}

/**
 * This function loads the last page when the game is over
 */
function gameOver() {
  window.location.assign("end_game.html");
}

const videos = document.querySelectorAll(".video");

function openRandomVideo() {
  // Choose a random video to play
  const randomIndex = Math.floor(Math.random() * videos.length);
  const video = videos[randomIndex];

  // Pause all videos and remove the 'playing' class
  videos.forEach((video) => {
    video.pause();
    video.classList.remove("playing");
  });

  // Play the selected video
  video.classList.add("playing");
  video.play();

  // Schedule the next video to play after a random interval
  setTimeout(openRandomVideo, getRandomInterval());

  // Add an event listener to hide the video when it ends
  video.addEventListener("ended", () => {
    video.classList.remove("playing");
  });
}

// Function to get a random interval in milliseconds
function getRandomInterval() {
  // Adjust the range and values as needed
  return Math.floor(Math.random() * (80000 - 30000) + 20000);
  // return Math.floor(Math.random() * (50000 - 30000));
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
  openRandomVideo();
}

// Start the process
// openRandomVideo();
