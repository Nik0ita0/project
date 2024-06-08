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
    const theoreticalPeriodOutput = document.getElementById('theoreticalPeriod');
    const realPeriodOutput = document.getElementById('realPeriod');
    const hammingWeightOutput = document.getElementById('hammingWeight');

    const matrixAContainer = document.getElementById('matrixA');
    const matrixBContainer = document.getElementById('matrixB');
    const inverseMatrixAContainer = document.getElementById('inverseMatrixA');
    const inverseMatrixBContainer = document.getElementById('inverseMatrixB');

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
            return math.inv(matrix);
        } catch (error) {
            console.error("Не удалось инвертировать матрицу: ", error);
            return null;
        }
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

        sequenceInput.value = `Последовательность для ${selectedPolynomial}`;
        binarySequenceInput.value = `Бинарная последовательность для ${selectedPolynomial}`;
        polynomialAOutput.textContent = selectedPolynomial;
        polynomialBOutput.textContent = selectedPolynomial;
        periodAOutput.textContent = "1023";  // Пример значения
        theoreticalPeriodOutput.textContent = "1023";  // Пример значения
        realPeriodOutput.textContent = "1023";  // Пример значения
        hammingWeightOutput.textContent = "512";  // Пример значения
    }

    degreeInput.addEventListener('input', updatePolynomials);
    degree2Input.addEventListener('input', updatePolynomials);
    generateButton.addEventListener('click', calculate);

    updatePolynomials();
});
