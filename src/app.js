import Vue from 'vue'; // eslint-disable-line import/extensions
import App from './App.vue';

Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    render: h => h(App),
});
