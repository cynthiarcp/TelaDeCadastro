class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
        ]
    }

    // iniciar a validação de todos os campos
    validate(form) {

        //resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation')

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        // pegar os inputs
        let inputs = form.getElementsByTagName('input');


        // HTMLCollection -> array
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {
            console.log(input);

            // loop em  todas as validações existentes
            for(let i = 0; this.validations.length > i; i++) {
                // verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i])!= null) {
            
                    // data-min-length em -> minlength
                    let method = this.validations[i].replace('data-','').replace('-','');
                    //valor do input
                    let value = input.getAttribute(this.validations[i]);
                    //invocar o método
                    this[method](input, value);

                }
            }
        }, this);

    }

    //verifica se um input tem um número mínimo de caracteres
    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }
    }
//verifica se um input passou do limite de caracteres
    maxlength(input, maxValue) {

    
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
        }
    }

    //valida emails
    emailvalidate(input) {

        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão exemplo@email.com`;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
}

// valida se o campo tem apenas letras
onlyletters(input) {

    let re = /^[A-Za-z]+$/;

    let inputValue = input.value;

    let errorMessage = `Este campo não aceita números nem caracteres especiais `;

    if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage)
    }
}

//verifica se o input é requirido
required(input) {

    let inputValue = input.value;

    if(inputValue === ''){
        let errorMessage = `Este campo é obrigatório`;

        this.printMessage(input, errorMessage)
    }
}

//verifica se dois campos são iguais
equal(input, inputName) {

    let inputToCompare = document.getElementsByName(inputName)[0];

    let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

    if(input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage);
    }
}

//valida o campo de senha
passwordvalidate(input) {
    let charArr = input.value.split("");
    let uppercase = 0;
    let numbers = 0;

    for (let i = 0; i < charArr.length; i++) {
        if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i])) && /[A-Z]/.test(charArr[i])) {
            uppercase++;
        } else if (!isNaN(parseInt(charArr[i]))) {
            numbers++;
        }
    }

    if (uppercase === 0 || numbers === 0) {
        let errorMessage = `A senha precisa de um caractere maiúsculo e um número`;
        this.printMessage(input, errorMessage);
    }
}

// método para imprimir mensagens de erro na tela
printMessage(input, msg) {

    // quantidade de erros
    let errorsQty = input.parentNode.querySelector('.error-validation');

    if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
    }

}

//limpa as validações da tela
cleanValidations(validations) {
        validations.forEach(el => el.remove())
    }
}


let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");
let validator = new Validator ();

// evento que dispara as validações
submit.addEventListener('click', function (e) {

   e.preventDefault(); 

    validator.validate(form);

});