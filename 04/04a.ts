import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function solve(input: string) {
    const lines = input.split('\r\n');

    return lines.reduce((sum, line) => {
        const words = line.split(/\s/);
        const allUnique = words.length === new Set(words).size;

        return sum + (allUnique ? 1 : 0);
    },                  0);
}

const testList: Test[] = [
    { input: 'aa bb cc dd ee', output: 1 },
    { input: 'aa bb cc dd aa', output: 0 },
    { input: 'aa bb cc dd aaa', output: 1 },
    { input: 'aa bb cc dd ee\r\naa bb cc dd aa\r\naa bb cc dd aaa', output: 2 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
