import * as muttypes from '../mutation-types.js';

const initState = {
    addr: '120.78.169.175:5805',
    connectState: false,
};

const mutations = {
    [muttypes.SET_WS_SERVER](state, server) {
        state.addr = server;
    },
    [muttypes.SET_CONNECT_STATE](state, { connected }) {
        state.connectState = connected;
    },
};

export default {
    state: initState,
    mutations,
};
