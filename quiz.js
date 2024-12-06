const questions = [
    {
        question: "What is the purpose of a variable in programming?",
        answers: [
            { text: "To store data", correct: true },
            { text: "To execute a function", correct: false },
            { text: "To display output", correct: false },
            { text: "To perform iteration", correct: false },
        ]
    },
    {
        question: "Which of the following is a looping structure in programming?",
        answers: [
            { text: "if-else", correct: false },
            { text: "for", correct: true },
            { text: "switch", correct: false },
            { text: "function", correct: false },
        ]
    },
    {
        question: "What is the output of '5 + \"5\"' in JavaScript?",
        answers: [
            { text: "10", correct: false },
            { text: "55", correct: true },
            { text: "Error", correct: false },
            { text: "NaN", correct: false },
        ]
    },
    {
        question: "Which of the following is a conditional statement?",
        answers: [
            { text: "for", correct: false },
            { text: "if", correct: true },
            { text: "console.log", correct: false },
            { text: "function", correct: false },
        ]
    },
    {
        question: "What is the index of the first element in an array?",
        answers: [
            { text: "1", correct: false },
            { text: "0", correct: true },
            { text: "-1", correct: false },
            { text: "Depends on the programming language", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); // Corrected variable name
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
