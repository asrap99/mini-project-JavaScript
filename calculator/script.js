const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}

function updateDisplay() {
    const display = document.getElementById('displayText');
    
    // Menggabungkan First Operand, Operator, dan Second Operand (displayValue) secara dinamis
    if (calculator.firstOperand !== null && calculator.operator !== null) {
        if (calculator.waitingForSecondOperand) {
            display.textContent = `${calculator.firstOperand} ${calculator.operator}`;
        } else {
            display.textContent = `${calculator.firstOperand} ${calculator.operator} ${calculator.displayValue}`;
        }
    } else {
        display.textContent = calculator.displayValue;
    }
}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit
        calculator.waitingForSecondOperand = false
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit
    } 
    updateDisplay()
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = "0.";
        calculator.waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot
    }
    updateDisplay()
}

function handleUnary(operator) {
    let currentValue = parseFloat(calculator.displayValue);
    
    if (operator === '%') {
        currentValue = currentValue / 100;
    } else if (operator === '√') {
        if (currentValue < 0) {
            calculator.displayValue = 'Error';
            calculator.waitingForSecondOperand = true;
            updateDisplay();
            return;
        }
        currentValue = Math.sqrt(currentValue);
    }
    
    calculator.displayValue = `${parseFloat(currentValue.toFixed(7))}`;
    calculator.waitingForSecondOperand = true; 
    updateDisplay();
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue)

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator
        updateDisplay()
        return
    }
    
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator)
        
        if (result === Infinity || isNaN(result)) {
            calculator.displayValue = 'Error';
        } else {
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`
        }
        calculator.firstOperand = result
    }

    calculator.waitingForSecondOperand = true
    calculator.operator = nextOperator
    updateDisplay()
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand
    } else if (operator === '-') {
        return firstOperand - secondOperand
    } else if (operator === '*') {
        return firstOperand * secondOperand
    } else if (operator === '/') {
        return firstOperand / secondOperand
    }
    return secondOperand
}

function resetCalculator() {
    calculator.displayValue = '0'
    calculator.firstOperand = null
    calculator.waitingForSecondOperand = false
    calculator.operator = null
    updateDisplay()
}

function handleEqual() {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue)

    if (operator && !calculator.waitingForSecondOperand) {
        const result = calculate(firstOperand, inputValue, operator)
        
        if (result === Infinity || isNaN(result)) {
            calculator.displayValue = 'Error';
        } else {
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`
        }
        
        calculator.firstOperand = null
        calculator.operator = null
        calculator.waitingForSecondOperand = true 
        updateDisplay()
    }
}

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
    const { target } = event

    if (!target.matches('button')) {
        return
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value)
        return
    }
    
    if (target.classList.contains('unary')) {
        handleUnary(target.value)
        return
    }
    
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value)
        return
    }

    if (target.classList.contains('all-clear')) {
       resetCalculator()
        return
    }

    if (target.classList.contains('equal-sign')) {
        handleEqual()
        return
    }

    inputDigit(target.value)
})

// Inisialisasi awal layar
updateDisplay();