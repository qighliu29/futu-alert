import store from './store';
import App from './App.vue';

// eslint-disable-next-line no-new,no-undef
new Vue({
    el: '#app',
    store,
    render: h => h(App),
});
