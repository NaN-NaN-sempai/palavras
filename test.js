const { log, clear } = require("console");
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


var analise = (array, method) => array.map(method);



var trueAlfabeto = JSON.parse(fs.readFileSync("./source/alfabeto.json"));
var alfabeto = trueAlfabeto.map(w => w.toLowerCase());

var truePalavras = JSON.parse(fs.readFileSync("./source/palavras.json"));
var palavras = truePalavras.map(w => w.toLowerCase());


var livro = fs.readFileSync("./livro test.txt", "utf-8").toLowerCase();



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

popularWordExe()


log((livro.match(new RegExp(`carneiro`, "g")) || []).length)