import {readLinesFromFile} from "../utils/file-reader.js";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = resolve(__dirname, "input.txt");

let xBound;
const antennaCoords = [];

const onLine = (line, yIndex) => {
    if (xBound === undefined) xBound = line.trim().length;
    Array.from(line.trim()).forEach((str, xIndex) => {
        if (str !== ".") antennaCoords.push({freq: str.charCodeAt(0), x: xIndex, y: yIndex});
    });
};

const main = () => {
    const antinodes = [];

    const addAntinode = ([x, y]) => {
        // if not inbounds, return
        if (x >= xBound || x < 0 || y >= lineIndex || y < 0) {
            // console.log([x, y], "OOB");
            return;
        }
        // if not unique, return
        if (antinodes.some((antinode) => antinode.x === x && antinode.y === y)) {
            // console.log([x, y], "not unique");
            return;
        }
        antinodes.push({x: x, y: y});
        // console.log([x, y], "pushed");
    };

    antennaCoords.slice(0, -1).forEach((firstAntenna, index) => {
        antennaCoords.slice(index + 1).forEach((secondAntenna) => {
            if (firstAntenna.freq === secondAntenna.freq) {
                const dx = secondAntenna.x - firstAntenna.x;
                const dy = secondAntenna.y - firstAntenna.y;

                const possibleAntinodes = [
                    [firstAntenna.x - dx, firstAntenna.y - dy],
                    [secondAntenna.x + dx, secondAntenna.y + dy],
                ];

                // console.log(
                //     `\nAntinodes of ${firstAntenna.x},${firstAntenna.y} && ${secondAntenna.x},${secondAntenna.y}:`,
                //     possibleAntinodes
                // );

                for (const antinode of possibleAntinodes) addAntinode(antinode);
            }
        });
    });

    console.log("Unique antinode count:", antinodes.length);
};

let lineIndex = 0;
readLinesFromFile(
    inputFilePath,
    (line) => {
        onLine(line, lineIndex);
        lineIndex += 1;
    },
    () => main()
);
