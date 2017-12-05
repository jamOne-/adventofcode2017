import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function solve(input: string) {
    const lines = input.split('\r\n');
    const instructions = lines.map(line => Number.parseInt(line, 10));

    let i = 0;
    let counter = 0;

    while (i < instructions.length) {
        const jumpBy = instructions[i];
        instructions[i] += 1;
        i += jumpBy;
        counter += 1;
    }

    return counter;
}

const testList: Test[] = [
    { input: '0\r\n3\r\n0\r\n1\r\n-3', output: 5 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
