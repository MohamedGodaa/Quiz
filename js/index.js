import { Quiz } from "./quiz.js";
import { Question } from "./question.js";

export const categoryMenu = document.getElementById("categoryMenu");
export const difficultyOptions = document.getElementById("difficultyOptions");
export const questionsNumber = document.getElementById("questionsNumber");
export const startBtn = document.getElementById("startQuiz");
export const quizOptions =document.getElementById('quizOptions');
export const questionsContainer = document.querySelector('.questions-container')
export let question ;
export let quiz ;


startBtn.addEventListener("click", async function(){
    const category = categoryMenu.value;
    const difficulty = difficultyOptions.value;
    const number = questionsNumber.value;

    quiz = new Quiz(category,difficulty,number);
    question = await quiz.getQuestion();
    console.log(question);
    const question1 = new Question(0)
    quizOptions.classList.replace('d-flex','d-none')
    question1.displayQuestion()
})