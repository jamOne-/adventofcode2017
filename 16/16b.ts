import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

const NUMBER_OF_DANCES = 1000000000;

function split<T>(array: T[], position: number) {
    const result: [T[], T[]] = [[], []];

    for (let i = 0; i < array.length; i += 1) {
        result[+(i >= position)].push(array[i]);
    }

    return result;
}

function solve(input: string, lettersCount = 16) {
    const moves = input.split(',');
    const states = new Map<string, number>();
    let letters: string[] = [];

    for (let i = 0; i < lettersCount; i += 1) {
        letters.push(String.fromCharCode('a'.charCodeAt(0) + i));
    }

    let cycleLength;
    for (cycleLength = 0; cycleLength < NUMBER_OF_DANCES; cycleLength += 1) {
        if (states.has(letters.join(''))) {
            break;
        }

        states.set(letters.join(''), cycleLength);

        moves.forEach(move => {
            switch (move[0]) {
            case 's': {
                const n = Number.parseInt(move.match(/s(\d+)/)![1], 10);
                const [beginning, lastN] = split(letters, letters.length - n);
                
                letters = [...lastN, ...beginning];
                break;
            }

            case 'x': {
                const match = move.match(/x(\d+)\/(\d+)/) !;
                const i = Number.parseInt(match[1], 10);
                const j = Number.parseInt(match[2], 10);

                const temp = letters[i];
                letters[i] = letters[j];
                letters[j] = temp;
                break;
            }

            case 'p': {
                const match = move.match(/p(\w+)\/(\w+)/) !;
                const i = letters.indexOf(match[1]);
                const j = letters.indexOf(match[2]);

                letters[i] = match[2];
                letters[j] = match[1];
                break;
            }
            }
        });
    }

    const stateNumber = NUMBER_OF_DANCES % cycleLength;

    for (const [state, number] of states.entries()) {
        if (number === stateNumber)
            return state;
    }
}

const testList: Test[] = [];

runTests(input => solve(input, 5), testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
