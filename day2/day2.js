import {readLinesFromFile} from "../utils/file-reader.mjs";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = resolve(__dirname, "input.txt");

const reports = [];

const onLine = (line, reports) => reports.push(line.split(" ").reduce((acu, value) => (acu.push(+value), acu), []));

const isSafeReport = (report) => {
    let increasing = true,
        decreasing = true;

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false; // Violates difference constraint
        if (diff < 0) increasing = false; // Violates increasing
        if (diff > 0) decreasing = false; // Violates decreasing
    }

    return increasing || decreasing;
};

const getStabilityOfReport = (report, problemDampenerOn) => {
    if (isSafeReport(report)) {
        return true;
    } else if (!problemDampenerOn) return false;

    // remove each level until the report passes
    for (let i = 0; i < report.length; i++) {
        const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
        if (isSafeReport(modifiedReport)) return true;
    }

    return false;
};

const logNumberOfSafeReports = (reports, problemDampenerOn) => {
    const numOfSafeReports = reports.filter((report) => getStabilityOfReport(report, problemDampenerOn)).length;
    console.log(`Number of safe reports${problemDampenerOn ? " w/ problem dampener" : ""}:`, numOfSafeReports);
};

const main = (reports) => {
    logNumberOfSafeReports(reports, false);
    logNumberOfSafeReports(reports, true);
};

readLinesFromFile(
    inputFilePath,
    (line) => onLine(line, reports),
    () => main(reports)
);
