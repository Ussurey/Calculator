class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    checkKey(key) {
        console.log('previousOperand = '+ this.previousOperand);
        console.log('currentOperand = '+ this.currentOperand);
        console.log('operation = '+ this.operation);
        if (key >= '0' && key <= '9') {
            this.appendNumber(key);
        }
        else if (key == 'Enter'){
            this.readyToInput = false;
            this.compute();
        }
        else if (key == '+' || key == '-' || key == '*' || key == '÷') {
            this.chooseOperation(key);
        }
        else {
            return;
        }
        this.updateDisplay();    
    
    }
    clear() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }
    delete() {
        let tempStr = this.currentOperand.toString();
        if (tempStr.length == 0) return;
           this.currentOperand = tempStr.slice(0,tempStr.length-1);
    }
    appendNumber(number) {
        if (this.readyToInput == false){
            this.clear();
            this.readyToInput = true;
        }
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        if (number === '0' && parseFloat(this.currentOperand) == 0 && !this.currentOperand.includes('.') ) {
            return;
        }
        if (parseFloat(this.currentOperand) != 0 || this.currentOperand.includes('.') || number == '.') {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        else {
            this.currentOperand = number.toString();    
        }
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.currentOperand !== '') {
            this.compute();

        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.readyToInput = true;

    }
    compute() {
        let computation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if (isNaN(prev)) {
            return;
        }
        if (isNaN(current)) {
            current = prev; 
            this.readyToInput = true;
        }
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / curren;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        console.log('currentOperand = '+this.currentOperand);
        console.log('previousOperand = '+this.previousOperand);

    }
    updateDisplay() {
        console.log('currentOperand = '+this.currentOperand);
        console.log('previousOperand = '+this.previousOperand);
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand + 
            (this.operation == undefined ? '' : this.operation);
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalsButton.addEventListener('click', button => {
    calculator.readyToInput = false;
    calculator.compute();
    calculator.updateDisplay();

})
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();

})
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();

})
document.addEventListener('keydown',  event =>  {
    calculator.checkKey(event.key);
    //calculator.appendNumber(event.key);
    //calculator.updateDisplay();

})