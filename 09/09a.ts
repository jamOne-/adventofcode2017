import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function solve(input: string) {
    let sum = 0;
    let level = 0;
    let garbageMode = false;

    for (let i = 0; i < input.length; i += 1) {
        if (input[i] === '!') {
            i += 1;
            continue;
        }

        if (garbageMode && input[i] === '>') {
            garbageMode = false;
        } else if (!garbageMode) {
            switch (input[i]) {
            case '{':
                level += 1;
                break;
            
            case '}':
                sum += level;
                level -= 1;
                break;

            case '<':
                garbageMode = true;
                break;
            }
        }
    }

    return sum;
}

const testList: Test[] = [
    { input: '{}', output: 1 },
    { input: '{{{}}}', output: 6 },
    { input: '{{},{}}', output: 5 },
    { input: '{{{},{},{{}}}}', output: 16 },
    { input: '{<a>,<a>,<a>,<a>}', output: 1 },
    { input: '{{<ab>},{<ab>},{<ab>},{<ab>}}', output: 9 },
    { input: '{{<!!>},{<!!>},{<!!>},{<!!>}}', output: 9 },
    { input: '{{<a!>},{<a!>},{<a!>},{<ab>}}', output: 3 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
