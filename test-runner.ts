const fgGreen = '\x1b[32m';
const reset = '\x1b[0m';

export type Test = {
    input: string;
    output: number;
    message?: string;
};

export function runTests(solver: (input: string) => number, testList: Test[]) {
    let testsFailed = 0;

    console.info('[Tests] Starting tests...');

    testList.forEach((test, i) => {
        const output = solver(test.input);

        if (output !== test.output) {
            const message = test.message || `${i}`;
            const errorMessage = `[Tests] ${message} failed:` + 
                `\n\t-input: ${test.input}` +
                `\n\t-expected: ${test.output}` +
                `\n\t-got: ${output}`;

            console.error(errorMessage);
            testsFailed = testsFailed + 1;
        }
    });

    if (testsFailed === 0) {
        console.info(fgGreen + '[Tests] All tests passed' + reset);
    } else {
        console.info(`[Tests] ${testsFailed} tests failed.`);
    }
}
