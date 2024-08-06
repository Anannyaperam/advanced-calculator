let memory = 0;
let history = [];
let customFunctions = {};

function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        // Replace special functions with JavaScript equivalents
        let expression = display.value
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/pow\(/g, 'Math.pow(')
            .replace(/Math.sin\(/g, 'Math.sin(')
            .replace(/Math.cos\(/g, 'Math.cos(')
            .replace(/Math.tan\(/g, 'Math.tan(')
            .replace(/Math.log10\(/g, 'Math.log10(')
            .replace(/Math.log\(/g, 'Math.log(');
        
        // Handle custom functions
        for (const [name, func] of Object.entries(customFunctions)) {
            const regex = new RegExp(`${name}\\(`, 'g');
            expression = expression.replace(regex, `${func}(`);
        }

        const result = eval(expression);
        display.value = result;

        // Update history
        history.push(`${display.value} = ${result}`);
        updateHistory();
    } catch (error) {
        display.value = 'Error';
    }
}

function toggleMemory() {
    const display = document.getElementById('display');
    const memoryDisplay = document.getElementById('memory-display');
    
    if (memory === 0) {
        memory = parseFloat(display.value) || 0;
        memoryDisplay.textContent = `M: ${memory}`;
    } else {
        memoryDisplay.textContent = `M: 0`;
        memory = 0;
    }
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function graphFunction() {
    const display = document.getElementById('display').value;
    // This is a placeholder for graphing functionality.
    alert(`Graphing function: ${display}`);
}

function saveFunction() {
    const functionName = prompt('Enter function name:');
    const functionBody = prompt('Enter function body (use "x" as variable):');

    if (functionName && functionBody) {
        customFunctions[functionName] = functionBody;
        updateCustomFunctions();
    }
}

function updateCustomFunctions() {
    const functionsList = document.getElementById('functions-list');
    functionsList.innerHTML = '';
    for (const [name, func] of Object.entries(customFunctions)) {
        const li = document.createElement('li');
        li.textContent = `${name} = ${func}`;
        functionsList.appendChild(li);
    }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const display = document.getElementById('display');

    if (key >= '0' && key <= '9' || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
