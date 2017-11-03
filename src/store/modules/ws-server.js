import * as muttypes from '../mutation-types.js';

const initState = {
    address: '127.0.0.1:5805',
    connectState: false,
};

const mutations = {
    [muttypes.SET_WS_SERVER](state, { server }) {
        state.address = server;
    },
    [muttypes.SET_CONNECT_STATE](state, { connected }) {
        state.connectState = connected;
    },
};

export default {
    state: initState,
    mutations,
};
