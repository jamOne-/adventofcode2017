import { Test, runTests } from '../test-runner';
import { SpiralMover } from './spiral-mover';
import { Matrix } from './matrix';
import * as fs from 'fs';

function sumSquare(matrix: Matrix<number>, [x = 0, y = 0] = []) {
    const offsets = [-1, 0, 1];
    const xs = offsets.map(offset => offset + x);
    const ys = offsets.map(offset => offset + y);

    let sum = 0;

    for (const y of ys) {
        for (const x of xs) {
            sum += matrix.at([x, y]) || 0;
        }
    }

    return sum;
}

function solve(input: string) {
    const n = parseInt(input, 10);
    const matrixSize = 101;
    const center: [number, number] = [Math.floor(matrixSize / 2), Math.floor(matrixSize / 2)];
    const spiralMover = new SpiralMover(...center);
    const matrix = new Matrix<number>(matrixSize, matrixSize);
    
    matrix.setElementAt(center, 1);

    while (n > matrix.at(spiralMover.getPosition())) {
        const position = spiralMover.move();
        matrix.setElementAt(position, sumSquare(matrix, position));
    }

    return matrix.at(spiralMover.getPosition());
}

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
