import Vue from 'vue';
import Vuetify from 'vuetify';
import NodeCGVue from 'nodecg-vue';
 
import 'vuetify/dist/vuetify.min.css';
 
Vue.use(Vuetify);
Vue.use(NodeCGVue);
 
import Nameplates from './components/nameplates.vue';
 
new Vue({
    render: h => h(Nameplates)
}).$mount('#app');