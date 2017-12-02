import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function solve(input: string) {
    const lines = input.split('\r\n');
    
    return lines.reduce((sum, line) => {
        const numbers = line.split(/\s/).map(s => +s);
        return sum + Math.max(...numbers) - Math.min(...numbers);
    },                  0);
}

const testList: Test[] = [
    { input: '5 1 9 5', output: 8 },
    { input: '7 5 3', output: 4 },
    { input: '2 4 6 8', output: 6 },
    {
        input: `5 1 9 5\r\n7 5 3\r\n2 4 6 8`,
        output: 18,
    },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
