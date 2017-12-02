import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function solve(input: string) {
    const lines = input.split('\r\n');
    
    return lines.reduce((sum, line) => {
        const numbers = line.split(/\s/).map(s => +s);

        for (let i = 0; i < numbers.length; i += 1) {
            for (let j = i + 1; j < numbers.length; j += 1) {
                const [a, b] = [Math.max(numbers[i], numbers[j]), Math.min(numbers[i], numbers[j])];

                if (a % b === 0) {
                    return sum + a / b;
                }
            }
        }

        return NaN;
    },                  0);
}

const testList: Test[] = [
    { input: '5 9 2 8', output: 4 },
    { input: '9 4 7 3', output: 3 },
    { input: '3 8 6 5', output: 2 },
    {
        input: `5 9 2 8\r\n9 4 7 3\r\n 3 8 6 5`,
        output: 9,
    },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
