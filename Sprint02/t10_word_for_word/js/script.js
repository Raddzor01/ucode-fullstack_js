function removeDuplicateWords(str) {
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

function addWords(obj, wrds) {
    obj.words = removeDuplicateWords(obj.words);
    wrds = removeDuplicateWords(wrds);
    obj.words += ' ' + wrds;
    obj.words = removeDuplicateWords(obj.words);
}

function removeWords(obj, wrds) {
    obj.words = removeDuplicateWords(obj.words);
    wrds = removeDuplicateWords(wrds);
    var words = wrds.split(' ');

    for (var word of words) {
        if (obj.words.includes(word)) {
            obj.words = obj.words.replace(word, '');
        }
    }
    obj.words = obj.words.trim();

}

function changeWords(obj, oldWrds, newWrds) {
    obj.words = removeDuplicateWords(obj.words);
    oldWrds = removeDuplicateWords(oldWrds);
    newWrds = removeDuplicateWords(newWrds);

    var words = oldWrds.split(' ');
    for (var word of words) {
        obj.words = obj.words.replace(word, newWrds);
    }
    obj.words = removeDuplicateWords(obj.words);
}

