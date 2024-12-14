import {readLinesFromFile} from "../utils/file-reader.mjs";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = resolve(__dirname, "input.txt");

const conditionalStatementsRegex = /don't\(\).*?(do\(\)|$)/g;
const multiplyInstructionRegEx = /mul\(\d+,\d+\)/g;

let corruptedMemory = "";

const logSumOfProducts = (mulInstrs, conditionalLogic) => {
    const sumOfProducts = mulInstrs.reduce((total, mulInstr) => {
        const product = mulInstr.match(/\d+/g).reduce((a, b) => a * b, 1); // turns instruction into int array of size 2, then gets product of those ints
        return (total += product);
    }, 0);
    console.log(`Sum of products${conditionalLogic ? " with conditional logic" : ""}:`, sumOfProducts);
};

const main = (corruptedMemory) => {
    const mulInstrs = corruptedMemory.match(multiplyInstructionRegEx);
    const mulInstrsWithConditionalLogic = corruptedMemory
        .replace(conditionalStatementsRegex, "")
        .match(multiplyInstructionRegEx);

    logSumOfProducts(mulInstrs, false);
    logSumOfProducts(mulInstrsWithConditionalLogic, true);
};

readLinesFromFile(
    inputFilePath,
    (line) => (corruptedMemory += line),
    () => main(corruptedMemory)
);
