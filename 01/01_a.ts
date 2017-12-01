import { Test, runTests } from '../test-runner';
import { Enumerable } from 'powerseq';
import * as fs from 'fs';

function solve(input: string) {
    const digits = Enumerable.from<string>(input.split(''));

    return digits
        .zip<string, [string, string]>(
            digits.skip(1).concat(digits.take(1)),
            (x, y) => [x, y],
        )
        .reduce((sum, [x, y]) => sum + (x === y ? +x : 0), 0);
}

const testList: Test[] = [
    { input: '1122', output: 3 },
    { input: '1111', output: 4 },
    { input: '1234', output: 0 },
    { input: '91212129', output: 9 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
