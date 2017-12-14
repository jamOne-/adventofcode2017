import { Test, runTests } from '../test-runner';
import { solve as knotHash } from '../10/10b';
import * as fs from 'fs';

const DISK_SIZE = 128;

function solve(input: string) {
    const disk: string[][] = [];
    
    for (let row = 0; row < DISK_SIZE; row += 1) {
        const hash = knotHash(`${input}-${row}`);
        const rowArray: string[] = [];

        for (const digit of hash) {
            let binary = Number.parseInt(digit, 16).toString(2);

            while (binary.length < 4)
                binary = '0' + binary;

            for (const binaryDigit of binary)
                rowArray.push(binaryDigit);
        }

        disk.push(rowArray);
    }

    let regions = 0;

    for (let y = 0; y < DISK_SIZE; y += 1) {
        for (let x = 0; x < DISK_SIZE; x += 1) {
            if (disk[y][x] !== '1')
                continue;

            disk[y][x] = '0';
            regions += 1;

            const q: { x: number, y: number}[] = [{ x, y }];

            while (q.length > 0) {
                const { x, y } = q.shift() !;
                const xs = [x - 1, x + 1];
                const ys = [y - 1, y + 1];
                const neighbours = [
                    ...xs.map(x => ({ x, y })),
                    ...ys.map(y => ({ x, y })),
                ];

                for (const { x, y } of neighbours) {
                    if (disk[y] && disk[y][x] === '1') {
                        disk[y][x] = '0';
                        q.push({ x, y });
                    }
                }
            }
        }
    }

    return regions;
}

const testList: Test[] = [
    { input: 'flqrgnkx', output: 1242 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
