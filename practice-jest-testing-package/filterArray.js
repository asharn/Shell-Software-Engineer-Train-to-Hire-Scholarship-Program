function filterArray(numbers) {
    if (numbers  === null) {
        return null;
    }
    return numbers?.map(n => n > 100 ? 100 : n);
}

module.exports = filterArray;