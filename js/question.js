import { question , quizOptions , quiz , questionsContainer, categoryMenu, difficultyOptions } from "./index.js";


export class Question {
    constructor(index)
    {
        this.question = question[index].question;
        this.category = question[index].category;
        this.answer = question[index].correct_answer;
        this.index = index;
        this.wrongAnswer =question[index].incorrect_answers;
        this.allAnswer = this.getChoiceReady();
        this.answered = false ;
    }
    getChoiceReady()
    {
        return this.wrongAnswer.concat(this.answer).sort()
    }

    displayQuestion()
    {
        const questionMarkUp =`
            <div
        class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
        >
        <div class="w-100 d-flex justify-content-between">
            <span class="btn btn-category">${this.category}</span>
            <span class="fs-6 btn btn-questions"> ${this.index + 1 } of ${question.length } Questions</span>
        </div>
        <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
        <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
        ${this.allAnswer.map((choice) => `<li>${choice}</li>`).join('')}
        </ul>
        <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${quiz.score}
        </h2>        
        </div>`

        questionsContainer.innerHTML = questionMarkUp ;
        const allChoice = document.querySelectorAll(".question ul li");
        for (let i = 0; i < allChoice.length; i++) {
            allChoice[i].addEventListener("click",(e) => {
                this.checkAnswer(e)
            })
        }
    }

    checkAnswer(e)
    {   
        if(!this.answered){
            this.answered = true
            if(e.target.innerHTML == this.answer)
            {
                e.target.classList.add('correct','animate__animated','animate__flipInY')
                quiz.score += 1
            }else{
                e.target.classList.add("wrong", "animate__animated", "animate__shakeX");
            }
    
            this.animateQuestion(e.target , 500)
        }
    }
    animateQuestion(element,time)
    {
        setTimeout(() => {
            element.closest('.question').classList.replace('animate__bounceIn','animate__bounceOutLeft');
            setTimeout(() => {
                this.nextQuestion()
            }, time)
        },time)
    }

    nextQuestion()
    {
        this.index++;
        if(this.index > question.length - 1){
            questionsContainer.innerHTML = quiz.endQuiz();
            const tryAgain =document.querySelector('.again');
            tryAgain.addEventListener('click',function(){
                questionsContainer.querySelector('.question').classList.replace("d-flex", "d-none");
                categoryMenu.value="";
                difficultyOptions.value='easy';
                questionsNumber.value='';
                quizOptions.classList.replace("d-none", "d-flex");
            })
            return
        }
        const newQuestion = new Question(this.index)
        newQuestion.displayQuestion();
    }
}