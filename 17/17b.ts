import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function solve(input: string, inserts: number = 50000000) {
    const steps = Number.parseInt(input, 10);
    
    let bufferLength = 1;
    let currentPosition = 0;
    let lastAfterZero = -1;

    for (let i = 1; i <= inserts; i += 1) {
        currentPosition = (currentPosition + steps) % bufferLength + 1;
        bufferLength += 1;

        if (currentPosition === 1)
            lastAfterZero = i;
    }

    return lastAfterZero;
}

const testList: Test[] = [
    { input: '3', output: 2 },
];

runTests(input => solve(input, 4), testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
