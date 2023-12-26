document.addEventListener('DOMContentLoaded', function () {
    let currentInput = '';
    let currentOperator = '';
    let resultDisplayed = false;

    function appendToInput(value) {
        if (resultDisplayed) {
            clearInput();
            resultDisplayed = false;
        }
        currentInput += value;
        updateResultDisplay();
    }

    function appendOperator(operator) {
        if (currentInput !== '') {
            if (!isOperator(currentInput.slice(-1))) {
                currentOperator = operator;
                currentInput += operator;
                updateResultDisplay();
            }
        }
    }

    function isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
    }

    function clearInput() {
        currentInput = '';
        currentOperator = '';
        updateResultDisplay();
    }

    function calculateResult() {
        if (currentInput !== '') {
            try {
                const result = eval(currentInput).toString();
                document.getElementById('user-input').textContent = currentInput;
                document.getElementById('result').textContent = result;
                currentInput = result;
                resultDisplayed = true;
            } catch (error) {
                document.getElementById('result').textContent = 'Incorrect Syntax';
            }
        }
    }

    function operateOnResult(operator) {
        if (resultDisplayed) {
            currentInput = document.getElementById('result').textContent + operator;
            document.getElementById('user-input').textContent = currentInput;
            resultDisplayed = false;
        } else {
            appendOperator(operator);
        }
    }

    function updateResultDisplay() {
        document.getElementById('user-input').textContent = currentInput;
        document.getElementById('result').textContent = currentInput;
    }

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const value = button.textContent;
            if (button.classList.contains('equal')) {
                calculateResult();
            } else if (button.classList.contains('clear')) {
                clearInput();
            } else if (button.classList.contains('operator')) {
                operateOnResult(value);
            } else {
                appendToInput(value);
            }
        });
    });
});
