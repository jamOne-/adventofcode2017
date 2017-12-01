import { Test, runTests } from '../test-runner';
import { Enumerable } from 'powerseq';
import * as fs from 'fs';

function solve(input: string) {
    const digits = input.split('');
    const halfLength = digits.length / 2;
    let sum = 0;

    for (let i = 0; i < digits.length; i += 1) {
        if (digits[i] === digits[(i + halfLength) % digits.length]) {
            sum += +digits[i];
        }
    }

    return sum;
}

const testList: Test[] = [
    { input: '1212', output: 6 },
    { input: '1221', output: 0 },
    { input: '123425', output: 4 },
    { input: '123123', output: 12 },
    { input: '12131415', output: 4 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
