// Variables stored in local Storage are retrieved 
// Elements are assigned variables so they can be filled with text content.
let finalScore = document.getElementById('final-score');
let finalScoreUser = document.getElementById('final-score-user');
let mostRecentScore = localStorage.getItem("mostRecentScore");
let userLevel = localStorage.getItem("userLevel");
let user = window.localStorage.getItem("username");

// Set personalized content of text fields on final page
finalScoreUser.innerText = `Hi ${user}! Your final score was:` ;
finalScore.innerText = `${mostRecentScore} @ ${userLevel} Level` ;

// If statement designed to display a custom message depending on the users score
if (userLevel == 'Easy') {
    if (mostRecentScore < 4) {
        document.getElementById('final-message').innerText = "Start Exploring!! There is so much more to learn!";
    } else if (mostRecentScore <= 8) {
        document.getElementById('final-message').innerText = "Nice work! See if you can improve!";
    } else {
        document.getElementById('final-message').innerText = "Excellent result! Why not try the next level?";
    }
} else if (userLevel == 'Intermediate') {
    if (mostRecentScore < 4) {
        document.getElementById('final-message').innerText = "Good progress!! Keep learning!";
    } else if (mostRecentScore <= 8) {
        document.getElementById('final-message').innerText = "Take out a map. See if you can improve!";
    } else {
        document.getElementById('final-message').innerText = "Excellent result! Why not try the next level?";
    }
} else if (userLevel == 'Advanced') {
    if (mostRecentScore < 4) {
        document.getElementById('final-message').innerText = "Ask for a globe for Christmas and keep learning!";
    } else if (mostRecentScore <= 8) {
        document.getElementById('final-message').innerText = "Check out a map! See if you can figure out the answers!";
    } else {
        document.getElementById('final-message').innerText = "Excellent result! Are you ready to be an expert?";
    }
} else if (userLevel == 'Expert') {
    if (mostRecentScore < 4) {
        document.getElementById('final-message').innerText = "You are almost an expert!! Keep at it!";
    } else if (mostRecentScore <= 8) {
        document.getElementById('final-message').innerText = "Wow!! You probalby love studying maps!!";
    } else {
        document.getElementById('final-message').innerText = "Amazing!! Do you know the capitals of the remaining 155 countries aswell?";
    }
}

const playAgainSameUser = document.getElementById("play-again-same-user");
playAgainSameUser.innerHTML = `<i class="fa-solid fa-rotate-left"></i> Play again as ${user}` ;

const playagain = document.getElementById("play-again-btn");
playagain.addEventListener('click', returntostart);

/**
 * This function allows a user to clear the username stored and start the game over
 * with a new username.
 * @param {event} e - event of a click
 */
function returntostart(e) {
    e.preventDefault();
    localStorage.clear();
    load(startOver);
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
function startOver () {
    window.location.assign('index.html');
}