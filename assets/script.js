// Variables
// Start Variables
var startButton = document.getElementById("startButton");
var countdownEl = document.getElementById("countdown");
var secondsLeft = 75;
var start = document.getElementById("start-page");
var scoresPage = document.getElementById("scores-page");
// Question/Answer Variables
var questionsPage = document.getElementById("questions-page");
var answerChoices = document.getElementById("answer-choices");
var rightOrWrong = document.getElementById("correctIncorrect");
var questionIndex = 0;
var questions = [
  {
    question: "1. HTML stands for ___",
    answers: [
      "A. HyperText Markup Language",
      "B. Hypertext Machine Language",
      "C. HyperText Marking Language",
      "D. HighText Marking Language",
    ],
    correctAnswer: "A. HyperText Markup Language",
  },
  {
    question: "2. CSS stands for ____.",
    answers: [
      "A. Cascading Simple Sheets",
      "B. Cascading Sheet of Sheets",
      "C. Controlling Style Sheet",
      "D. Cascading Style Sheets",
    ],
    correctAnswer: "D. Cascading Style Sheets",
  },
  {
    question:
      "3. Which of the following is used for inserting the largest heading in HTML?",
    answers: ["A. head", "B. <h1>", "C. <h6>", "D. heading"],
    correctAnswer: "B. <h1>",
  },
  {
    question: "4. What kind of language is JavaScript?",
    answers: [
      "A. Object-Based",
      "B. Procedural",
      "C. Object-Oriented",
      "D. None of the Above",
    ],
    correctAnswer: "C. Object-Oriented",
  },
  {
    question: "5. What punctuation is used to create comments in JavaScript?",
    answers: ["A. /*", "B. //", "C. */", "D. //**"],
    correctAnswer: "B. //",
  },
];
// Variables for High Scores page
var end = document.getElementById("end-page");
var highScoreTable = document.getElementById("highScoresTable");
var scoresPage = document.getElementById("scores-page");
var clearHighScores = document.getElementById("clear-high-scores");
var viewHighScoresLink = document.getElementById("highScoresLink");
var goBackButton = document.getElementById("go-back");
var storedHighScores = JSON.parse(localStorage.getItem("highScoreList")) || [];
var highScoreList = {
  name: "",
  score: 0,
};
// Variable for final score
var scoreSpan = document.getElementById("finalScore");

// Functions
// Starts the game
function startGame() {
  start.setAttribute("class", "hide");
  questionsPage.removeAttribute("class");
  scoresPage.setAttribute("class", "hide");
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
      endGame();
    }
  }, 1000);
}

// Runs through questions
function changeQuestions() {
  var currentQuestion = questions[questionIndex];
  var questionDisplay = document.getElementById("question");
  questionDisplay.textContent = currentQuestion.question;

  answerChoices.textContent = " ";

  currentQuestion.answers.forEach(function (answer) {
    var answerButton = document.createElement("button");
    answerButton.setAttribute("class", "choice");
    answerButton.setAttribute("value", answer);
    answerButton.textContent = answer;
    answerButton.onclick = checkAnswer;
    answerChoices.appendChild(answerButton);
  });
}

function checkAnswer() {
  if (this.value !== questions[questionIndex].correctAnswer) {
    secondsLeft -= 10;
    rightOrWrong.textContent = "Incorrect.";
  } else {
    rightOrWrong.textContent = "Correct!";
  }
  questionIndex++;
  if (questionIndex == questions.length) {
    endGame();
  } else {
    changeQuestions();
  }
}

// Functionality for end page
function endGame() {
  var finalScore = secondsLeft;

  questionsPage.setAttribute("class", "hide");
  end.removeAttribute("class");
  countdownEl.setAttribute("class", "hide");

  scoreSpan.textContent = finalScore;

  submitButton.addEventListener("click", function () {
    userInitials = document.querySelector("#initials").value;
    var userScore = {
      initials: userInitials,
      score: finalScore,
    };

    storedHighScores.push(userScore);
    storedHighScores.sort(compare);
    localStorage.setItem("highScoreList", JSON.stringify(storedHighScores));

    end.setAttribute("class", "hide");
    scoresPage.removeAttribute("class");

    for (var i = 0; i < storedHighScores.length; i++) {
      var row = document.createElement("tr");
      var cell = document.createElement("td");
      cell.textContent =
        i +
        1 +
        ". " +
        storedHighScores[i].initials +
        " " +
        storedHighScores[i].score;
      row.appendChild(cell);
      highScoreTable.appendChild(row);
    }
  });
}
// Functionality for High Scores Page
function compare(player1, player2) {
  return player2.score - player1.score;
}

function clearStorage() {
  localStorage.clear();
}

function viewHighScores() {
  start.setAttribute("class", "hide");
  questionsPage.setAttribute("class", "hide");
  end.setAttribute("class", "hide");
  scoresPage.removeAttribute("class");
  countdownEl.setAttribute("class", "hide");
  for (var i = 0; i < storedHighScores.length; i++) {
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    cell.textContent =
      i +
      1 +
      ". " +
      storedHighScores[i].initials +
      " " +
      storedHighScores[i].score;
    row.appendChild(cell);
    highScoreTable.appendChild(row);
  }
}

function goBack() {
  document.location.reload();
}

// Event listeners
startButton.addEventListener("click", startGame);
clearHighScores.addEventListener("click", clearStorage);
viewHighScoresLink.addEventListener("click", viewHighScores);
goBackButton.addEventListener("click", goBack);
