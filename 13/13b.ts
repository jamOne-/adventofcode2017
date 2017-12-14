import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function gotCaught(firewall: number[], time: number) {
    for (let layer = 0; layer < firewall.length; layer += 1) {
        const depth = firewall[layer];

        if ((time + layer) % (2 * (depth - 1)) === 0) {
            return true;
        }
    }

    return false;
}

function solve(input: string) {
    const lines = input.split('\r\n');
    const MAX_LAYERS = 100;
    // tslint:disable-next-line:prefer-array-literal
    const firewall = new Array(MAX_LAYERS);

    lines.forEach(line => {
        const [layer, depth] = line.split(': ');
        firewall[+layer] = +depth;
    });

    let time = 0;

    while (gotCaught(firewall, time))
        time += 1;

    return time;
}

const testList: Test[] = [
    { input: '0: 3\r\n1: 2\r\n4: 4\r\n6: 4', output: 10 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
