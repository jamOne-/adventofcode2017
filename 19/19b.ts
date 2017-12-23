import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

function oppositeDirection(direction: string) {
    const directions = ['U', 'R', 'D', 'L'];
    return directions[(directions.indexOf(direction) + 2) % 4];
}

function turnDirection(maze: string[], x: number, y: number, direction: string) {
    const previousPosition = move(x, y, oppositeDirection(direction));
    const positions = [
        { y, x: x - 1, direction: 'L' },
        { y, x: x + 1, direction: 'R' },
        { x, y: y - 1, direction: 'U' },
        { x, y: y + 1, direction: 'D' },
    ];

    for (const { x, y, direction } of positions) {
        if (maze[y] && maze[y][x] && maze[y][x] !== ' ' && (x !== previousPosition.x || y !== previousPosition.y)) {
            return direction;
        }
    }

    return direction;
}

function move(x: number, y: number, direction: string) {
    switch (direction) {
    case 'U':
        y -= 1;
        break;
    case 'R':
        x += 1;
        break;
    case 'D':
        y += 1;
        break;
    case 'L':
        x -= 1;
        break;
    }

    return { x, y };
}

function solve(input: string) {
    const maze = input.split('\r\n');

    let path = '';
    let y = 0;
    let x = maze[0].indexOf('|');
    let direction = 'D';
    let step = 0;

    while (maze[y] && maze[y][x] && maze[y][x] !== ' ') {
        const field = maze[y][x];

        if (field >= 'A' && field <= 'Z') {
            path += field;
        } else if (field === '+') {
            direction = turnDirection(maze, x, y, direction);
        }

        const moved = move(x, y, direction);
        x = moved.x;
        y = moved.y;
        step += 1;
    }

    return step;
}

const testList: Test[] = [
    { 
        input:
            '    |          \r\n' +
            '    |  +--+    \r\n' +
            '    A  |  C    \r\n' +
            'F---|----E|--+ \r\n' +
            '    |  |  |  D \r\n' +
            '    +B-+  +--+ \r\n',
        output: 38,
    },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
