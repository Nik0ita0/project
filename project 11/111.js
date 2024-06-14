document.addEventListener('DOMContentLoaded', function () {
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
                matrix[i][j] = Math.floor(Math.random() * 2); // Генерация 0 или 1
            }
        }
        return matrix;
    }

    function generateInvertibleMatrix(size) {
        // Создание случайной инвертируемой матрицы
        const matrix = [];
        for (let i = 0; i < size; i++) {
            matrix[i] = Array(size).fill(0);
            matrix[i][i] = 1; // создание единичной матрицы
        }

        // Случайное перемешивание строк и столбцов
        for (let i = 0; i < size; i++) {
            const row1 = Math.floor(Math.random() * size);
            const row2 = Math.floor(Math.random() * size);
            [matrix[row1], matrix[row2]] = [matrix[row2], matrix[row1]];

            const col1 = Math.floor(Math.random() * size);
            const col2 = Math.floor(Math.random() * size);
            for (let j = 0; j < size; j++) {
                [matrix[j][col1], matrix[j][col2]] = [matrix[j][col2], matrix[j][col1]];
            }
        }
        return matrix;
    }

    function displayMatrix(matrix, container, title) {
        container.innerHTML = `<h3>${title}</h3>`;
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

    function inverseBinaryMatrix(matrix) {
        const size = matrix.length;
        const augmentedMatrix = matrix.map((row, i) => row.concat([...Array(size)].map((_, j) => (i === j ? 1 : 0))));

        // Прямой ход метода Гаусса
        for (let i = 0; i < size; i++) {
            // Проверка, если элемент диагонали равен 0, перестановка строк
            if (augmentedMatrix[i][i] === 0) {
                let swapped = false;
                for (let j = i + 1; j < size; j++) {
                    if (augmentedMatrix[j][i] === 1) {
                        [augmentedMatrix[i], augmentedMatrix[j]] = [augmentedMatrix[j], augmentedMatrix[i]];
                        swapped = true;
                        break;
                    }
                }
                if (!swapped) return null; // Невозможно инвертировать
            }

            // Приведение строки к единичной матрице
            for (let j = 0; j < size; j++) {
                if (i !== j) {
                    if (augmentedMatrix[j][i] === 1) {
                        for (let k = 0; k < 2 * size; k++) {
                            augmentedMatrix[j][k] ^= augmentedMatrix[i][k];
                        }
                    }
                }
            }
        }

        // Возвращение обратной матрицы из дополненной матрицы
        const inverseMatrix = augmentedMatrix.map(row => row.slice(size));
        return inverseMatrix;
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

    function calculatePeriodicACF(sequence) {
        const n = sequence.length;
        const mean = sequence.reduce((sum, value) => sum + value, 0) / n;
        const acf = [];
        
        for (let lag = 0; lag < n; lag++) {
            let sum = 0;
            for (let i = 0; i < n; i++) {
                sum += (sequence[i] - mean) * (sequence[(i + lag) % n] - mean);
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
                label: 'Периодическая АЦФ',
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
                            text: 'АКФ'
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
        const polynomials = matrix.map((row, rowIndex) => {
            return row
                .map((value, colIndex) => (value === 1 ? `x^${colIndex}` : null))
                .filter(item => item)
                .join(' + ');
        });
        return polynomials.join(', ');
    }

    function calculatePeriod(matrix) {
        // Поиск периода матрицы
        function matrixEquals(matrix1, matrix2) {
            return matrix1.every((row, i) => row.every((value, j) => value === matrix2[i][j]));
        }

        const initialMatrix = matrix.map(row => row.slice());
        let currentMatrix = matrix.map(row => row.slice());
        let period = 0;

        do {
            period++;
            currentMatrix = currentMatrix.map(row => row.map(value => value));
            for (let i = 0; i < currentMatrix.length; i++) {
                for (let j = 0; j < currentMatrix.length; j++) {
                    currentMatrix[i][j] ^= initialMatrix[i][j];
                }
            }
        } while (!matrixEquals(currentMatrix, initialMatrix));

        return period;
    }

    function calculateHammingWeight(sequence) {
        return sequence.reduce((sum, value) => sum + Math.abs(value), 0);
    }

    function calculate() {
        const selectedPolynomial = polynomialSelect.value;
        const degree = parseInt(degreeInput.value);
        const degree2 = parseInt(degree2Input.value);

        const matrixA = generateInvertibleMatrix(degree);
        const matrixB = generateInvertibleMatrix(degree2);
        const inverseMatrixA = inverseBinaryMatrix(matrixA);
        const inverseMatrixB = inverseBinaryMatrix(matrixB);

        displayMatrix(matrixA, matrixAContainer, 'Матриця A');
        displayMatrix(matrixB, matrixBContainer, 'Матриця B');

        if (inverseMatrixA) {
            displayMatrix(inverseMatrixA, inverseMatrixAContainer, 'Обернена Матриця A');
        } else {
            inverseMatrixAContainer.innerHTML = '<h3>Обернена Матриця A</h3><div>Обернена матриця A не існує</div>';
        }

        if (inverseMatrixB) {
            displayMatrix(inverseMatrixB, inverseMatrixBContainer, 'Обернена Матриця B');
        } else {
            inverseMatrixBContainer.innerHTML = '<h3>Обернена Матриця B</h3><div>Обернена матриця B не існує</div>';
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

        const periodicAcf = calculatePeriodicACF(sequence);
        plotACF(periodicAcf);

        // Отключаем кнопку после первого нажатия
        generateButton.disabled = true;
    }

    degreeInput.addEventListener('input', updatePolynomials);
    degree2Input.addEventListener('input', updatePolynomials);
    generateButton.addEventListener('click', calculate);

    updatePolynomials();
});
