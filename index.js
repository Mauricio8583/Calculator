const numbers = document.querySelectorAll("#number");
const operations = document.querySelectorAll("#operator");
const equal = document.getElementById("equals");               
const del = document.getElementById("delete");                
const clear = document.getElementById("clear");
let checkDot = false;      // Checa se o "ponto" ja foi digitado no numero //Check if the "dot" is already in the number 
let first_number = " ";
let current_number = " ";        
let operator = " ";
let result = null;

const first_operand = document.getElementById("first-operand");
const current_operand = document.getElementById("current-operand");                   

function appendNumber(number){
    current_operand.innerText += number;                  // Função que coloca os numeros informados para a calculadora  // Function that put the informed numbers to the calculator
    current_number = current_operand.innerText;
    
}

function changePlace(operation){
    first_number += current_number + " " + operation + " ";
    first_operand.innerText = first_number;                   // Função que muda os numeros de lugar na calculadora quando o operador é informado  // Function that changes the numbers in the calculator when the operator is informed
    current_operand.innerText = " ";
    current_number = " ";
    checkDot = false;
    
}

function pressKey(key){
    numbers.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    })
}
                                                       // Funções que imprimem os numeros na tela da calculadora pelo teclado // Functions that print the numbers in the calculator screen by the keyboard
function pressOperation(key){
    operations.forEach(button => {
        if(button.innerText === key){
            button.click();
        }
    })
}

function mathmatics(){
    if(operator === "+"){
        result = parseFloat(result) + parseFloat(current_number);
    }
    else if (operator === "-"){
        result = parseFloat(result) - parseFloat(current_number);
    }                                                              // Função que realiza os calculos matematicos // Function that made the mathmatic calculation
    else if (operator === "*"){
        result = parseFloat(result) * parseFloat(current_number);
    }
    else if(operator === "/"){
        result = parseFloat(result) / parseFloat(current_number);
    }
}


numbers.forEach(button => {
    button.addEventListener("click", (e) => {
        if(e.target.innerText === "." && !checkDot){
            checkDot = true;
        }
        else if(e.target.innerText === "." && checkDot){   // Click dos numeros na calculadora // Numbers "click" in the calculator
            return;
        }
        current_number = e.target.innerText;
        appendNumber(current_number);
        
    })
})

operations.forEach(button => {
    button.addEventListener("click", (e) => {
        if(!current_number){
            result;
            checkDot = false;
        } 
        const operation = e.target.innerText;
        if(first_number !== " " && current_number !== " "  && operator !== " "){
            mathmatics();
        }   
        else{                                                                     // Click dos operadores na calculadora  // Operators "click" in the calculator
            result = parseFloat(current_number);
        }
        operator = operation;
        changePlace(operation);
           

    })
})

clear.addEventListener("click", () => {
    first_operand.innerText = " ";
    current_operand.innerText = " ";        // Click do botão de limpar "AC" // Clean "click" button "AC"
    first_number = " ";
    current_number = " ";
})

del.addEventListener("click", () => {
    current_operand.innerText = " ";   // Click do botão de delete "Del" // Delete "click" button "del"
    current_number = " ";
})

equal.addEventListener("click", (e) => {
    if(first_number !== " " && current_number !== " " && operator !== " "){
        checkDot = false;
        mathmatics();
        current_operand.innerText = result;
        first_operand.innerText = " ";                                       // Click do botão igual // Equal "click" button
        first_number = " ";
        current_number = result;                        
    }
    else{
        return;
    }
   
})

window.addEventListener("keydown", (e) => {
    if(e.key === "0" || e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4" || e.key === "5" || e.key === "6" || e.key === "7" || e.key === "8" || e.key === "9" || e.key === "."){
        pressKey(e.key);
    } 
    else if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/"){
        pressOperation(e.key);
    } 
    else if(e.key === "Enter" || e.key === "="){                                // Habilita o teclado // Keyboard Enable
        equal.click();
    }
})
