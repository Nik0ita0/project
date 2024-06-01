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

    window.generateMatrices = function() {
        const matrixSize = document.getElementById('matrixSize').value;
        const modulus = document.getElementById('modulus').value;
        
        const structuralMatrix = generateMatrix(matrixSize, modulus);
        const inverseStructuralMatrix = generateMatrix(matrixSize, modulus); // Placeholder for actual inverse calculation
        
        renderMatrix(structuralMatrix, 'structuralMatrix');
        renderMatrix(inverseStructuralMatrix, 'inverseStructuralMatrix');
    }
});
