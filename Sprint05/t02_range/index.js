module.exports.checkDivision = (start = 1, end = 60) => {
    for (let index = start; index <= end; index++) {
        let string = `The number ${index}`;
        let divisors = [];

        if (index % 2 === 0)
            divisors.push(2);

        if (index % 3 === 0)
            divisors.push(3);

        if (index % 10 === 0)
            divisors.push(10);

        if (divisors.length > 0)
            string += ` is divisible by ${divisors.join(', is divisible by ')}`;
        else
            string += ` -`;

        console.log(string);
    }
}