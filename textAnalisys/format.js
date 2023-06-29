const { log, clear, time, timeEnd } = require("console");
var fs = require("fs");



Array.prototype.withLength = function(length, callback = ()=>{}) {
    return this.filter((e,i,a) => {
        callback(e,i,a);
        
        return e.length == length;
    })
}

Array.prototype.startsWith = function(string, callback = ()=>{}) {
    return this.filter((e,i,a) => {
        callback(e,i,a);
        
        return e.startsWith(string);
    })
}

Array.prototype.includesString = function(string, callback = ()=>{}) {
    return this.filter((e,i,a) => {
        callback(e,i,a);
        
        return e.includes(string);
    })
}

Array.prototype.hasThisCharAt = function(char, pos, callback = ()=>{}) {
    return this.filter((e,i,a) => {
        callback(e,i,a);
        
        return e[pos] == char;
    })
}

Array.prototype.hasThisCharAt = function(char, pos) {
    this.hasThisCharAt.callback(e,i,a);
    return this.filter((e,i,a) => {
        this.hasThisCharAt.callback(e,i,a);
        
        return e[pos] == char;
    })
}


var rawAlphabet = JSON.parse(fs.readFileSync("./source/alfabeto.json"));
var alphabet = rawAlphabet.map(w => w.toLowerCase());

var rawWords = JSON.parse(fs.readFileSync("./source/palavras.json"));
var words = rawWords.map(w => w.toLowerCase());



var text = fs.readFileSync("./textAnalisys/textOrigin.txt", "utf-8").toLowerCase();


var ponc = [".", ",", "!", "?", "-", "–", " "];
var allowed = ponc.concat(alphabet);



const format = (str) => str
.replace(/(\r\n|\n|\r)/gm, " ")
.replace(/\s\s+/g, " ")
.split("")
.filter(c => allowed.includes(c))
.join("");


var formated = format(text);
var wordsArrayRaw = formated.split(" ").map(str => str.split("") .filter(c => alphabet.includes(c)) .join(""));
var wordsArray = [...new Set(wordsArrayRaw)];

time();

var wordsObj = wordsArray.map((w, i) => {
    var actual = [w, wordsArrayRaw.filter(e => e == w).length, words.includes(w)];

    clear();
    log(i, " of ", wordsArray.length);
    log(actual[0], " has ", actual[1], " and is ", actual[2]);

    return actual;
})
.sort((a, b) => b[1] - a[1])
.sort((a, b) => Number(a[2]) - Number(b[2]))
.map(([k, t, e]) => ({ [k]: t, "inDicionary": e }));

timeEnd();
fs.writeFileSync("./textAnalisys/test.json", JSON.stringify(wordsObj, null, "\t"));





/* 
fs.writeFileSync("./textAnalisys/test.txt", format(livro)); */

const popularWordExe = () => {
    var popularWord = Object.assign(...palavras.map((p,i) => {

        if(!livro.includes(p)) return [,];
        
        var count = (livro.match(new RegExp(p, "g")) || []).length

        var atual = [p, count];

        clear();
        log(i, " of ", palavras.length);
        log(atual.join(" has "));

        return atual;
    }).filter(e => e[1])
    .sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ [k]: v })));

    fs.writeFileSync("./palavras no livro.json", JSON.stringify(popularWord, null, "\t"));
}
/* 
popularWordExe()
 */