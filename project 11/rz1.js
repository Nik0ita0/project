function generateMatrix() {
    const matrixSize = document.getElementById('matrixSize').value;
    const matrixForm = document.getElementById('matrixElementsForm');
    matrixForm.innerHTML = '';

    for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
            matrixForm.innerHTML += `<input type="number" id="element_${i}_${j}" name="element_${i}_${j}" min="0" max="6" required> `;
        }
        matrixForm.innerHTML += '<br>';
    }

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
    resultsDiv.innerHTML = '<h3>Матриця:</h3><pre>' + JSON.stringify(matrix, null, 2) + '</pre>';

    // Додати тут логіку аналізу матриці
    const isValid = validateMatrix(matrix);
    resultsDiv.innerHTML += `<p>Чи є матриця валідною: ${isValid}</p>`;
}

function validateMatrix(matrix) {
    // Простий приклад валідації: перевірка чи всі елементи в діапазоні від 0 до 6
    for (let row of matrix) {
        for (let element of row) {
            if (element < 0 || element > 6) {
                return false;
            }
        }
    }
    return true;
}
