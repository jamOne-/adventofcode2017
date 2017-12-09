import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function solve(input: string) {
    let sum = 0;
    let garbageMode = false;

    for (let i = 0; i < input.length; i += 1) {
        if (input[i] === '!') {
            i += 1;
            continue;
        }

        if (garbageMode && input[i] === '>') {
            garbageMode = false;
        } else if (!garbageMode && input[i] === '<') {
            garbageMode = true;
        } else if (garbageMode) {
            sum += 1;
        }
    }

    return sum;
}

const testList: Test[] = [
    { input: '<>', output: 0 },
    { input: '<random characters>', output: 17 },
    { input: '<<<<>', output: 3 },
    { input: '<{!>}>', output: 2 },
    { input: '<!!>', output: 0 },
    { input: '<!!!>>', output: 0 },
    { input: '<{o"i!a,<{i<a>', output: 10 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
