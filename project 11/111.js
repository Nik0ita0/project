document.addEventListener('DOMContentLoaded', function() {
    const degreeInput = document.getElementById('degree');
    const degree2Input = document.getElementById('degree2');
    const polynomialSelect = document.getElementById('polynomial');
    const generateButton = document.getElementById('generateButton');
    const sequenceInput = document.getElementById('sequence');
    const binarySequenceInput = document.getElementById('binarySequence');
    const polynomialAOutput = document.getElementById('polynomialA');
    const polynomialBOutput = document.getElementById('polynomialB');
    const periodAOutput = document.getElementById('periodA');
    const periodBOutput = document.getElementById('periodB');
    const theoreticalPeriodOutput = document.getElementById('theoreticalPeriod');
    const realPeriodOutput = document.getElementById('realPeriod');
    const hammingWeightOutput = document.getElementById('hammingWeight');

    const matrixAContainer = document.getElementById('matrixA');
    const matrixBContainer = document.getElementById('matrixB');
    const inverseMatrixAContainer = document.getElementById('inverseMatrixA');
    const inverseMatrixBContainer = document.getElementById('inverseMatrixB');
    const acfChartContainer = document.getElementById('acfChart');

    let acfChart;

    const polynomials = {
        1: ["1 103F"],
        2: ["2 127B"],
        3: ["3 147H"],
        4: ["4 111A"],
        5: ["5 015"],
        6: ["6 210G"],
        7: ["7 220H"],
        8: ["8 230I"],
        9: ["9 240J"],
        10: ["10 250K"],
        11: ["11 260L"],
        12: ["12 270M"],
        13: ["13 280N"],
        14: ["14 290O"],
        15: ["15 300P"]
    };

    function updatePolynomials() {
        const degree = parseInt(degreeInput.value);
        const degree2 = parseInt(degree2Input.value);
        const maxDegree = Math.max(degree, degree2);

        polynomialSelect.innerHTML = '';

        for (let i = 1; i <= maxDegree; i++) {
            if (polynomials[i]) {
                polynomials[i].forEach(function(polynomial) {
                    const option = document.createElement('option');
                    option.value = polynomial;
                    option.text = polynomial;
                    polynomialSelect.add(option);
                });
            }
        }
    }

    function generateRandomMatrix(size) {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            matrix[i] = [];
            for (let j = 0; j < size; j++) {
                matrix[i][j] = Math.floor(Math.random() * 10);
            }
        }
        return matrix;
    }

    function displayMatrix(matrix, container) {
        container.innerHTML = '';
        matrix.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('matrix-row');
            row.forEach(cell => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('matrix-cell');
                cellDiv.textContent = cell;
                rowDiv.appendChild(cellDiv);
            });
            container.appendChild(rowDiv);
        });
    }

    function inverseMatrix(matrix) {
        try {
            const invMatrix = math.inv(matrix);
            return invMatrix.map(row => row.map(cell => Math.round(cell)));
        } catch (error) {
            console.error("Не удалось инвертировать матрицу: ", error);
            return null;
        }
    }

    function generateSequence(length) {
        const sequence = [];
        for (let i = 0; i < length; i++) {
            sequence.push(Math.floor(Math.random() * 3) - 1); // Генерация целых чисел -1, 0, 1
        }
        return sequence;
    }

    function generateBinarySequence(length) {
        const binarySequence = [];
        for (let i = 0; i < length; i++) {
            binarySequence.push(Math.floor(Math.random() * 2)); // Генерация целых чисел 0 или 1
        }
        return binarySequence;
    }

    function calculateACF(sequence) {
        const n = sequence.length;
        const mean = sequence.reduce((sum, value) => sum + value, 0) / n;
        const acf = [];
        
        for (let lag = 0; lag < n; lag++) {
            let sum = 0;
            for (let i = 0; i < n - lag; i++) {
                sum += (sequence[i] - mean) * (sequence[i + lag] - mean);
            }
            acf.push(sum / n);
        }
        
        return acf;
    }

    function plotACF(acf) {
        const labels = acf.map((_, index) => index);
        const data = {
            labels: labels,
            datasets: [{
                label: 'АЦФ',
                data: acf,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.1
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Лаг'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Значение АЦФ'
                        }
                    }
                }
            }
        };

        if (acfChart) {
            acfChart.destroy();
        }

        acfChart = new Chart(acfChartContainer, config);
    }

    function calculatePolynomial(matrix) {
        return matrix.map(row => row.join(',')).join(',');
    }

    function calculatePeriod(matrix) {
        return matrix.length * matrix[0].length;
    }

    function calculateHammingWeight(sequence) {
        return sequence.reduce((sum, value) => sum + Math.abs(value), 0);
    }

    function calculate() {
        const selectedPolynomial = polynomialSelect.value;
        const degree = parseInt(degreeInput.value);
        const degree2 = parseInt(degree2Input.value);

        const matrixA = generateRandomMatrix(degree);
        const matrixB = generateRandomMatrix(degree2);
        const inverseMatrixA = inverseMatrix(matrixA);
        const inverseMatrixB = inverseMatrix(matrixB);

        displayMatrix(matrixA, matrixAContainer);
        displayMatrix(matrixB, matrixBContainer);

        if (inverseMatrixA) {
            displayMatrix(inverseMatrixA, inverseMatrixAContainer);
        } else {
            inverseMatrixAContainer.innerHTML = 'Обратная матрица A не существует';
        }

        if (inverseMatrixB) {
            displayMatrix(inverseMatrixB, inverseMatrixBContainer);
        } else {
            inverseMatrixBContainer.innerHTML = 'Обратная матрица B не существует';
        }

        const sequence = generateSequence(10); // Пример длины последовательности 10
        const binarySequence = generateBinarySequence(10); // Пример длины бинарной последовательности 10

        sequenceInput.value = sequence.join(', ');
        binarySequenceInput.value = binarySequence.join(', ');

        const polynomialA = calculatePolynomial(matrixA);
        const polynomialB = calculatePolynomial(matrixB);
        const periodA = calculatePeriod(matrixA);
        const periodB = calculatePeriod(matrixB);
        const theoreticalPeriod = periodA * periodB; // Пример вычисления
        const realPeriod = periodA * periodB; // Пример вычисления
        const hammingWeight = calculateHammingWeight(sequence);

        polynomialAOutput.textContent = polynomialA;
        polynomialBOutput.textContent = polynomialB;
        periodAOutput.textContent = periodA;
        periodBOutput.textContent = periodB;
        theoreticalPeriodOutput.textContent = theoreticalPeriod;
        realPeriodOutput.textContent = realPeriod;
        hammingWeightOutput.textContent = hammingWeight;

        const acf = calculateACF(sequence);
        plotACF(acf);
    }

    degreeInput.addEventListener('input', updatePolynomials);
    degree2Input.addEventListener('input', updatePolynomials);
    generateButton.addEventListener('click', calculate);

    updatePolynomials();
});
