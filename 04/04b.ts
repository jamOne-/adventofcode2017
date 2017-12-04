import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function solve(input: string) {
    const lines = input.split('\r\n');

    return lines.reduce((sum, line) => {
        const words = line.split(/\s/).map(word => word.split('').sort().join(''));
        const allUnique = words.length === new Set(words).size;

        return sum + (allUnique ? 1 : 0);
    },                  0);
}

const testList: Test[] = [
    { input: 'abcde fghij', output: 1 },
    { input: 'abcde xyz ecdab', output: 0 },
    { input: 'a ab abc abd abf abj', output: 1 },
    { input: 'iiii oiii ooii oooi oooo', output: 1 },
    { input: 'oiii ioii iioi iiio', output: 0 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
