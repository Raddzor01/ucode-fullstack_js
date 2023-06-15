function* resGenerator() {
    let index = 1;
    while(true) {
        let input = prompt(`Previous result: ${index}. Enter a new number:`, '');
        if(!Number.isInteger(Number(input)) || input === '') {
            console.error('Invalid number!');
        } else {
            index += Number.parseInt(input);
            if(index > 10000)
                index = 1;
        }
        yield index;
    }
}

let gen = resGenerator();

while(true) {
    gen.next();
}