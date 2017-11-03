import wsServer from './modules/ws-server.js';
import ticker from './modules/ticker.js';
import * as actions from './actions.js';
import * as muttypes from './mutation-types.js';

Vue.use(Vuex); // eslint-disable-line no-undef

const debug = process.env.NODE_ENV === 'development';

const initState = {
    tickerListener: [],
};

const mutations = {
    [muttypes.ADD_TICKER_LISTENER](state, { listener }) {
        state.tickerListener.push(listener);
    },
};

// eslint-disable-next-line no-undef
export default new Vuex.Store({
    modules: {
        wsServer,
        ticker,
    },
    state: initState,
    getters: {},
    mutations,
    actions,
    plugins: [],
    strict: debug,
});