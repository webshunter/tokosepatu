function indoFormatter(nominal) {
    const units = ['', 'ribu', 'juta', 'milyar', 'triliun'];

    let chunkIndex = 0;
    while (nominal >= 1000 && chunkIndex < units.length - 1) {
        nominal /= 1000;
        chunkIndex++;
    }

    return `${nominal.toFixed(2)*1} ${units[chunkIndex]}`;
}

export default indoFormatter;