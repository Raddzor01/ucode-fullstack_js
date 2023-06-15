function checkBrackets(str) {
    let count = 0;
    let brackets = 0;
    if (typeof str !== 'string') {
        return '-1';
    }

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            brackets++;
        } else if (str[i] === ')') {
            if (brackets === 0) {
                count++;
            } else {
                brackets--;
            }
        }
    }

    return count + brackets;
}