import { Test, runTests } from '../test-runner';
import { solve as knotHash } from '../10/10b';
import * as fs from 'fs';

function solve(input: string) {
    let ones = 0;
    
    for (let row = 0; row < 128; row += 1) {
        const hash = knotHash(`${input}-${row}`);

        for (const digit of hash) {
            const binary = Number.parseInt(digit, 16).toString(2);
            
            for (const binaryDigit of binary) {
                ones += Number.parseInt(binaryDigit, 2);
            }
        }
    }

    return ones;
}

const testList: Test[] = [
    { input: 'flqrgnkx', output: 8108 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
