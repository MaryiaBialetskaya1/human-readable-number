module.exports = function toReadable (number) {
    
    let stringOfNumbers = number.toString(),
        units, tens, start, chunks, chunksLength, chunk, intNumbers;

    /* проверяем или число равно 0 */
    if (parseInt(stringOfNumbers) === 0) {
        return 'zero';
    }

    /* определяем массив единиц чисел в виде слов */
    units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    /* определяем массив десятков в виде слов */
    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    /* Разделяем аргумент на 3-значные фрагменты справа налево*/
    start = stringOfNumbers.length;
    chunks = [];
    while (start > 0) {
        let end = start;
        chunks.push(stringOfNumbers.slice((start = Math.max(0, start - 3)), end));
    }

    chunksLength = chunks.length;
    
    /* Помещаем в строку каждое целое число в каждом фрагменте*/
    let words = [];
    for (let i = 0; i < chunksLength; i++) {

        let word;
        chunk = parseInt(chunks[i]);
        if (chunk) {

            /* Разделяем кусочек на массив отдельных целых чисел */
            intNumbers = chunks[i].split('').reverse().map(parseFloat);

            /* Если целое число десятков равно 1, т.е. 10, то добавьте 10 к целому числу единиц */
            if (intNumbers[1] === 1) {
                intNumbers[0] += 10;
            }

            /* Добавляем единицы если элемент массива существует */
            if ((word = units[intNumbers[0]])) {
                words.push(word);
            }

            /* Добавляем десятки если элемент массива существует*/
            if ((word = tens[intNumbers[1]])) {
                words.push(word);
            }

            /* Добавляем сотни если элемент массива существует */
            if ((word = units[intNumbers[2]])) {
                words.push(word + ' hundred');
            }
        }
    }
    return words.reverse().join(' ');
}