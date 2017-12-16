import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function split<T>(array: T[], position: number) {
    const result: [T[], T[]] = [[], []];

    for (let i = 0; i < array.length; i += 1) {
        result[+(i >= position)].push(array[i]);
    }

    return result;
}

function solve(input: string, lettersCount = 16) {
    const moves = input.split(',');
    let letters: string[] = [];

    for (let i = 0; i < lettersCount; i += 1) {
        letters.push(String.fromCharCode('a'.charCodeAt(0) + i));
    }

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

    return letters.join('');
}

const testList: Test[] = [
    { input: 's1,x3/4,pe/b', output: 'baedc' },
];

runTests(input => solve(input, 5), testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
