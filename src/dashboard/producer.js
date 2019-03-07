import Vue from 'vue';
import Vuetify from 'vuetify';
import NodeCGVue from 'nodecg-vue';
import Producer from './components/producer.vue'

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
Vue.use(NodeCGVue);

new Vue({
    render: h => h(Producer)
}).$mount('#app');
