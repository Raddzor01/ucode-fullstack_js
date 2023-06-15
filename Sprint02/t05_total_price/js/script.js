function total(addCount, addPrice, currentTotal) {
    if (currentTotal === undefined || Number.isNaN(currentTotal)) {
        currentTotal = 0;
    }
    if (addCount === 0) {
        return currentTotal;
    }
    currentTotal += addCount * addPrice;
    return currentTotal;

}