$(document).ready(function(){

    let endOrContinue = -1;

    let steps = document.querySelector('.steps')
    let fieldsets = document.querySelectorAll('fieldset')

    let numberOfSteps = fieldsets.length
    for (let i=1; i<=fieldsets.length;i++){
        let newStep = document.createElement('li')
        steps.appendChild(newStep)
        newStep.innerText = `Step ${i}`
    }
    let allSteps = steps.querySelectorAll('li')
    allSteps[0].classList.add("is-active")
    allSteps[numberOfSteps-1].innerText = "Complete"

    $(".form-wrapper .button").click(function(){
        if (endOrContinue ===- 1) {
            return false
        }
        let button = $(this);
        let currentSection = button.parents(".section");
        let currentSectionIndex = currentSection.index();
        let currentSectionInput = fieldsets[currentSectionIndex].querySelectorAll('input')
        if (Array.from(currentSectionInput).every(e=>{
                let pattern = RegExp(e.pattern)
                let correctPattern = pattern.test(e.value)
                if (e.value==="" && e.hasAttribute('required') || !correctPattern) {
                    return true
                }
            }) === true) {
            currentSectionInput.forEach(el =>{
                el.classList.add('invalid')
            })
            return false
        }
        if (Array.from(currentSectionInput).every(el =>{
            return el.classList.contains('invalid');

        })) {
            currentSectionInput.forEach(el =>{
                el.classList.remove('invalid')
            })
        }
        let headerSection = $('.steps li').eq(currentSectionIndex);
        currentSection.removeClass("is-active").next().addClass("is-active");
        headerSection.removeClass("is-active").next().addClass("is-active");


        if (endOrContinue === 1) {
            currentSection.removeClass("is-active").next().removeClass("is-active");
            headerSection.removeClass("is-active").next().removeClass("is-active");
            allSteps[numberOfSteps-1].classList.add("is-active")
            fieldsets[numberOfSteps-1].classList.add("is-active")
            currentSectionIndex = numberOfSteps-1;
            endOrContinue = 0;}

        else if(currentSectionIndex === numberOfSteps-1){
            $(document).find(".steps li").first().addClass("is-active");
            $(document).find(".form-wrapper .section").first().addClass("is-active");
            endOrContinue = 1;
        }
    });

    $("#form").on("submit", function (){
        let dataForm = $(this).serialize()

        $.ajax({
            url: '/action.php',
            method: 'post',
            dataType: 'html',
            data: dataForm,
            success: function(data){
                // alert(data);
            }
        });
    })
    let form = document.querySelector("form")
    let FirstQuestion = fieldsets[0]
    let firstAnswer = FirstQuestion.querySelectorAll('input')
    let firstButton = FirstQuestion.querySelector('.button')
    firstAnswer.forEach(element=>{
        element.addEventListener('change', ()=>{
            if (element.value === "No") {
                firstButton.innerText = "Submit"
                endOrContinue = 1;
            }
            if (element.value === "Yes") {
                firstButton.innerText = "Next"
                endOrContinue = 0;
            }
        })
    })
    form.addEventListener('keydown', (e)=>{
        if (e.key === "Enter") {
            e.preventDefault();
        }
    })
});
