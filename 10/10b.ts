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

type RoundResult = { list: number[], i: number, skip: number };
function round({ lengths, list, i, skip }: { lengths: number[] } & RoundResult): RoundResult {
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

    return { list, i, skip };
}

export function solve(input: string, items = 256) {
    const lengthsSuffix = [17, 31, 73, 47, 23];
    const lengths = [...input.split('').map(char => char.charCodeAt(0)), ...lengthsSuffix];

    let list = createList(items);
    let skip = 0;
    let i = 0;

    for (let roundNumber = 0; roundNumber < 64; roundNumber += 1) {
        const result =  round({ lengths, list, skip, i });

        list = result.list;
        skip = result.skip;
        i = result.i;
    }

    let result = '';

    for (let block = 0; block < 16; block += 1) {
        const numbers = take(list, 16, block * 16);
        const xor = numbers.reduce((xor, n) => xor ^ n);
        const hex = xor.toString(16);

        if (hex.length === 1) {
            result += '0' + hex;
        } else {
            result += hex;
        }
    }

    return result;
}

const testList: Test[] = [
    { input: '', output: 'a2582a3a0e66e6e86e3812dcb672a272' },
    { input: 'AoC 2017', output: '33efeb34ea91902bb2f59c9920caa6cd' },
    { input: '1,2,3', output: '3efbe78a8d82f29979031a4aa0b16a9d' },
    { input: '1,2,4', output: '63960835bcdc130f0b66d7ff4f6a5a8e' },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
