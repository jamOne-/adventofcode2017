import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

type Dictionary<T> = { [key: string]: T };
type MessageFunction = (message: number) => void;

enum ProgramState {
    READY,
    RUNNING,
    WAITING,
    TERMINATED,
}

class Program {
    state: ProgramState = ProgramState.READY;
    messagesSent: number = 0;

    private _currentInstruction: number = 0;
    private _registers: Dictionary<number> = {};
    private _messagesQueue: number[] = [];
    private _out: MessageFunction = _ => {};

    constructor(public id: number, private _instructions: string[]) {
        this._registers = this._createRegisters();
        this._registers['p'] = id;
    }

    setOutFunction(out: MessageFunction) {
        this._out = out;
    }

    canBeRun() {
        return  this.state === ProgramState.READY ||
                this.state === ProgramState.WAITING && this._messagesQueue.length > 0;
    }

    run() {
        this.state = ProgramState.RUNNING;

        while (this._currentInstruction < this._instructions.length) {
            const [instruction, ...args] = this._instructions[this._currentInstruction].split(' ');
    
            switch (instruction) {
            case 'snd': {
                this.messagesSent += 1;
                this._out(this._registers[args[0]]);
                break;
            }
    
            case 'set': {
                this._registers[args[0]] = this._registers[args[1]];
                break;
            }
    
            case 'add': {
                this._registers[args[0]] += this._registers[args[1]];
                break;
            }
    
            case 'mul': {
                this._registers[args[0]] *= this._registers[args[1]];
                break;
            }
    
            case 'mod': {
                this._registers[args[0]] %= this._registers[args[1]];
                break;
            }
    
            case 'rcv': {
                if (this._messagesQueue.length > 0) {
                    this._registers[args[0]] = this._messagesQueue.shift() !;
                } else {
                    this.state = ProgramState.WAITING;
                    return ;
                }

                break;
            }
    
            case 'jgz': {
                if (this._registers[args[0]] > 0) {
                    this._currentInstruction += this._registers[args[1]] - 1;
                }
    
                break;
            }
            }
    
            this._currentInstruction += 1;
        }

        this.state = ProgramState.TERMINATED;
    }

    sendMessage(message: number) {
        this._messagesQueue.push(message);
    }

    // tslint:disable-next-line:function-name
    private _createRegisters() {
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
}

function solve(input: string) {
    const instructions = input.split('\r\n');
    const program0 = new Program(0, instructions);
    const program1 = new Program(1, instructions);

    program0.setOutFunction(program1.sendMessage.bind(program1));
    program1.setOutFunction(program0.sendMessage.bind(program0));

    while (program0.canBeRun() || program1.canBeRun()) {
        if (program0.canBeRun()) {
            program0.run();
        } else {
            program1.run();
        }
    }

    return program1.messagesSent;
}

const testList: Test[] = [
    // tslint:disable-next-line:max-line-length
    { input: 'set a 1\r\nadd a 2\r\nmul a a\r\nmod a 5\r\nsnd a\r\nset a 0\r\nrcv a\r\njgz a -1\r\nset a 1\r\njgz a -2', output: 1 },
    { input: 'snd 1\r\nsnd 2\r\nsnd p\r\nrcv a\r\nrcv b\r\nrcv c\r\nrcv d', output: 3 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
