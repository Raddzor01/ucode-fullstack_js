function concat(string1, string2 = null) {
    if (typeof string1 == 'string' && typeof string2 == 'string') {
        return string1 + ' ' + string2;
    } else if (string2 == null && typeof string1 == 'string') {
        let count = 0;
        return function inputstr() {
            str2 = prompt('Please enter a string', '');
            inputstr.count = ++count;
            return string1 + ' ' + str2;
        }

    }
}
