document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateButton').addEventListener('click', generateMatrices);
    document.getElementById('increaseDegreeButton').addEventListener('click', increaseDegree);
    populatePolynomialOptions();
    document.getElementById('degree').addEventListener('change', populatePolynomialOptions);
    document.getElementById('degree2').addEventListener('change', populatePolynomialOptions);
});


    const polynomials = {
        1: ["1H"],
        2: ["1 13F", "3 13F", "5 07"],
        3: ["1 23F", "3 37D", "5 07"],
        4: ["1 45E", "3 75G", "5 67H"],
        5: ["1 103F", "3 127B", "5 147H", "7 111A", "9 015"],
        6: ["1 155E", "3 127B", "5 147H", "7 111A", "9 015"],
        7: ["1 211E", "3 217E", "5 235E", "7 367H", "9 277E", "11 325G", "13 203F", "15 313H", "21 349G"],
        8: ["1 43B9E", "3 56E7H", "5 763D", "7 551E", "9 675C", "11 747H", "13 435F", "15 727D", "17 023", "19 545E", "21 613D", "23 015", "25 103F", "27 477B", "29 617H", "31 003"],
        9: ["1 1021E", "3 1067F", "5 1461G", "7 1231A", "9 1423G", "11 1055E", "13 1076F", "15 1461G", "17 1231A", "19 1577C", "21 1056", "23 1039F", "25 1743H", "27 1533H", "29 1361F", "31 1056", "33 1756", "35 1769H", "37 537F", "39 1257E", "41 1351F", "43 1242H", "45 671A"],
        10: ["1 2015A", "3 2017A", "5 2415E", "7 3771G", "9 2257E", "11 2095A", "13 2056E", "15 2447F", "17 4102G", "19 3355G", "21 2045G", "23 4136H", "25 3253G", "27 3647G", "29 2064H", "31 3431A", "33 3615H", "35 3535E", "37 4457H", "39 2059G", "41 1063A", "43 5455A", "45 5517H", "47 4463G", "49 3537H", "51 2256G", "53 2027A", "55 3037F", "57 2436E", "59 4023A", "61 3427H", "63 3243H", "65 5155F", "67 3636A", "69 1769A", "71 2516E", "73 2063E", "75 1234E", "77 4423G", "79 2267F", "81 2174F", "83 3143A", "85 2627E", "87 5173G", "89 2433E", "91 5533F", "93 1243A", "95 2145H", "97 3124E", "99 1205E", "101 5361E", "103 1373A", "105 3721G", "107 4155A", "109 1235A", "111 4353E", "113 1063G", "115 1245G", "117 1367H", "119 4513A", "121 5537A", "123 1247A", "125 1036A", "127 1343A"],
        11: ["1 4005E", "3 4445E", "5 4215E", "7 4015E", "9 6015G", "11 7413H", "13 4143F", "15 4636F", "17 4035H", "19 5623F", "21 5623F", "23 4757B", "25 577B", "27 1237H", "29 5633F", "31 5317E", "33 4505E", "35 5273F", "37 4467F", "39 5317E", "41 5617E", "43 5056F", "45 3756E", "47 4455F", "49 4767F", "51 5265F", "53 6235F", "55 3756E", "57 4137H", "59 4533F", "61 6316E", "63 4757B", "65 3265G", "67 7116G", "69 7077H", "71 5265E", "73 4757B", "75 3717H", "77 6235F", "79 7117E", "81 7105E", "83 7315E", "85 5505E", "87 5265E", "89 5346A", "91 4767F", "93 4215E", "95 4567E", "97 5255E", "99 6157E", "101 4251E", "103 5405E", "105 7046E", "107 4757A", "109 4375H", "111 4713F", "113 4707F"],
        12: ["1 1023F", "3 1213A", "5 1015A", "7 1215B", "9 1176A", "11 1564E", "13 1251B", "15 1307A", "17 1653A", "19 1607A", "21 1006A", "23 1015E", "25 1337B", "27 1446A", "29 1421A", "31 1331A", "33 1037B", "35 1333A", "37 1527A", "39 1515A", "41 1513A", "43 1510A", "45 1053A", "47 1061A", "49 1327A", "51 1332A", "53 1242H", "55 1521A", "57 1352A", "59 1562E", "61 1607A", "63 1237A", "65 1564E", "67 1372A", "69 1632F", "71 1625E", "73 1251A", "75 1215B", "77 1267D", "79 1754C", "81 1225E", "83 1527A", "85 1631A", "87 1333A", "89 1367A", "91 1332A", "93 1632F", "95 1353E", "97 1521A", "99 1551C", "101 1422F", "103 1562E", "105 1707A", "107 1262A", "109 1776A", "111 1211E", "113 1632F", "115 1006A", "117 1532A", "119 1552E", "121 1563E", "123 1521A", "125 1707A"],
        13: ["1 2003F", "3 2326E", "5 2462F", "7 2351F", "9 3074G", "11 2164F", "13 3017G", "15 2172F", "17 2777F", "19 3751E", "21 3476F", "23 3047H", "25 2535G", "27 3446G", "29 3705C", "31 3665G", "33 2516A", "35 2646G", "37 3746F", "39 3435H", "41 2551E", "43 2535E", "45 3645F", "47 3615A", "49 3376H", "51 2536A", "53 2665F", "55 3226F", "57 3276G", "59 2321E", "61 2353F", "63 3216H", "65 3324F", "67 2351F", "69 3727E", "71 3174H", "73 3172F", "75 3726G", "77 2451E", "79 3247A", "81 2437H", "83 3143A", "85 3607A", "87 2445E", "89 2226F", "91 3727H", "93 2353E", "95 2023A", "97 3243F", "99 3103H", "101 4235E", "103 3467F", "105 4557F", "107 4757E", "109 5357H", "111 4427E"],
        14: ["1 4210F", "3 4054B", "5 4333E", "7 5176E", "9 5405A", "11 4333A", "13 4054B", "15 4035A", "17 4333A", "19 4101F", "21 2253A", "23 4136F", "25 7630G", "27 4034A", "29 4035A", "31 3045F", "33 4446H", "35 3246E", "37 4036A", "39 3336G", "41 5573F", "43 4376A", "45 3247A", "47 4146F", "49 6345A", "51 4235E", "53 3436G", "55 4145A", "57 4035H", "59 5215E", "61 2236H", "63 6245E", "65 2267F", "67 6435G", "69 5346F", "71 2267F", "73 4445H", "75 5176E", "77 3247A", "79 2265G", "81 3157H", "83 4235F", "85 6365A", "87 6246H", "89 4035A", "91 3136E", "93 3103E", "95 4175H", "97 6147H", "99 6235A", "101 5553F", "103 3247A", "105 3147H", "107 6157A", "109 2215E", "111 2136E"],
        15: ["1 10003F", "3 10204F", "5 11001F", "7 12535A", "9 10206F", "11 10430F", "13 10305F", "15 11775E", "17 13773B", "19 10206F", "21 12701A", "23 10206F", "25 10430F", "27 12026E", "29 10503G", "31 10430F", "33 11601E", "35 16107H", "37 16106G", "39 11742F", "41 10634E", "43 10634E", "45 12025E", "47 11337F"],
    };
function populatePolynomialOptions() {
    const degreeSelect = document.getElementById('degree');
    const degree2Select = document.getElementById('degree2');
    const polynomialSelect = document.getElementById('polynomial');
    polynomialSelect.innerHTML = '';

    const selectedDegree = degreeSelect.value;
    const selectedDegree2 = degree2Select.value;

    const availablePolynomials = (polynomials[selectedDegree] || []).concat(polynomials[selectedDegree2] || []);

    availablePolynomials.forEach((poly, index) => {
        const option = document.createElement('option');
        option.value = poly;
        option.textContent = poly;
        polynomialSelect.appendChild(option);
    });
}

function increaseDegree() {
    const degreeSelect = document.getElementById('degree');
    const newDegree = parseInt(degreeSelect.value) + 1;
    if (newDegree <= 15) { // assuming max degree is 15
        degreeSelect.value = newDegree;
        addNewPolynomials(newDegree);
        populatePolynomialOptions();
    }
}

function addNewPolynomials(degree) {
    if (!polynomials[degree]) {
        polynomials[degree] = [];
    }
    // Logic to generate new polynomials for the new degree
    // This is a placeholder example:
    for (let i = 1; i <= 3; i++) {
        polynomials[degree].push(`${i} ${degree}X`);
    }
}

function generateMatrices() {
    const degree = parseInt(document.getElementById('degree').value);
    const degree2 = parseInt(document.getElementById('degree2').value);
    const polynomial = document.getElementById('polynomial').value;
    const initialState = document.getElementById('initialState').value;

    const matrixA = generateMatrixA(degree, polynomial);
    const matrixB = generateMatrixB(degree2, polynomial);

    displayMatrix(matrixA, 'matrixA', 'Матрица A');
    displayMatrix(matrixB, 'matrixB', 'Матрица B');

    const inverseMatrixA = invertMatrix(matrixA);
    const inverseMatrixB = invertMatrix(matrixB);

    displayMatrix(inverseMatrixA, 'inverseMatrixA', 'Обратная матрица A');
    displayMatrix(inverseMatrixB, 'inverseMatrixB', 'Обратная матрица B');

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

    document.getElementById('polynomialA').textContent = polynomial;
    document.getElementById('polynomialB').textContent = polynomial;
    document.getElementById('periodA').textContent = realPeriod;

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

function displayMatrix(matrix, elementId, title) {
    const matrixContainer = document.getElementById(elementId);
    matrixContainer.innerHTML = `<h3>${title}</h3>`;
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
    const size = matrix.length;
    const identity = Array.from({ length: size }, (_, i) => 
        Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
    );
    return identity;
}

function generateSequence(matrixA, initialState) {
    return [1, 0, 1, 1, 0, 1, 0, 1]; // Placeholder
}

function sequenceToBinary(sequence) {
    return sequence.map(value => value % 2);
}

function calculateRealPeriod(sequence) {
    return 1023; // Placeholder
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
