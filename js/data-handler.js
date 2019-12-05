function jsonFileToObjectArray(path) {
    return fetch(path)
        .then(file => file.json());
}

function extractCurrents(drivers) {
    let result = [];
    for (let driver of drivers) {
        for (let performance of driver.performances) {
            let current = performance.current.toFixed(3);
            if (!result.includes(current)) {
                result.push(current);
            }
        }
    }
    return result;
}