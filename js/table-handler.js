let HEADERS = ["Anzahl", "Treiber", "Max. Spannung (V)", "Auslastung (%)"];

function createTable(table) {
    let head = table.createTHead();

    let headRow = head.insertRow();

    for (let header of HEADERS) {
        let headCell = document.createElement("TH");
        headCell.innerText = header;
        headRow.appendChild(headCell);
    }

    table.createTBody();
}

function updateTable(table, drivers, current, voltage) {
    let body = table.tBodies[0];

    body.innerHTML = "";

    if (voltage == "") {
        body.innerText = "Spannung eingeben";
        return;
    }

    let suitedDrivers = calculateSuitedDrivers(drivers, current, voltage);
    suitedDrivers.sort(compareDrivers);
    if (suitedDrivers.length > 10) {
        suitedDrivers.length = 10;
    }

    if (suitedDrivers.length == 0) {
        body.innerText = "Nichts gefunden";
        return;
    }

    for (let driver of suitedDrivers) {
        addRow(body, driver);
    }
}

function addRow(body, driver) {
    let row = body.insertRow();
    for (let attribute in driver) {
        let cell = row.insertCell();
        cell.innerText = driver[attribute];
    }
}