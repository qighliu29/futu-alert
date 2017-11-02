import * as muttypes from '../mutation-types.js';

const initState = {
    records: [],
};

const getters = {
    lastest: state => state.records[state.records.length - 1],
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
