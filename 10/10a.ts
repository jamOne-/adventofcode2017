import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function createList(length: number) {
    const result: number[] = [];

    for (let i = 0; i < length; i += 1) {
        result.push(i);
    }

    return result;
}

function take<T>(array: T[], count: number, offset = 0) {
    if (count === -1) {
        count = array.length - offset;
    }

    const result = [];

    for (let i = 0; i < count; i += 1) {
        result.push(array[(i + offset) % array.length]);
    }

    return result;
}

function solve(input: string, items = 256) {
    const lengths = input.split(/,\s*/).map(length => Number.parseInt(length, 10));
    let list = createList(items);
    let skip = 0;
    let i = 0;

    lengths.forEach(length => {
        const reversed = take(list, length, i).reverse();

        if (i + length < list.length) {
            const beginning = take(list, i);
            const ending = take(list, -1, i + length);

            list = [...beginning, ...reversed, ...ending];
        } else {
            const endingLength = list.length - i;
            const beginningLength = length - endingLength;
            const ending = take(reversed, endingLength);
            const beginning = take(reversed, beginningLength, endingLength);
            const middle = take(list, list.length - endingLength - beginningLength, beginningLength);

            list = [...beginning, ...middle, ...ending];
        }

        i = (i + length + skip) % list.length;
        skip += 1;
    });

    return list[0] * list[1];    
}

const testList: Test[] = [
    { input: '3', output: 2 },
    { input: '3, 4', output: 12 },
    { input: '3, 4, 1', output: 12 },
    { input: '3, 4, 1, 5', output: 12 },
];

runTests(input => solve(input, 5), testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
