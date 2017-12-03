import { Test, runTests } from '../test-runner';
import { SpiralMover } from './spiral-mover';
import * as fs from 'fs';

function distance([x = 0, y = 0] = []) {
    return Math.abs(x) + Math.abs(y);
}

function solve(input: string) {
    const n = parseInt(input, 10);
    const spiralMover = new SpiralMover();    
    let currentNumber = 1;

    while (n > currentNumber) {
        spiralMover.move();
        currentNumber += 1;
    }

    return distance(spiralMover.getPosition());
}

const testList: Test[] = [
    { input: '1', output: 0 },
    { input: '12', output: 3 },
    { input: '23', output: 2 },
    { input: '1024', output: 31 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
