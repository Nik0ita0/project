// Функция для умножения матрицы на вектор с модулем
function multiplyMatrixVector(matrix, vector, mod) {
    return matrix.map(row => {
        return row.reduce((sum, value, index) => {
            return sum + (value * vector[index]);
        }, 0) % mod;
    });
}

// Обновление матрицы состояний
function updateMatrix() {
    const inputMatrix = document.getElementById('inputMatrix').value;
    const rows = inputMatrix.split(';').map(row => row.split(',').map(Number));

    const matrixContainer = document.getElementById('stateMatrix');
    matrixContainer.innerHTML = '';

    rows.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(value => {
            const td = document.createElement('td');
            td.innerText = value;
            tr.appendChild(td);
        });
        matrixContainer.appendChild(tr);
    });
}

// Вычисление следующего состояния
function calculateNextState() {
    const initialStateInput = document.getElementById('initialState').value;
    let state = initialStateInput.split(',').map(Number);

    const inputMatrix = document.getElementById('inputMatrix').value;
    const matrix = inputMatrix.split(';').map(row => row.split(',').map(Number));

    let newState = multiplyMatrixVector(matrix, state, 7);

    document.getElementById('newState').innerText = 'Новий стан: ' + newState.join(', ');
}

// Функция для вычисления нормальной формы Смит
function calculateSmithNormalForm() {
    // Пример функции для вычисления нормальной формы Смит
    // Необходимо заменить реальной реализацией
    const initialStateMatrix = document.getElementById('initialStateMatrix').value;
    // Логика вычисления нормальной формы Смит
    const smithForm = "Нормальная форма Смит";
    document.getElementById('smithForm').innerText = smithForm;
}

// Функция для отображения состояния генераторов
function displayGeneratorState() {
    // Пример функции для отображения состояния генераторов
    // Необходимо заменить реальной реализацией
    const generatorState = "Состояние генераторов";
    document.getElementById('generatorState').innerText = generatorState;
}

// Функция для вычисления спектра весов Хемминга
function calculateHammingWeights() {
    // Пример функции для вычисления спектра весов Хемминга
    // Необходимо заменить реальной реализацией
    const hammingWeights = "Спектр весов Хемминга";
    document.getElementById('hammingWeights').innerText = hammingWeights;
}

// Функция для отображения графиков циклических АКФ
function displayACFGraphs() {
    // Пример функции для отображения графиков АКФ
    // Необходимо заменить реальной реализацией
    const acfGraphsContainer = document.getElementById('acfGraphs');
    acfGraphsContainer.innerHTML = '<p>Графики АКФ будут здесь</p>';
}
