"use strict"

//praktiskai, klase yra svaresnis ir aiskesnis objekto aprasymas?
//kaip suprantu, galima būtų daryt ir su object, bet reiktu apsirašyt kiekvieną mygtuką
//kas būtųlaiko švaistymas ir neefektyvus kodo rašymas, todėl ir naujama klasė, kad nereiktų
//kartoti kodo?
//sukurian nauja klasės atvejį (naują klasę), tai sukuriam naują objektą ir kai jį sukuriam, per klasę perduodam parametrus, per konstruktorių

class Calculator {
    constructor(previousInput, currentInput) {
        this.previousInput = previousInput;
        this.currentInput = currentInput;
        this.clearInput();
    }

    updateDisplay() {
        this.currentInput.innerText = this.currentDisplayedInput;
    }

    clearInput() {
        this.currentDisplayedInput = '';
        this.previousDisplayedInput = '';
        this.operand = undefined;
    }

    getNumberOnClick(number) {
        //if . was clicked, or already have . - then just return and stop function for '.' button
        if(number === '.' && this.currentDisplayedInput.includes('.')) {
            return;
        }
        this.currentDisplayedInput = this.currentDisplayedInput.toString() + number.toString();
    }

    getOperandOnClick(operation){

    }

    deleteOneNumberAtTime(){

    }

    calculate() {

    }
}

const previousInput = document.querySelector(".upper");
const currentInput = document.querySelector(".lower");
const numberButtons = document.querySelectorAll(".calc-number");
const operandButtons = document.querySelectorAll(".calc-operand");
const clearButton = document.querySelector(".calc-clear");
const deleteButton = document.querySelector(".calc-delete");
const equalButton = document.querySelector(".calc-equal");

//Create a new calculator
const calculator = new Calculator(previousInput, currentInput);

numberButtons.forEach(button => {
    //whenever I click on the button, I want do something
    button.addEventListener("click", () => {
        //add the number, whatever is inside that button
        calculator.getNumberOnClick(button.innerText);
        calculator.updateDisplay();
    })
})

operandButtons.forEach(button => {
    //whenever I click on the button, I want do something
    button.addEventListener("click", () => {
        //add the number, whatever is inside that button
        calculator.getOperandOnClick(button.innerText);
        calculator.updateDisplay();
    })
})

// the 'new' keyword
// - creates a new empty object {}
// - sets the value of 'this' to be the new empty object
// - calls the constructor method

//constructor or constructor function - responsible for creating new object. It's just for object properties

//method - aprašomi po konstruktorium