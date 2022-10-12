// Starts the game
function startGame() {
  startDiv.setAttribute("class", "hide");
  questionsDiv.removeAttribute("class");
  highScoresDiv.setAttribute("class", "hide");
  startCountdown();
  changeQuestions();
}
// Starts the countdown
function startCountdown() {
  var timeInterval = setInterval(function () {
    secondsLeft--;
    countdownEl.textContent = "Time Left: " + secondsLeft;

    if (secondsLeft <= 0 && questionIndex !== questions.length) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

// Event listeners
startButton.addEventListener("click", startGame);

