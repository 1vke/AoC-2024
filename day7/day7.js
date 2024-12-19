import {readLinesFromFile} from "../utils/file-reader.js";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = resolve(__dirname, "input.txt");

const operators = ["+", "*"];
const calibrationExs = [];

const onLine = (line) => {
    const calibrationEx = line.split(":").map((str, index) => {
        if (index === 0) return +str;
        else return str.slice(1);
    });
    calibrationExs.push(calibrationEx);
};

const evaluateExpression = (expression) => {
    const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g);
    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseFloat(tokens[i + 1]);

        // Apply the operator
        switch (operator) {
            case "+":
                result += nextNumber;
                break;
            case "*":
                result *= nextNumber;
                break;
        }
    }

    return result;
};

const logSumOfSolvableExs = () => {
    const solvableExs = calibrationExs.filter(([testValue, ex]) => {
        const operatorAmount = ex.split(" ").length - 1;
        for (let i = 0; i < operators.length ** operatorAmount; i++) {
            let possibleEx = ex;

            const operatorIndexes = i
                .toString(2)
                .padStart(operatorAmount, "0")
                .split("")
                .map((str) => +str);

            for (const index of operatorIndexes) {
                possibleEx = possibleEx.replace(/ /, operators[index]);
            }

            if (testValue === evaluateExpression(possibleEx)) return true;
        }

        return false;
    });

    console.log(solvableExs.reduce((total, [testValue]) => (total += testValue), 0));
};

const main = () => {
    logSumOfSolvableExs();
};

readLinesFromFile(
    inputFilePath,
    (line) => onLine(line),
    () => main()
);
