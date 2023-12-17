const normalTime = require('./normal-router').calculateTime();

module.exports.calculateTime = () => {
    const quantumYears = Math.floor(normalTime.years() / 7);
    const quantumMonths = Math.floor((normalTime.years() % 7 * 12 + normalTime.months()) / 7);
    const quantumDays = Math.floor((((normalTime.years() + normalTime.months()) % 7) * 30.44 + normalTime.days()) / 7);

    return [quantumYears, quantumMonths, quantumDays];
}