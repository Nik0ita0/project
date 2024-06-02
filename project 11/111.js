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

    // Displaying additional fields
    document.getElementById('polynomialA').textContent = polynomial; // Assuming polynomial A is the same as selected polynomial
    document.getElementById('polynomialB').textContent = polynomial; // Assuming polynomial B is the same as selected polynomial
    document.getElementById('periodA').textContent = realPeriod; // Assuming Period T(A) is the real period calculated

    drawACFChart(binarySequence);
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

function drawACFChart(sequence) {
    const acf = calculateACF(sequence);
    const ctx = document.getElementById('acfChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: acf.map((_, index) => index),
            datasets: [{
                label: 'ACF',
                data: acf,
                borderColor: 'rgba(255, 99, 132, 1)',
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
                        text: 'Lag'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'ACF'
                    }
                }
            }
        }
    });
}

function calculateACF(sequence) {
    const n = sequence.length;
    const mean = sequence.reduce((acc, val) => acc + val, 0) / n;
    const acf = [];

    for (let lag = 0; lag < n; lag++) {
        let sum = 0;
        for (let i = 0; i < n - lag; i++) {
            sum += (sequence[i] - mean) * (sequence[i + lag] - mean);
        }
        acf.push(sum / (n - lag));
    }
    return acf;
}




