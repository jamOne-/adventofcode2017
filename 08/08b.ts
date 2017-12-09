import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

type Comparison = (x: number, y: number) => boolean;
type Calculation = (x: number, y: number) => number;

const operations: { [op: string]: Comparison | Calculation } = {
    inc: (x, y) => x + y,
    dec: (x, y) => x - y,
    '==': (x, y) => x === y,
    '!=': (x, y) => x !== y,
    '>': (x, y) => x > y,
    '>=': (x, y) => x >= y,
    '<': (x, y) => x < y,
    '<=': (x, y) => x <= y,
};

function initRegisters() {
    return new Proxy(<{ [name: string]: number} >{}, {
        get(target, name) {
            if (name in target)
                return target[name];
            
            return 0;
        },
    });
}

function solve(input: string) {
    const lines = input.split('\r\n');
    const registers = initRegisters();
    let maxEver = 0;

    lines.forEach(line => {
        const [reg1, op1, val1, _, reg2, op2, val2] = line.split(/\s+/);

        if (operations[op2](registers[reg2], +val2)) {
            registers[reg1] = <number>operations[op1](registers[reg1], +val1);
            maxEver = Math.max(maxEver, registers[reg1]);
        }
    });

    return maxEver;
}

const testList: Test[] = [
    {
        input: 'b inc 5 if a > 1\r\na inc 1 if b < 5\r\nc dec -10 if a >= 1\r\nc inc -20 if c == 10',
        output: 10,
    },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
