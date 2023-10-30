    const startButton = document.getElementById("start-button");
    const quizScreen = document.getElementById("quiz-screen");
    const endScreen = document.getElementById("end-screen");
    const choices = document.getElementById("choices");
    const scoreDisplay = document.getElementById("score");
    const initialsInput = document.getElementById("initials");
    const saveScoreButton = document.getElementById("save-score");

    let currentQuestion = 0;
    let score = 0;
    let timeLeft = 60;
    let timer;

    const questions = [
        {
            question: "What is JavaScript?",
            choices: ["Just Another Script", "Java Source Code", "A programming language"],
            answer: 2
        },
        {
            question: "What is HTML?",
            choices: ["Hyper Transfer Markup Language", "Hyper Text Markup Language", "High Transfer Markup Language"],
            answer: 1
        },
        {
            question: "What is CSS?",
            choices: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet"],
            answer: 0
        },

        {
            question: "What are APIs?",
            choices: ["Another Programming Interface", "A Programming Language", "Application Programming Interface"],
            answer: 4
        },
        {
            question: "Do you need to insert a link for Google Fonts?",
            choices: ["True" , "False"],
            answer: 0
        }
    ];

    function startQuiz() {
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("quiz-screen").style.display = "block";
        loadQuestion(currentQuestion);
        startTimer();
         console.log(startQuiz);
    }

    function loadQuestion(questionIndex) {
        if (questionIndex < questions.length) {
            const question = questions[questionIndex];
            document.querySelector("#quiz-screen h2").textContent = question.question;
            choices.innerHTML = "";
            question.choices.forEach((choice, index) => {
                const li = document.createElement("li");
                li.textContent = choice;
                li.addEventListener("click", () => checkAnswer(questionIndex, index));
                choices.appendChild(li);
            });
        } else {
            endQuiz();
        }
    }

    function checkAnswer(questionIndex, selectedChoice) {
        const correctAnswer = questions[questionIndex].answer;
        if (selectedChoice === correctAnswer) {
            score++;
        } else {
            timeLeft -= 10; 
        }

        currentQuestion++;
        loadQuestion(currentQuestion);
    }

    function endQuiz() {
        clearInterval(timer);
        quizScreen.style.display = "none";
        endScreen.style.display = "block";
        scoreDisplay.textContent = score;
    }

    function startTimer() {
        timer = setInterval(function () {
            if (timeLeft <= 0) {
                endQuiz();
            } else {
                timeLeft--;
            }
        }, 1000);
    }

    saveScoreButton.addEventListener("click", function () {
        const initials = initialsInput.value;
        if (initials) {
            alert(`Score saved: ${score} with initials ${initials}`);
        }
    });

    startButton.addEventListener("click", startQuiz);
