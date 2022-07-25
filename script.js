"use strict"

//sukurian nauja klasės atvejį (naują klasę), tai sukuriam naują objektą ir kai jį sukuriam, per klasę perduodam parametrus, per konstruktorių

class Calculator {
    constructor(previousInput, currentInput) {
        this.previousInput = previousInput;
        this.currentInput = currentInput;
        this.clearInput();
    }

    getNumber(number) {
        //additional function for number separation
        const stringNumber = number.toString(); //convert to string for number splitting on .
        const integerNumbers = parseFloat(stringNumber.split('.')[0]); //[0] - first portion of array
        const decimalNumbers = stringNumber.split('.')[1]; //[1] - second portion of array
        
        var integerDisplay;

        //if not a number (if . or nothing )
        if(isNaN(integerNumbers)) {
            integerDisplay = '';
        } else {
            //maximumFractionDigits: 0 - to be sure that there isn't any decimal places
            integerDisplay = integerNumbers.toLocaleString('en', {maximumFractionDigits: 0});
        }
        //if there is any decimal . 
        if(decimalNumbers != null) {
            return `${integerDisplay}.${decimalNumbers}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentInput.innerText = this.getNumber(this.currentDisplayedInput);
        //if there is an operation, show previous input number and the operand symbol
        if(this.operand != null) {
            this.previousInput.innerText = `${this.getNumber(this.previousDisplayedInput)} ${this.operand}`;
        } else {
            this.previousInput.innerText = ''
        }
        
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

    getOperandOnClick(operand){
        //if current input empty - when don't let execute any further code
        if(this.currentDisplayedInput === ''){
            return;
        }
        //if previous operand not empty - when do the calculation
        if(this.previousDisplayedInput !== '') {
            this.calculate();
        }
        this.operand = operand;
        //while done typing current numbers, recycle, clear the current input, and move it to the upper part of display
        this.previousDisplayedInput = this.currentDisplayedInput;
        this.currentDisplayedInput = '';
    }

    deleteOneNumberAtTime(){
        //slice last value from string and delete - from start of the string (0) all the way to the second last number (-1)
        this.currentDisplayedInput = this.currentDisplayedInput.toString().slice(0, -1);

    }

    calculate() {
        var calculation; //result
        var previousInputValue = parseFloat(this.previousDisplayedInput);
        var currentInputValue = parseFloat(this.currentDisplayedInput);
        //if one of the inputs empty - cancel function
        if(isNaN(previousInputValue) || isNaN(currentInputValue)) {
            return;
        }
        //switch - do many statements on single object - similar to if
        switch (this.operand) {
            //if operand '+' - break to not follow ant other case statements
            case '+':
                calculation = previousInputValue + currentInputValue;
                break;
            case '-':
                calculation = previousInputValue - currentInputValue;
                break;
            case '*':
                calculation = previousInputValue * currentInputValue;
                break;
            case '/':
                calculation = previousInputValue / currentInputValue;
                break;
            //in none of the symbols match the operation - then just don't do any calculation
            default:
                return;
        }
        this.currentDisplayedInput = calculation;
        this.operand = undefined;
        this.previousDisplayedInput = '';
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
    });
});

operandButtons.forEach(button => {
    //whenever I click on the button, I want do something
    button.addEventListener("click", () => {
        //add the number, whatever is inside that button
        calculator.getOperandOnClick(button.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener("click", button => {
    calculator.calculate();
    calculator.updateDisplay();
});

clearButton.addEventListener("click", button => {
    calculator.clearInput();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
    calculator.deleteOneNumberAtTime();
    calculator.updateDisplay();
});



// the 'new' keyword
// - creates a new empty object {}
// - sets the value of 'this' to be the new empty object
// - calls the constructor method

//constructor or constructor function - responsible for creating new object. It's just for object properties

//method - after constructor