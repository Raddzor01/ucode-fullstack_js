String.prototype.removeDuplicates = () =>  {
    var words = str.trim().split(/\s+/);
    var uniqueWords = [];

    for (var i = 0; i < words.length; i++) {
        if (uniqueWords.indexOf(words[i]) === -1) {
            uniqueWords.push(words[i]);
        }
    }

    var result = uniqueWords.join(' ');

    return result;
}


let str = "Giant Spiders?   What`s next? Giant Snakes?";
console.log(str);
// Giant Spiders?   What’s next? Giant Snakes?
str = str.removeDuplicates();
console.log(str);
// Giant Spiders? What’s next? Snakes?
str = str.removeDuplicates();
console.log(str);
// Giant Spiders? What’s next? Snakes?

str = ". . . . ? . . . . . . . . . . . ";
console.log(str);
// . . . . ? . . . . . . . . . . .
str = str.removeDuplicates();
console.log(str);
// . ?
