import {readLinesFromFile} from "../utils/file-reader.js";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = resolve(__dirname, "input.txt");

const rules = [];
const updates = [];

const onLine = (line) => {
    if (line.trim().length === 0) return;

    if (line.includes("|")) rules.push(line.split("|").map((val) => +val));
    else updates.push(line.split(",").map((val) => +val));
};

const sortPageNumber = (rules, update, currentPageNumber, visited) => {
    if (visited.has(currentPageNumber)) {
        return;
    }

    for (const [, y] of rules.filter(([x]) => x === currentPageNumber)) {
        sortPageNumber(rules, update, y, visited);
    }

    visited.add(currentPageNumber);

    // Ensure current page number is sorted correctly according to rules
    for (const [x, y] of rules.filter(([x]) => x === currentPageNumber)) {
        const xIndex = update.indexOf(x);
        const yIndex = update.indexOf(y);
        if (xIndex > yIndex) {
            update.splice(xIndex, 1); // Remove x
            update.splice(yIndex, 0, x); // Add x before y
        }
    }
};

const sortUpdate = (rules, update) => {
    const relevantRules = rules.filter((rule) => rule.every((pageNumber) => update.includes(pageNumber)));

    const visited = new Set();
    for (const pageNumber of update) {
        sortPageNumber(relevantRules, update, pageNumber, visited);
    }

    return update;
};

const getSumOfMiddleNumbers = (updates) => {
    return updates.reduce((sum, update) => (sum += update[Math.floor(update.length / 2)]), 0);
};

const logSumOfMiddleNumbers = (updates, rules) => {
    const sortedUpdates = updates.map((update) => sortUpdate(rules, update.slice()));

    const correctUpdates = [];
    const incorrectUpdates = [];

    updates.forEach((update, index) => {
        const sortedUpdate = sortedUpdates[index];
        const result = update.every((pageNumber, index) => pageNumber === sortedUpdate[index]);

        // console.log(`Correctly ordered: ${result}\nog:  ${update}\nupd: ${sortedUpdate}\n`);

        if (result) correctUpdates.push(sortedUpdate);
        else incorrectUpdates.push(sortedUpdate);
    });

    const sumCorrect = getSumOfMiddleNumbers(correctUpdates);
    const sumIncorrect = getSumOfMiddleNumbers(incorrectUpdates);

    console.log("Sum of middle numbers for correctly ordered updates:", sumCorrect);
    console.log("Sum of middle numbers for incorrectly ordered updates:", sumIncorrect);
};

const main = () => {
    logSumOfMiddleNumbers(updates, rules);
};

readLinesFromFile(
    inputFilePath,
    (line) => {
        onLine(line);
    },
    () => main()
);
