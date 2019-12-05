function calculateSuitedDrivers(drivers, current, voltage) {
    let suitedDrivers = [];
    let i = -1;
    for (let amount = 1; amount < voltage / 25; amount++) {
        for (let driver of drivers) {
            for (let performance of driver.performances) {

                if (performance.current != current) {
                    continue;
                }

                let minVoltage = amount * performance.min_voltage;
                if (voltage < minVoltage) {
                    continue
                }

                let maxVoltage = amount * performance.max_voltage;
                let workload = voltage / maxVoltage * 100;
                if (workload > 100) {
                    continue;
                }

                let suitedDriver = {};
                suitedDriver.amount = amount;
                suitedDriver.name = driver.model + (current * 1000);
                suitedDriver.maxVoltage = maxVoltage;
                suitedDriver.workload = Math.round(workload);
                suitedDrivers.push(suitedDriver);

                if (i == -1) {
                    i = 5;
                }
            }
        }

        if (i != -1) {
            i--;
            if (i == 0) {
                break;
            }
        }
    }
    return suitedDrivers;
}

function compareDrivers(driverA, driverB) {
    let differenceA = driverA.workload;
    let efficiencyB = driverB.workload;

    if (differenceA > efficiencyB) {
        return -1;
    } else if (differenceA < efficiencyB) {
        return 1;
    } else {
        return 0;
    }
}