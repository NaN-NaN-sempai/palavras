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

var trueAlfabeto = JSON.parse(fs.readFileSync("./source/alfabeto.json"));
var alfabeto = trueAlfabeto.map(w => w.toLowerCase());

var truePalavras = JSON.parse(fs.readFileSync("./source/palavras.json"));
var palavras = truePalavras.map(w => w.toLowerCase());

var analise = (array, method) => array.map(method);

const letrasPopularesFunc = () => {
    var letrasPopulares = Object.assign(...analise(alfabeto, (l,i) => {
        var atual = [l, palavras.includesString(l).length];

        clear();
        log(i, " of ", alfabeto.length);
        log(atual.join(" has "));

        return atual;
    }).filter(e => e[1])
    .sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ [k]: v })));

    fs.writeFileSync("./output/letras que mais aparecem.json", JSON.stringify(letrasPopulares, null, "\t"));
}

const hasCharFunc = () => {
    var hasCharAt = palavras.hasThisCharAt("a",1, (palavra,i) => {
        clear();
        log(i, " of ", palavras.length);
        log(palavra[1] == "a");
        log(palavra);
    })
    
    fs.writeFileSync("./output/letra A segunda posição.json", JSON.stringify(hasCharAt, null, "\t"));
}
letrasPopularesFunc()