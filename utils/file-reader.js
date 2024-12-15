import {createReadStream} from "fs";
import {createInterface} from "readline";

export function readLinesFromFile(filePath, lineCallback, fileClosedCallback) {
    const rl = createInterface({
        input: createReadStream(filePath),
        crlfDelay: Infinity,
    });

    rl.on("line", lineCallback);

    rl.on("close", fileClosedCallback);
}
