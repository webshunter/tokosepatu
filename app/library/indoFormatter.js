function indoFormatter(nominal) {
    const units = ['', 'Ribu', 'Juta', 'Miliar', 'Triliun'];

    let chunkIndex = 0;
    while (nominal >= 1000 && chunkIndex < units.length - 1) {
        nominal /= 1000;
        chunkIndex++;
    }

    return `${nominal.toFixed(1)*1} ${units[chunkIndex]}`;
}

export default indoFormatter;