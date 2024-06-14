let currentState = [];
let nextState = [];
let intervalId;
let matrixSize;
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
    matrixSize = document.getElementById('matrixSize').value;
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
    nextState = currentState.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
            (currentState[(rowIndex + 1) % matrixSize][colIndex] +
             currentState[rowIndex][(colIndex + 1) % matrixSize]) % 7
        )
    );
    currentState = nextState;
    displayMatrix(currentState);
}

function startAutomatic() {
    const speed = 1000 / document.getElementById('speed').value;
    intervalId = setInterval(nextMatrixState, speed);
}

function stepManual() {
    nextMatrixState();
}
