export class Matrix<T> {
    private matrix: T[][];
    
    constructor(rows: number, cols: number) {
        // tslint:disable-next-line:prefer-array-literal
        const matrix = new Array(rows);
        
        for (let i = 0; i < rows; i += 1) {
            // tslint:disable-next-line:prefer-array-literal
            matrix[i] = new Array(cols);
        }

        this.matrix = matrix;
    }

    at([x = 0, y = 0] = []) {
        return this.matrix[y][x];
    }

    setElementAt([x = 0, y = 0] = [], element: T) {
        this.matrix[y][x] = element;
    }
}
