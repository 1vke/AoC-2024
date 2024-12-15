import {readLinesFromFile} from "../utils/file-reader.js";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = resolve(__dirname, "input.txt");

const wordSearch = [];
const word = "XMAS";
const xWord = "MAS";

const directions = [
    [1, 0], // right
    [1, 1], // bottom-right
    [0, 1], // down
    [-1, 1], // bottom-left
    [-1, 0], // left
    [-1, -1], // top-left
    [0, -1], // up
    [1, -1], // top-right
];

const XDeltas = [
    [-1, -1], // top-left
    [1, -1], // top-right
    [1, 1], // bottom-right
    [-1, 1], // bottom-left
];

const onLine = (line, wordSearch) => wordSearch.push(line.trim());

const scanForWord = (wordSearch, word, rowIndex, colIndex, [deltaX, deltaY]) => {
    if (
        ![...Array(wordSearch[rowIndex].length).keys()].includes(colIndex + deltaX * (word.length - 1)) ||
        ![...Array(wordSearch.length).keys()].includes(rowIndex + deltaY * (word.length - 1))
    )
        return false; // if index goes OOB, return there being no word as it isn't possible.

    return Array.from(word).every(
        (char, index) => char == wordSearch[rowIndex + deltaY * index][colIndex + deltaX * index]
    );
};

const findWords = (wordSearch, word, rowIndex, colIndex) => {
    const wordCoords = [];

    directions.forEach((direction) => {
        const result = scanForWord(wordSearch, word, rowIndex, colIndex, direction);

        if (result) {
            // console.log(`Found "${word}" at ${[rowIndex, colIndex]}] with direction ${direction}`);
            wordCoords.push([rowIndex, colIndex]);
        }
    });

    return wordCoords;
};

const logWordCount = (wordSearch, word) => {
    let wordCount = 0;

    wordSearch.forEach((row, rowIndex) => {
        [...Array(row.length).keys()].forEach((colIndex) => {
            wordCount += findWords(wordSearch, word, rowIndex, colIndex).length;
        });
    });

    console.log(`Found the word "${word}" ${wordCount} times!`);
};

const logXCount = (wordSearch, xWord) => {
    const pivot = xWord[1];
    const literalXCoords = [];

    for (const rowIndex of [...wordSearch.keys()].slice(1, -1)) {
        const row = wordSearch[rowIndex];

        for (const colIndex of [...Array(row.length).keys()].slice(1, -1)) {
            if (row[colIndex] !== pivot) continue;
            let foundMatch = false;

            for (const [deltaX, deltaY] of XDeltas) {
                if (scanForWord(wordSearch, xWord, rowIndex + deltaY, colIndex + deltaX, [deltaX * -1, deltaY * -1])) {
                    if (foundMatch) {
                        // console.log("literal xmas found at:", [rowIndex, colIndex]);
                        literalXCoords.push([rowIndex, colIndex]);
                        break;
                    } else foundMatch = true;
                }
            }
        }
    }

    console.log(`Found literal "${word}" ${literalXCoords.length} times!!`);
};

const main = (wordSearch, word, xWord) => {
    logWordCount(wordSearch, word);
    logXCount(wordSearch, xWord);
};

readLinesFromFile(
    inputFilePath,
    (line) => onLine(line, wordSearch),
    () => main(wordSearch, word, xWord)
);
