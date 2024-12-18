import {readLinesFromFile} from "../utils/file-reader.js";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = resolve(__dirname, "input.txt");

const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
]; // up, right, down, left

const grid = [];
let startLoc;

const onLine = (line) => {
    grid.push(
        [...line].map((char, colIndex) => {
            if (char === "#") return 1;
            else if (char === "^") startLoc = [colIndex, grid.length];

            return 0;
        })
    );
};

// TODO: Improve speed!
const simulateGuard = (pseudoObstacle) => {
    let directionIndex = 0; // Start facing up
    let [xIndex, yIndex] = startLoc;

    const visited = new Set();
    const obstacles = new Set();

    while (true) {
        visited.add(`${xIndex},${yIndex}`);

        const [dx, dy] = directions[directionIndex];
        const nextXIndex = xIndex + dx;
        const nextYIndex = yIndex + dy;

        // Check out-of-bounds
        if (nextXIndex < 0 || nextXIndex >= grid[0].length || nextYIndex < 0 || nextYIndex >= grid.length) {
            break; // Stop if out of bounds
        }

        // Check for existing obstacles
        if (grid[nextYIndex][nextXIndex] || pseudoObstacle == `${nextXIndex},${nextYIndex}`) {
            if (pseudoObstacle) {
                const location = `${nextXIndex},${nextYIndex},${directionIndex}`;
                if (obstacles.has(location)) return true;
                obstacles.add(location);
            }

            // Turn 90 degrees to the right
            directionIndex = (directionIndex + 1) % 4;
            continue;
        }

        // Move forward
        xIndex = nextXIndex;
        yIndex = nextYIndex;
    }

    return pseudoObstacle ? false : visited;
};

const logCycleAmount = (visited) => {
    const cycles = Array.from(visited).filter((pos) => {
        if (pos[0] === startLoc[0] && pos[1] === startLoc[1]) return false;
        return simulateGuard(pos);
    });
    console.log("Loops counted:", cycles.length);
};

const main = () => {
    const visited = simulateGuard(false);
    console.log("Distinct positions visited:", visited.size);

    logCycleAmount(visited);
};

readLinesFromFile(
    inputFilePath,
    (line) => onLine(line),
    () => main()
);
