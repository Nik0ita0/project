function generateMatrix() {
    const matrixSize = document.getElementById('matrixSize').value;
    const matrixForm = document.getElementById('matrixElementsForm');
    matrixForm.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'matrix';

    for (let i = 0; i < matrixSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < matrixSize; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `element_${i}_${j}`;
            input.name = `element_${i}_${j}`;
            input.min = 0;
            input.max = 6;
            input.required = true;
            input.className = 'matrix-element-input';
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    matrixForm.appendChild(table);
    document.getElementById('matrixInput').style.display = 'block';
}

function analyzeMatrix() {
    const matrixSize = document.getElementById('matrixSize').value;
    let matrix = [];

    for (let i = 0; i < matrixSize; i++) {
        let row = [];
        for (let j = 0; j < matrixSize; j++) {
            const element = document.getElementById(`element_${i}_${j}`).value;
            row.push(parseInt(element));
        }
        matrix.push(row);
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h3>Матриця:</h3>';

    const table = document.createElement('table');
    table.className = 'matrix';

    for (let i = 0; i < matrixSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < matrixSize; j++) {
            const cell = document.createElement('td');
            cell.className = 'matrix-element';
            cell.textContent = matrix[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    resultsDiv.appendChild(table);

    const isValid = validateMatrix(matrix);
    resultsDiv.innerHTML += `<p>Чи є матриця валідною: ${isValid}</p>`;

    const analysisResult = matrixShiftRegisterAnalysis(matrix);
    resultsDiv.innerHTML += `<p>Результати аналізу: ${analysisResult}</p>`;
}

function validateMatrix(matrix) {
    for (let row of matrix) {
        for (let element of row) {
            if (element < 0 || element > 6) {
                return false;
            }
        }
    }
    return true;
}

function matrixShiftRegisterAnalysis(matrix) {
    const transposeMatrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    return JSON.stringify(transposeMatrix, null, 2);
}
