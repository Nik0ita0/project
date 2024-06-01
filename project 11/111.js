function multiplyMatrixVector(matrix, vector, mod) {
    return matrix.map(row => {
        return row.reduce((sum, value, index) => {
            return sum + (value * vector[index]);
        }, 0) % mod;
    });
}

// Обновление матрицы состояний
function updateMatrix(matrixId, containerId) {
    const inputMatrix = document.getElementById(matrixId).value;
    const rows = inputMatrix.split(';').map(row => row.split(',').map(Number));

    const matrixContainer = document.getElementById(containerId);
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
    const initialStateMatrix = document.getElementById('initialStateMatrix').value;
    const smithForm = "Нормальная форма Смит"; // Пример логики
    document.getElementById('smithForm').innerText = smithForm;
}

// Функция для отображения состояния генераторов
function displayGeneratorState() {
    const generatorStateInput = document.getElementById('generatorStateInput').value;
    const generatorState = "Состояние генераторов: " + generatorStateInput; // Пример логики
    document.getElementById('generatorState').innerText = generatorState;
}

// Функция для вычисления спектра весов Хемминга
function calculateHammingWeights() {
    const hammingWeights = "Спектр весов Хемминга"; // Пример логики
    document.getElementById('hammingWeights').innerText = hammingWeights;
}

// Функция для отображения графиков циклических АКФ
function displayACFGraphs() {
    const acfGraphsContainer = document.getElementById('acfGraphs');
    acfGraphsContainer.innerHTML = '<p>Графики АКФ будут здесь</p>'; // Пример логики
}

function stepByStepIteration() {
    alert("Покрокова ітерація виконується"); // Пример логики
}

function automaticMode() {
    alert("Автоматичний режим виконується"); // Пример логики
}
