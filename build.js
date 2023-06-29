const { log } = require("console");
var fs = require("fs");


var arr = fs.readFileSync("./source/palavras.txt", "utf-8").toLowerCase().split("\n");
log(arr.length);

var noDupes =  [...new Set(arr.concat(arr))];
log(noDupes.length);

fs.writeFileSync("./source/palavras.txt", noDupes.join("\n"));
fs.writeFileSync("./source/palavras.json", JSON.stringify(noDupes, null, "\t"));