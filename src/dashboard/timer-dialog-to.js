import Vue from 'vue';
import Vuetify from 'vuetify';
import NodeCGVue from 'nodecg-vue';
 
import 'vuetify/dist/vuetify.min.css';
 
Vue.use(Vuetify);
Vue.use(NodeCGVue);
 
import TimerDialogTo from './components/timer-dialog-to.vue';
 
new Vue({
    render: h => h(TimerDialogTo)
}).$mount('#app');