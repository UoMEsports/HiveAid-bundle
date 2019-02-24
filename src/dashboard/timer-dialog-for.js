import Vue from 'vue';
import Vuetify from 'vuetify';
import NodeCGVue from 'nodecg-vue';
import VueNumberInput from '@chenfengyuan/vue-number-input';

import 'vuetify/dist/vuetify.min.css';
 
Vue.use(Vuetify);
Vue.use(NodeCGVue);
Vue.use(VueNumberInput);
 
import TimerDialogFor from './components/timer-dialog-for.vue';

new Vue({
    render: h => h(TimerDialogFor)
}).$mount('#app');