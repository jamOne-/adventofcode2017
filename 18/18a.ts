import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

type Dictionary<T> = { [key: string]: T };

function createRegisters() {
    return new Proxy(<Dictionary<number>>{}, {
        get(registers, prop) {
            const propString = prop.toString();

            if (propString >= 'a' && propString <= 'z') {
                return registers[prop] || 0;
            }

            return +prop.toString();
        },
    });
}

function solve(input: string) {
    const instructions = input.split('\r\n');
    const registers = createRegisters();

    let currentInstruction = 0;
    let lastFrequency = -1;

    while (currentInstruction < instructions.length) {
        const [instruction, ...args] = instructions[currentInstruction].split(' ');

        switch (instruction) {
        case 'snd': {
            lastFrequency = registers[args[0]];
            break;
        }

        case 'set': {
            registers[args[0]] = registers[args[1]];
            break;
        }

        case 'add': {
            registers[args[0]] += registers[args[1]];
            break;
        }

        case 'mul': {
            registers[args[0]] *= registers[args[1]];
            break;
        }

        case 'mod': {
            registers[args[0]] %= registers[args[1]];
            break;
        }

        case 'rcv': {
            if (registers[args[0]] !== 0) {
                return lastFrequency;
            }

            break;
        }

        case 'jgz': {
            if (registers[args[0]] > 0) {
                currentInstruction += registers[args[1]] - 1;
            }

            break;
        }
        }

        currentInstruction += 1;
    }
}

const testList: Test[] = [
    // tslint:disable-next-line:max-line-length
    { input: 'set a 1\r\nadd a 2\r\nmul a a\r\nmod a 5\r\nsnd a\r\nset a 0\r\nrcv a\r\njgz a -1\r\nset a 1\r\njgz a -2', output: 4 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
