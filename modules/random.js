function matrixo(m) {
    var matrix = [];
    for (var i = 0; i < m; i++) {
        matrix.push([]);
        for (var j = 0; j < m; j++) {
            matrix[i][j] = Math.floor(Math.random() * 3);
        }
        for (var j = 0; j < m; j++) {
            matrix[i][j] = Math.floor(Math.random() * 4);
        }
        for (var j = 0; j < m + 3; j++) {
            matrix[i][j] = Math.floor(Math.random() * 5);
        }
        for (var j = 0; j < m; j++) {
            matrix[i][j] = Math.floor(Math.random() * 6);
        }
        for (var j = 0; j < m; j++) {
            matrix[i][j] = Math.floor(Math.random() * 7);
        }
    }
    return matrix;
}

module.exports = matrixo;