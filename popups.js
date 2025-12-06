// ------------------------------
// CLICK SOUND
// ------------------------------
const clickSound = new Audio('sounds/click.mp3');
document.addEventListener('click', (e) => {
  if(e.target.closest('button')) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});

// ------------------------------
// ELEMENT SELECTORS
// ------------------------------
const gameButton = document.querySelector('.game-button');
const gamePopup = document.getElementById('popupRectangle');
const gameClose = gamePopup.querySelector('.closeButton');
const startQuizButton = document.getElementById('startQuiz');

const quizPopup = document.getElementById('popupQuiz');
const quizClose = document.getElementById('closeQuiz');
const questionText = document.getElementById('questionText');
const optionsDiv = document.getElementById('options');

const shortcutPopup = document.getElementById('Shortcut');
const shortcutClose = document.getElementById('closeRules');

const timerDisplay = document.getElementById('timer');

// ------------------------------
// TIMER
// ------------------------------
let timer;
let timeElapsed = 0;

function startTimer() {
  timeElapsed = 0;
  updateTimerDisplay();
  timer = setInterval(() => {
    timeElapsed++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeElapsed / 60)).padStart(2,'0');
  const seconds = String(timeElapsed % 60).padStart(2,'0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

// ------------------------------
// GAME POPUP LOGIC
// ------------------------------
gameButton.addEventListener('click', () => {
  gamePopup.style.display = 'flex';
});

gameClose.addEventListener('click', () => {
  gamePopup.style.display = 'none';
});

// ------------------------------
// SHORTCUT POPUP LOGIC
// ------------------------------
document.addEventListener('click', (e) => {
  if (e.target.closest('.openRules')) {
    shortcutPopup.style.display = 'flex';
  }
});

shortcutClose.addEventListener('click', () => {
  shortcutPopup.style.display = 'none';
});

// ------------------------------
// QUIZ POPUP LOGIC
// ------------------------------
quizClose.addEventListener('click', () => {
  quizPopup.style.display = 'none';
  stopTimer();
});

// ------------------------------
// QUIZ QUESTIONS
// ------------------------------
const quizQuestions = [
  { question: "Derivative of 2x²+3x-5?", options: ["2x", "4x+3", "4x+9", "7x-5"], answer: 1 },
  { question: "Derivative of 2cos(x)?", options: ["-2sin(x)", "sin(x)", "tan(x)", "1"], answer: 0 },
  { question: "Absolute maximum and minimum of q(x) = x²/(x-2) between 3 and 7?", options: ["Maximum = 2, Minimum = -6", "Maximum = 9, Minimum = 0", "Maximum = 1, Minimum = -4", "Maximum = 8, Minimum = 0"], answer: 1 },
  { question: "Find the absolute maximum and minimum of f(x) = x³ - 3x² + 4 on [0, 3]?", options: ["Maximum = 4, Minimum = 0", "Maximum = 7, Minimum = 0", "Maximum = 4, Minimum = -1", "Maximum = 3, Minimum = -2"], answer: 2 },
  { question: "Evaluate lim(x→0) (sin(3x)/x) using L'Hôpital's Rule?", options: ["3", "0", "1", "∞"], answer: 0 },
  { question: "∫(2x³ - 5x² + 4) dx?", options: ["(1/2)x⁴ - (5/3)x³ + 4x + C", "(1/2)x³ - (5/2)x² + 4x + C", "(1/2)x⁴ - 5x³ + 4x + C", "2x⁴ - (5/3)x³ + 4x + C"], answer: 0 },
  { question: "If x² + y² = 25, find dy/dx using implicit differentiation?", options: ["-x/y", "y/x", "x/y", "-y/x"], answer: 0 },
  { question: "Find the critical points of g(x) = x⁴ - 4x³ + 6?", options: ["x = 0, 3", "x = 1, 2", "x = 2, 3", "x = -1, 2"], answer: 1 },
  { question: "Evaluate lim(x→∞) (3x² + 5)/(2x² - 7) using L'Hôpital's Rule?", options: ["3/2", "∞", "0", "1"], answer: 0 },
  { question: "∫(cos(x) - 2x) dx?", options: ["sin(x) - x² + C", "cos(x) - x² + C", "sin(x) + 2x + C", "-sin(x) - x² + C"], answer: 0 },
  { question: "If x²y + y³ = 6, find dy/dx using implicit differentiation?", options: ["-2x/y - 3y²", "-2x/y + 3y²", "-2xy/(x² + 3y²)", "2xy/(x² + 3y²)"], answer: 2 }
];

let currentQ = 0;
let score = 0;

// ------------------------------
// LOAD QUESTION
// ------------------------------
function loadQuestion() {
  const q = quizQuestions[currentQ];
  questionText.textContent = q.question;
  optionsDiv.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.type = 'button';
    btn.addEventListener('click', () => selectAnswer(i, btn));
    optionsDiv.appendChild(btn);
  });
}

// ------------------------------
// SELECT ANSWER
// ------------------------------
function selectAnswer(index, btn) {
  const buttons = optionsDiv.querySelectorAll('button');
  buttons.forEach(b => b.style.outline = '');
  btn.style.outline = '3px solid rgba(0,0,0,0.3)';

  if (index === quizQuestions[currentQ].answer) score++;

  setTimeout(goToNextQuestion, 200);
}

// ------------------------------
// NEXT QUESTION
// ------------------------------
function goToNextQuestion() {
  currentQ++;

  if(currentQ < quizQuestions.length) {
    loadQuestion();
  } else {
    stopTimer();

    const minutes = String(Math.floor(timeElapsed / 60)).padStart(2,'0');
    const seconds = String(timeElapsed % 60).padStart(2,'0');

    questionText.innerHTML = `You finished the quiz! Correct answers: ${score} / ${quizQuestions.length}.<br>
Time spent:<br>${minutes}:${seconds}`;
    optionsDiv.innerHTML = '';
  }
}

// ------------------------------
// START QUIZ
// ------------------------------
startQuizButton.addEventListener('click', () => {
  gamePopup.style.display = 'none';
  quizPopup.style.display = 'flex';
  currentQ = 0;
  score = 0;
  loadQuestion();
  stopTimer();
  startTimer();
});
