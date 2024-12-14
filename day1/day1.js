import {readLinesFromFile} from "../utils/file-reader.mjs";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = resolve(__dirname, "input.txt");

const leftArray = [];
const rightArray = [];

const onLine = (line, leftArray, rightArray) => {
    const [leftValue, rightValue] = line.split("   ");

    leftArray.push(leftValue);
    rightArray.push(rightValue);
};

const logTotalDistance = (leftArray, rightArray) => {
    // calculates the distance between the values, then sums them
    const distance = leftArray
        .map((leftValue, index) => Math.abs(leftValue - rightArray[index]))
        .reduce((totalDistance, distance) => (totalDistance += distance), 0);

    console.log("Total distance between all of the values:", distance);
};

const logSimilarityScore = (leftArray, rightArray) => {
    // getting the occurrence of a value in an array https://stackoverflow.com/a/37366345
    const getOccurrence = (array, value) => array.filter((v) => v === value).length;

    const similarityScore = leftArray.reduce((score, value) => (score += value * getOccurrence(rightArray, value)), 0);

    console.log("Similarity score:", similarityScore);
};

const main = (leftArray, rightArray) => {
    // sort the arrays in ascending order
    leftArray.sort();
    rightArray.sort();

    logTotalDistance(leftArray, rightArray);
    logSimilarityScore(leftArray, rightArray);
};

readLinesFromFile(
    inputFilePath,
    (line) => onLine(line, leftArray, rightArray),
    () => main(leftArray, rightArray)
);
