import {readLinesFromFile} from "../utils/file-reader.js";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = resolve(__dirname, "input.txt");

let xBound;
let yBound = 0;
const antennaCoords = [];

const onLine = (line, yIndex) => {
    if (xBound === undefined) xBound = line.trim().length;
    Array.from(line.trim()).forEach((str, xIndex) => {
        if (str !== ".") antennaCoords.push({freq: str.charCodeAt(0), x: xIndex, y: yIndex});
    });
};

const logAntinodeCount = (addAntinodeCallback) => {
    const antinodes = [];

    antennaCoords.slice(0, -1).forEach((firstAntenna, index) => {
        antennaCoords.slice(index + 1).forEach((secondAntenna) => {
            if (firstAntenna.freq === secondAntenna.freq) {
                const dx = secondAntenna.x - firstAntenna.x;
                const dy = secondAntenna.y - firstAntenna.y;

                addAntinodeCallback(antinodes, [firstAntenna.x, firstAntenna.y], dx, dy, true);
                addAntinodeCallback(antinodes, [secondAntenna.x, secondAntenna.y], dx, dy, false);
            }
        });
    });

    console.log("Unique antinode count:", antinodes.length);
};

const main = () => {
    const partOneAddAntinode = (antinodes, [x, y], dx, dy, negative) => {
        x = negative ? x - dx : x + dx;
        y = negative ? y - dy : y + dy;

        if (x >= xBound || x < 0 || y >= yBound || y < 0) return; // if not inbounds, return
        if (antinodes.some((antinode) => antinode.x === x && antinode.y === y)) return; // if not unique, return

        antinodes.push({x: x, y: y});
    };

    const partTwoAddAntinode = (antinodes, [x, y], dx, dy, negative) => {
        // if not inbounds, return
        if (x >= xBound || x < 0 || y >= yBound || y < 0) return;

        // if not unique, don't add antinode
        if (!antinodes.some((antinode) => antinode.x === x && antinode.y === y)) antinodes.push({x: x, y: y});

        const newX = negative ? x - dx : x + dx;
        const newY = negative ? y - dy : y + dy;

        partTwoAddAntinode(antinodes, [newX, newY], dx, dy, negative);
    };

    logAntinodeCount(partOneAddAntinode);
    logAntinodeCount(partTwoAddAntinode);
};

readLinesFromFile(
    inputFilePath,
    (line) => {
        onLine(line, yBound);
        yBound += 1;
    },
    () => main()
);
