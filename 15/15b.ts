import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

const A_FACTOR = 16807;
const B_FACTOR = 48271;
const A_MULTOF = 4;
const B_MULTOF = 8;
const MODULO = 2147483647;

function generateNext(previous: number, factor: number, multOf: number) {
    let value = previous * factor % MODULO;

    while (value % multOf !== 0) {
        value = value * factor % MODULO;
    }

    return value;
}

function lowest16Bits(n: number) {
    return n & 0xFFFF;
}

function solve(input: string) {
    const lines = input.split('\r\n');
    
    let [a, b] = lines.map(line => Number.parseInt(line.split('starts with ')[1], 10));
    let matches = 0;

    for (let i = 0; i < 5000000; i += 1) {
        a = generateNext(a, A_FACTOR, A_MULTOF);
        b = generateNext(b, B_FACTOR, B_MULTOF);

        if (lowest16Bits(a) === lowest16Bits(b))
            matches += 1;
    }

    return matches;
}

const testList: Test[] = [
    { input: 'Generator A starts with 65\r\nGenerator B starts with 8921', output: 309 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
