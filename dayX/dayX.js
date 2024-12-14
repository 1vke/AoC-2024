import {readLinesFromFile} from "../utils/file-reader.mjs";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = resolve(__dirname, "input.txt");

const onLine = (line) => {};

const main = () => {};

readLinesFromFile(
    inputFilePath,
    (line) => onLine(line),
    () => main()
);
