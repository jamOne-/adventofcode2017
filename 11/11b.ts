import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

type Position = {
    d1: number,
    d2: number,
    x: number,
};

function move({ d1, d2, x }: Position, direction: string) {
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

function distance({ d1, d2, x }: Position) {
    return (Math.abs(x) + Math.abs(d1) + Math.abs(d2)) / 2;
}

function solve(input: string) {
    const directions = input.split(',');

    let position = { x: 0, d1: 0, d2: 0 };
    let biggestDistance = 0;

    directions.forEach(direction => {
        position = move(position, direction);
        biggestDistance = Math.max(biggestDistance, distance(position));
    });

    return biggestDistance;
}

const testList: Test[] = [];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
