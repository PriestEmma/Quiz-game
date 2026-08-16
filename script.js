const quizQuestions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'London', correct: false },
      { text: 'Berlin', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Madrid', correct: false },
    ],
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: [
      { text: 'Venus', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Jupiter', correct: false },
      { text: 'Saturn', correct: false },
    ],
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Arctic Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true },
    ],
  },
  {
    question: 'Which of these is NOT a programming language?',
    answers: [
      { text: 'Java', correct: false },
      { text: 'Python', correct: false },
      { text: 'Banana', correct: true },
      { text: 'JavaScript', correct: false },
    ],
  },
  {
    question: 'What is the chemical symbol for gold?',
    answers: [
      { text: 'Go', correct: false },
      { text: 'Gd', correct: false },
      { text: 'Au', correct: true },
      { text: 'Ag', correct: false },
    ],
  },
];

const startBtn = document.getElementById('btn');
const restartBtn = document.getElementById('restart');
const currentQuestionIndex = document.getElementById('current-question');
const startContainer = document.querySelector('.hero-content');
const container = document.querySelector('.container-lg');
const question = document.getElementById('question-head');
let questionScore = document.getElementById('score');
const progress = document.getElementById('progress');
const totalQuestion = document.getElementById('total-question');
const quizOptions = document.getElementById('question-options');

let currentQuestionInt = 0;
let score = 0;
let maxNum = quizQuestions.length - 1;
totalQuestion.textContent = quizQuestions.length;

function startQuiz(e) {
  container.classList.add('active');
  document.querySelector('.questions').style.display = 'block';
  startContainer.style.display = 'none';

  displayQuestion();
}

function restartQuiz() {
  container.classList.remove('active');
  startContainer.classList.remove('hide');
  startContainer.style.display = 'block';

  // Reset the Screens
  startContainer.style.display = 'block';

  document.querySelector('.finish-container').style.display = 'none';

  // Reset Quiz values
  currentQuestionInt = 0;
  score = 0;
  questionScore.textContent = 0;
  console.log(container.classList);
}

function displayQuestion(e) {
  // Displays the question and question answer
  // Gets the index of the array
  const currentQuestion = quizQuestions[currentQuestionInt];

  // Shows the question from the index
  question.textContent = currentQuestion.question;

  // Gets the  answers objects and stores them in an array
  const currentAnswer = currentQuestion.answers;

  // Resets button after user has picked an answer
  quizOptions.innerHTML = '';

  // Changes question number
  currentQuestionIndex.textContent = currentQuestionInt + 1;

  // Loop through the answer array and create buttons
  currentAnswer.forEach((answer) => {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = answer.text;
    quizOptions.appendChild(button);

    button.dataset.correct = answer.correct;

    quizOptions.addEventListener('click', CheckUserOption);

    // Progress bar

    const progressPercent = (currentQuestionInt / quizQuestions.length) * 100;

    progress.style.width = progressPercent + '%';
  });
}

function disableButton(e) {
  // Disables button when user picks option
  let allButtons = Array.from(e);
  allButtons.forEach((button) => {
    button.disabled = true;
  });
}

function CheckUserOption(e) {
  const UserAnswer = e.target;
  const allButton = e.target.parentElement.children;

  const isCorrect = e.target.dataset.correct === 'true';

  Array.from(allButton).forEach((button) => {
    if (button.dataset.correct === 'true') {
      if (isCorrect) {
        disableButton(allButton);

        UserAnswer.classList.add('correct');
      } else if (UserAnswer.dataset.correct !== 'true') {
        disableButton(allButton);

        UserAnswer.classList.add('wrong');
        button.classList.add('correct');
      } else {
        disableButton(allButton);

        UserAnswer.classList.add('wrong');
      }
    }
  });

  UpdateScore(isCorrect);
  nextQuestion(UserAnswer);
}

function nextQuestion(isClicked) {
  if (isClicked) {
    setTimeout(() => {
      if (currentQuestionInt < maxNum) {
        currentQuestionInt++;
        score++;
        displayQuestion();
      } else if (score === maxNum) {
        QuizFinished();
      }
    }, 1000);
  }
}

function QuizFinished() {
  document.querySelector('.questions').style.display = 'none';
  document.querySelector('.hero-content').style.display = 'none';
  document.querySelector('.finish-container').style.display = 'block';

  document.querySelector('.text-p').textContent =
    `You scored ${questionScore.textContent} out of ${quizQuestions.length}`;

  const userScore = questionScore.textContent;
  const p = document.querySelector('.userScore');
  p.classList.add('finish-text');

  if (Number(userScore) === 0) {
    p.textContent = "Keep Studying, You'll get better!";
  } else if (Number(userScore) === quizQuestions.length) {
    p.textContent = 'Perfect! You are a genius';
  } else if (Number(userScore) > 0) {
    p.textContent = 'Good effort! Keep learning!';
  }

  restartBtn.addEventListener('click', restartQuiz);
}

function UpdateScore(isCorrect) {
  if (isCorrect) {
    questionScore.textContent++;
  } else {
    questionScore.textContent = questionScore.textContent;
  }
}

quizOptions.addEventListener('click', CheckUserOption);

// startQuiz();

// Event listeners
startBtn.addEventListener('click', startQuiz);
