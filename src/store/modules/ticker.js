import * as muttypes from '../mutation-types.js';

const initState = {
    records: [],
};

const getters = {
    lastest: state => state.records[state.records.length - 1],
    mergedRecords: state => state.records.reduce((acc, value) => {
        // eslint-disable-next-line
        const masterRecord = acc.find(elem => elem.code === value.code && elem.direction !== 'NEUTRAL' && elem.direction === value.direction && value.time.isBetween(elem.time, moment(elem.time).add(60, "s")));
        if (masterRecord) {
            masterRecord.volume += value.volume;
        } else {
            acc.push({ ...value });
        }
        return acc;
    }, []),
};

const mutations = {
    [muttypes.ADD_TICKER_DATA](state, { record }) {
        state.records.push(record);
    },
};

export default {
    state: initState,
    getters,
    mutations,
};
