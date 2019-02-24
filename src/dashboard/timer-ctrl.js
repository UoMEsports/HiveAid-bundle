import Vue from 'vue';
import Vuetify from 'vuetify';
import NodeCGVue from 'nodecg-vue';
 
import 'vuetify/dist/vuetify.min.css';
 
Vue.use(Vuetify);
Vue.use(NodeCGVue);
 
import TimerCtrl from './components/timer-ctrl.vue';
 
new Vue({
    render: h => h(TimerCtrl)
}).$mount('#app');