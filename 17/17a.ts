import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function solve(input: string) {
    const steps = Number.parseInt(input, 10);
    const buffer = [0];
    let currentPosition = 0;

    for (let i = 1; i <= 2017; i += 1) {
        currentPosition = (currentPosition + steps + 1) % buffer.length;
        buffer.splice(currentPosition, 0, i);
    }

    return buffer[(currentPosition + 1) % buffer.length];
}

const testList: Test[] = [
    { input: '3', output: 638 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
