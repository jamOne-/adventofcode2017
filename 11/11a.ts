import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function move({ d1, d2, x }: { d1: number, d2: number, x: number }, direction: string) {
    switch (direction) {
    case 'n': return { x, d1: d1 + 1, d2: d2 + 1 };
    case 's': return { x, d1: d1 - 1, d2: d2 - 1 };
    case 'ne': return { d2, x: x + 1, d1: d1 + 1 };
    case 'nw': return { d1, x: x - 1, d2: d2 + 1 };
    case 'se': return { d1, x: x + 1, d2: d2 - 1 };
    case 'sw': return { d2, x: x - 1, d1: d1 - 1 };
    default: throw 'bad direction!';
    }
}

function solve(input: string) {
    const directions = input.split(',');
    const endPosition = directions.reduce(move, { x: 0, d1: 0, d2: 0 });

    return (Math.abs(endPosition.x) + Math.abs(endPosition.d1) + Math.abs(endPosition.d2)) / 2;
}

const testList: Test[] = [
    { input: 'ne,ne,ne', output: 3 },
    { input: 'ne,ne,sw,sw', output: 0 },
    { input: 'ne,ne,s,s', output: 2 },
    { input: 'se,sw,se,sw,sw', output: 3 },
    { input: 's,se,ne,ne,n,nw,s,nw,sw', output: 0 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
