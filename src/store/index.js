import VuexPersist from 'vuex-persist';
import wsServer, { serverLocalReducer } from './modules/ws-server.js';
import ticker from './modules/ticker.js';
import * as actions from './actions.js';
import * as muttypes from './mutation-types.js';

Vue.use(Vuex); // eslint-disable-line no-undef

const debug = process.env.NODE_ENV === 'development';

const vuexLocal = new VuexPersist({
    key: 'ticker-mon',
    storage: window.localStorage,
    reducer: state => ({
        autoMerging: state.autoMerging,
        timeRange: state.timeRange,
        // module: wsServer
        wsServer: serverLocalReducer(state.wsServer),
    }),
    filter: mutation => (muttypes.savedMutation.indexOf(mutation.type) >= 0),
    strictMode: debug,
});

const initState = {
    tickerListener: [],
    autoMerging: false,
    currentCode: '',
    selectedTicker: {
        code: '',
    },
    timeRange: 30,
};

const mutations = {
    [muttypes.ADD_TICKER_LISTENER](state, { listener }) {
        state.tickerListener.push(listener);
    },
    [muttypes.TOGGLE_AUTO_MERGING](state) {
        state.autoMerging = !state.autoMerging;
    },
    [muttypes.SET_CURRENT_CODE](state, { code }) {
        state.currentCode = code;
    },
    [muttypes.SET_SELECTED_TICKER](state, { selected }) {
        state.selectedTicker = selected;
    },
    [muttypes.SET_TIME_RANGE](state, { range }) {
        state.timeRange = range;
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
    mutations: debug ? {
        ...mutations,
        RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
    } : mutations,
    actions,
    plugins: [vuexLocal.plugin],
    strict: debug,
});
