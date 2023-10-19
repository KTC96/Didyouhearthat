
// Elements of code where taken from - Code by Marek https://www.codehim.com/vanilla-javascript/javascript-multiple-choice-questions-code/
// Inpsiration and guidance for certain aspect of code were also obtained from the Code Institutes Love Maths game
// and the Movie Quotes Quiz by Jose Maciel https://zemaciel.github.io/project-02/index.html
// Validation of username was adapted from https://www.freecodecamp.org/news/form-validation-with-html5-and-javascript/

// If a user is loading the game for the first time, it will require input of a username.
// The username is stored in localStorage.
// If a user has already provided a username and wants to play again with the same username,
// the user is not required to enter the username again.
if (window.localStorage.getItem("username")) {
 
    document.getElementById("levelchoice-area").style.display = "initial";
    document.getElementById("username-area").style.display = "none";
    let user = window.localStorage.getItem("username");
    document.getElementById("levelchoice-heading").innerText = `Welcome to the game ${user}!`;

} else if (!window.localStorage.getItem("username")) {
   
    const submit = document.getElementById("submit");
    submit.addEventListener('click', validate);

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
        usernameError.setAttribute('aria-hidden', false);
        usernameError.setAttribute('aria-invalid', true);
        usernameError.innerText = "Please enter a username to proceed!";
    } else if (usernameField.value) {
        window.localStorage.setItem("username", usernameField.value);
        document.getElementById("levelchoice-area").style.display = "initial";
        document.getElementById("username-area").style.display = "none";
        window.localStorage.setItem("username", usernameField.value);
    }

    let user = window.localStorage.getItem("username");
    document.getElementById("levelchoice-heading").innerText = `Welcome to the game ${user}!`;

}

let questionArea = document.getElementById('question-area');
let answerArea = document.getElementById('answers-list');
let allQuestions;
let current = 0;
let score = 0;

/**
 * This function grabs the users choice of questions level.
 * 
 * @param {string} levelChoice - level at which the user chooses to play the game
 * @param {number} curr - the number of the current question 
 * @returns {array} allQuestions - array of questions used in the quiz
 */
function questionChoice(levelChoice,curr) {

    let userChoice = levelChoice.textContent;
    if (userChoice === 'Easy') {
        allQuestions = allQuestions1;
    } else if (userChoice === 'Intermediate') {
        allQuestions = allQuestions1;
    } else if (userChoice === 'Advanced') {
        allQuestions = allQuestions1;
    } else if (userChoice === 'Expert') {
        allQuestions = allQuestions1;
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

    let question = allQuestions[curr].question;

    questionArea.innerHTML = '';
    questionArea.innerHTML = question;

    let answers = allQuestions[curr].answers;
    
    answerArea.innerHTML = '';

    for (let i = 0; i < answers.length - 1 ; i += 1) {
        let createList = document.createElement('li');
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

    return function() {
        let givenAnswer = i;
        let correctAnswer = arr[arr.length - 1];

        if (givenAnswer === correctAnswer) {
            incrementScore();
        } else {
            incrementWrongAnswer();
        }

        if  (current < allQuestions.length - 1) {
            current += 1;
            document.getElementById("current-question").innerText = current +1;
            loadQuestion(current);
        } else {
            questionArea.innerHTML = 'Done! Final Score Page is loading ...';
            answerArea.innerHTML = '';
            score = document.getElementById("correct-counter").innerText;
            localStorage.setItem("mostRecentScore", score);
            load(gameOver);
        }
    }; 
}

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
function gameOver () {
    window.location.assign('end_game.html');
}


//List of variables
let questionArea = document.getElementById('question-area');
let answerArea = document.getElementById('answers-list');
let listOfQuestions = [];
let currentQuestion = {};
let questionAudio = document.getElementById('question-audio');
let current = 0;
let score = 0;
let scoreText = document.getElementById("score");
let questionCounter = 0;
let totalQuestions = 7;
let username = '';

