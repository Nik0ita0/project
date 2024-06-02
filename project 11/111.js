document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateButton').addEventListener('click', generateMatrices);
});

function generateMatrices() {
    const degree = parseInt(document.getElementById('degree').value);
    const polynomial = document.getElementById('polynomial').value;
    const initialState = document.getElementById('initialState').value;

    const matrixA = generateMatrixA(degree, polynomial);
    const matrixB = generateMatrixB(degree, polynomial);

    displayMatrix(matrixA, 'matrixA');
    displayMatrix(matrixB, 'matrixB');

    const inverseMatrixA = invertMatrix(matrixA);
    const inverseMatrixB = invertMatrix(matrixB);

    displayMatrix(inverseMatrixA, 'inverseMatrixA');
    displayMatrix(inverseMatrixB, 'inverseMatrixB');

    const sequence = generateSequence(matrixA, initialState);
    const binarySequence = sequenceToBinary(sequence);

    document.getElementById('sequence').value = sequence.join('');
    document.getElementById('binarySequence').value = binarySequence.join('');

    const realPeriod = calculateRealPeriod(sequence);
    const theoreticalPeriod = calculateTheoreticalPeriod(degree);
    const hammingWeight = calculateHammingWeight(binarySequence);

    document.getElementById('realPeriod').textContent = realPeriod;
    document.getElementById('theoreticalPeriod').textContent = theoreticalPeriod;
    document.getElementById('hammingWeight').textContent = hammingWeight;
    document.getElementById('polynomialDisplay').textContent = polynomial;

    // Display additional fields
    document.getElementById('polynomialA').textContent = polynomial; // Assuming polynomial A is the same as selected polynomial
    document.getElementById('polynomialB').textContent = polynomial; // Assuming polynomial B is the same as selected polynomial
    document.getElementById('periodA').textContent = realPeriod; // Assuming Period T(A) is the real period calculated

    drawChart(sequence);
}

function generateMatrixA(degree, polynomial) {
    const matrix = Array.from({ length: degree }, () => Array(degree).fill(0));
    for (let i = 0; i < degree - 1; i++) {
        matrix[i][i + 1] = 1;
    }
    matrix[degree - 1] = parsePolynomial(polynomial, degree);
    return matrix;
}

function generateMatrixB(degree, polynomial) {
    const matrix = Array.from({ length: degree }, () => Array(1).fill(0));
    matrix[degree - 1][0] = 1;
    return matrix;
}

function parsePolynomial(polynomial, degree) {
    const coefficients = Array(degree).fill(0);
    polynomial.split(' ').forEach(term => {
        const exponent = parseInt(term.slice(1)) || 0;
        coefficients[degree - 1 - exponent] = 1;
    });
    return coefficients;
}

function displayMatrix(matrix, elementId) {
    const matrixContainer = document.getElementById(elementId);
    matrixContainer.innerHTML = '';
    matrix.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        row.forEach(value => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'matrix-cell';
            cellDiv.textContent = value;
            rowDiv.appendChild(cellDiv);
        });
        matrixContainer.appendChild(rowDiv);
    });
}

function invertMatrix(matrix) {
    // Implement the matrix inversion logic
    const size = matrix.length;
    const identity = Array.from({ length: size }, (_, i) => 
        Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
    );
    return identity;
}

function generateSequence(matrixA, initialState) {
    // Implementation for generating the sequence based on matrix A and the initial state
    // Placeholder example:
    return [1, 0, 1, 1, 0, 1, 0, 1];
}

function sequenceToBinary(sequence) {
    return sequence.map(value => value % 2);
}

function calculateRealPeriod(sequence) {
    // Implementation for calculating the real period of the sequence
    // Placeholder example:
    return 1023;
}

function calculateTheoreticalPeriod(degree) {
    return Math.pow(2, degree) - 1;
}

function calculateHammingWeight(binarySequence) {
    return binarySequence.reduce((sum, bit) => sum + bit, 0);
}

function drawChart(sequence) {
    // Implementation for drawing the chart
    const ctx = document.getElementById('acfChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sequence.map((_, index) => index + 1),
            datasets: [{
                label: 'ACF',
                data: sequence,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
                lineTension: 0
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Index'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });
}
