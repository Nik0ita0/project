document.addEventListener('DOMContentLoaded', () => {
    function generateMatrix(size, mod) {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(Math.floor(Math.random() * mod));
            }
            matrix.push(row);
        }
        return matrix;
    }

    function renderMatrix(matrix, tableId) {
        const table = document.getElementById(tableId);
        table.innerHTML = '';
        matrix.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(value => {
                const td = document.createElement('td');
                td.innerText = value;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    function generateStructuralMatrix(size, mod, matrixA, matrixB, matrixElementS, rankS0) {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                // Example logic to generate matrix based on provided inputs
                row.push((matrixA * i + matrixB * j + matrixElementS) % mod);
            }
            matrix.push(row);
        }
        return matrix;
    }

    function generateInverseMatrix(matrix, mod) {
        // Placeholder logic for generating the inverse of the matrix
        // Implement proper matrix inversion logic as needed
        const size = matrix.length;
        const inverseMatrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push((mod - matrix[i][j]) % mod); // Simplified logic for demonstration
            }
            inverseMatrix.push(row);
        }
        return inverseMatrix;
    }

    window.generateMatrices = function() {
        const matrixA = parseInt(document.getElementById('matrixA').value);
        const matrixB = parseInt(document.getElementById('matrixB').value);
        const matrixElementS = parseInt(document.getElementById('matrixElementS').value);
        const rankS0 = parseInt(document.getElementById('rankS0').value);
        const matrixSize = parseInt(document.getElementById('matrixSize').value);
        const modulus = parseInt(document.getElementById('modulus').value);

        const structuralMatrix = generateStructuralMatrix(matrixSize, modulus, matrixA, matrixB, matrixElementS, rankS0);
        const inverseStructuralMatrix = generateInverseMatrix(structuralMatrix, modulus);

        renderMatrix(structuralMatrix, 'structuralMatrix');
        renderMatrix(inverseStructuralMatrix, 'inverseStructuralMatrix');
    }
});




