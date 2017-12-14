import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function solve(input: string) {
    const lines = input.split('\r\n');
    const MAX_LAYERS = 100;
    // tslint:disable-next-line:prefer-array-literal
    const firewall = new Array(MAX_LAYERS);

    lines.forEach(line => {
        const [layer, depth] = line.split(': ');
        firewall[+layer] = +depth;
    });

    let sum = 0;

    for (let time = 0; time < MAX_LAYERS; time += 1) {
        const depth = firewall[time];

        if (time % (2 * (depth - 1)) === 0) {
            sum += time * depth;
        }
    }

    return sum;
}

const testList: Test[] = [
    { input: '0: 3\r\n1: 2\r\n4: 4\r\n6: 4', output: 24 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
