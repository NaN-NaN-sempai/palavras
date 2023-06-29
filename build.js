const { log, time, timeEnd } = require("console");
const fs = require("fs");
const xmlArreyfy = (arr) =>
`<?xml version="1.0" encoding="UTF-8" ?>
<root>
\t${arr.map(e => `<element> ${e} </element>`).join("\n\t")}
</root>`;


var arr = fs.readFileSync("./source/palavras.txt", "utf-8").toLowerCase().split("\n");
log("Original Word Amount: ", arr.length);

var noDupes =  [...new Set(arr.concat(arr))];
log("Updated Word Amount: ", noDupes.length);

log("\nRewiriting source file");
time("Finished source file");
fs.writeFileSync("./source/palavras.txt", noDupes.join("\n"));
timeEnd("Finished source file");

log("\nWriting JSON file");
time("Finished JSON file");
fs.writeFileSync("./source/palavras.json", JSON.stringify(noDupes, null, "\t"));
timeEnd("Finished JSON file");

log("\nWriting XML file");
time("Finished XML file");
fs.writeFileSync("./source/palavras.xml",  xmlArreyfy(noDupes));
timeEnd("Finished XML file");

log("\nBuild Done");