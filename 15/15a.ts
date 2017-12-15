import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

const A_FACTOR = 16807;
const B_FACTOR = 48271;
const MODULO = 2147483647;

function generateNext(previous: number, factor: number) {
    return previous * factor % MODULO;
}

function lowest16Bits(n: number) {
    return n & 0xFFFF;
}

function solve(input: string) {
    const lines = input.split('\r\n');
    
    let [a, b] = lines.map(line => Number.parseInt(line.split('starts with ')[1], 10));
    let matches = 0;

    for (let i = 0; i < 40000000; i += 1) {
        a = generateNext(a, A_FACTOR);
        b = generateNext(b, B_FACTOR);

        if (lowest16Bits(a) === lowest16Bits(b))
            matches += 1;
    }

    return matches;
}

const testList: Test[] = [
    { input: 'Generator A starts with 65\r\nGenerator B starts with 8921', output: 588 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
