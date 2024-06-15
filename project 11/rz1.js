let currentState = [];
let nextState = [];
let intervalId;
let matrixSize;
let characteristicPolynomial;
let primitivePolynomials = {
    2: [1, 1, 3],
    3: [1, 0, 3, 2],
    4: [1, 0, 3, 0, 5],
    5: [1, 1, 0, 0, 0, 4],
    6: [1, 0, 0, 1, 0, 0, 5],
    7: [1, 0, 0, 0, 0, 0, 2],
    8: [1, 0, 0, 0, 0, 0, 0, 3],
};

function generateMatrix() {
    matrixSize = parseInt(document.getElementById('matrixSize').value);
    characteristicPolynomial = parseInt(document.getElementById('characteristicPolynomial').value);
    const matrixForm = document.getElementById('matrixElementsForm');
    matrixForm.innerHTML = '';

    for (let i = 0; i < matrixSize; i++) {
        let row = document.createElement('div');
        row.className = 'matrix';
        for (let j = 0; j < matrixSize; j++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.id = `element_${i}_${j}`;
            input.name = `element_${i}_${j}`;
            input.min = 0;
            input.max = 6;
            input.required = true;
            input.className = 'matrix-element-input';
            row.appendChild(input);
        }
        matrixForm.appendChild(row);
    }

    document.getElementById('matrixInput').style.display = 'block';
}

function analyzeMatrix() {
    currentState = [];
    for (let i = 0; i < matrixSize; i++) {
        let row = [];
        for (let j = 0; j < matrixSize; j++) {
            let element = document.getElementById(`element_${i}_${j}`).value;
            row.push(parseInt(element));
        }
        currentState.push(row);
    }

    document.getElementById('matrixControl').style.display = 'block';
    displayMatrix(currentState);
}

function displayMatrix(matrix) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    const table = document.createElement('div');
    table.className = 'matrix';

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let cell = document.createElement('div');
            cell.className = 'matrix-element';
            cell.style.backgroundColor = getColor(matrix[i][j]);
            cell.textContent = matrix[i][j];
            table.appendChild(cell);
        }
    }

    resultsDiv.appendChild(table);
}

function getColor(value) {
    const colors = [
        '#FF0000', // red
        '#FF7F00', // orange
        '#FFFF00', // yellow
        '#00FF00', // green
        '#0000FF', // blue
        '#4B0082', // indigo
        '#8B00FF'  // violet
    ];
    return colors[value];
}

function nextMatrixState() {
    let poly = primitivePolynomials[characteristicPolynomial];
    nextState = [];

    for (let i = 0; i < matrixSize; i++) {
        let newRow = [];
        for (let j = 0; j < matrixSize; j++) {
            let newValue = 0;
            for (let k = 0; k < poly.length; k++) {
                if (poly[k] !== 0) {
                    let row = (i + k) % matrixSize;
                    newValue = (newValue + currentState[row][j] * poly[k]) % 7;
                }
            }
            newRow.push(newValue);
        }
        nextState.push(newRow);
    }

    currentState = nextState;
    displayMatrix(currentState);
}

function startAutomatic() {
    let speed = parseInt(document.getElementById('speed').value);
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextMatrixState, 1000 / speed);
}

function stepManual() {
    nextMatrixState();
}

function stopAutomatic() {
    if (intervalId) clearInterval(intervalId);
}
