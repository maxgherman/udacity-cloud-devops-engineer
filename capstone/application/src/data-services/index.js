const formatMap = (data) =>
    data.data.reduce((acc, curr) => {
        const rootEntry = acc.has(curr.Date) ? acc.get(curr.Date) : new Map();

        acc.set(curr.Date, rootEntry);
        rootEntry.set(curr.POA_NAME16, curr);

        return acc;
    }, new Map());

const formatPopulation = (data) =>
    data.reduce((acc, curr) => {
        const key = curr.POA_NAME16.toString();
        const entry = acc.has(key) ? acc.get(key) : curr;
        acc.set(key, entry);

        return acc;
    }, new Map());

export const bagKeys = (date) => ({
    testsKey: `${date}-tests`,
    activeKey: `${date}-active`,
    totalKey: `${date}-total`,
    rangeTestsKey: `${date}-testRange`,
    recoveredKey: `${date}-recovered`,
    deadKey: `${date}-dead`
});

export const severities = [{
        start: 0,
        end: 9,
        key: 9
    },{
        start: 10,
        end: 19,
        key: 19
    },{
        start: 20,
        end: 29,
        key: 29
    },{
        start: 30,
        end: 39,
        key: 39
    },{
        start: 40,
        end: 49,
        key: 49
    },{
        start: 50,
        key: 500
}];

const getSeverityKey = (count) => {
    return severities.find(item => {
        if(item.start === undefined &&
            count <= item.end) {
                return true;
        }

        if(item.end === undefined &&
            count >= item.start) {
                return true;
        }

        if(item.start <= count && count <= item.end) {
            return true;
        }

        return false;
    }).key;
}

export const mergeData = ({
    postCodes,
    cases: casesInitial,
    population: populationInitial,
    tests: testsInitial }) => {

    if(!postCodes) {
        return { };
    }

    const cases = formatMap(casesInitial);
    const tests = formatMap(testsInitial);
    const population = formatPopulation(populationInitial);

    const dates = Array.from(cases.keys());
    const selectedDate = dates[dates.length - 1];

    postCodes.features.forEach(feature => {
        dates.forEach(date => {
            const entry = cases.get(date);

            const { testsKey, activeKey, totalKey,
                rangeTestsKey, recoveredKey, deadKey } = bagKeys(date);

            feature.properties[date] = 0;
            feature.properties[testsKey] = 0;
            feature.properties[activeKey] = 0;
            feature.properties[totalKey] = 0;
            feature.properties[rangeTestsKey] = 0;
            feature.properties[recoveredKey] = 0;
            feature.properties[deadKey] = 0;

            if(entry.has(feature.properties.POA_NAME16)) {
                const caseEntry = entry.get(feature.properties.POA_NAME16);
                const total = parseInt(caseEntry.Cases);
                const recovered = parseInt(caseEntry.Recovered);
                const dead = parseInt(caseEntry.Deaths);
                const active = total - (recovered + dead);
                const caseColor = getSeverityKey(total);

                feature.properties[date] = caseColor;
                feature.properties[totalKey] = total;
                feature.properties[activeKey] = active;
                feature.properties[recoveredKey] = recovered;
                feature.properties[deadKey] = dead;
            }
        });

        if(population.has(feature.properties.POA_NAME16)) {
            const populationEntry = population.get(feature.properties.POA_NAME16);
            feature.properties.population = populationEntry.Tot_p_p;
            feature.properties.suburbName = populationEntry.Combined;
        }
    });

    return { postCodes, cases, population, tests, selectedDate };
}
