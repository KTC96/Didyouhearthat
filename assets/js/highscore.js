// High Scores

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Add the most recent score to the high scores array
if (mostRecentScore && user) {
  const newScore = {
    score: mostRecentScore,
    user: user,
  };

  highScores.push(newScore);

  highScores.sort((a, b) => b.score - a.score);

  highScores = highScores.slice(0, 3);

  localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Function to display high scores on the highscores.html page
function displayHighScores() {
  const highScoresList = document.getElementById("high-scores-list");

  highScoresList.innerHTML = "";

  highScores.forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${score.user}: ${score.score}`;
    highScoresList.appendChild(listItem);
  });
}

displayHighScores();
