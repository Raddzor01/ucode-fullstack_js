let oldDate = new Date(1939, 0, 1);

module.exports.calculateTime = () => {

    let currentDate = new Date();

    return {
        years: () => {
            return currentDate.getFullYear() - oldDate.getFullYear();
        },
        months: () => {
            return currentDate.getMonth() - oldDate.getMonth()
        },
        days: () => {
            return currentDate.getDate() - oldDate.getDate()
        }
    };
}