import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function serialize(cells: number[]) {
    return cells.join(' ');
}

function solve(input: string) {
    const cells = input.split(/\s/).map(cell => Number.parseInt(cell, 10));
    const states = new Set<string>([serialize(cells)]);
    let counter = 0;

    while (true) {
        let toDistribute = Math.max(...cells);
        let i = cells.indexOf(toDistribute);
        
        cells[i] = 0;
        i = (i + 1) % cells.length;

        while (toDistribute > 0) {
            cells[i] += 1;
            toDistribute -= 1;
            i = (i + 1) % cells.length;
        }

        counter += 1;
        const currentState = serialize(cells);

        if (states.has(currentState)) {
            break;
        }

        states.add(currentState);
    }

    return counter;
}

const testList: Test[] = [
    { input: '0 2 7 0', output: 5 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
