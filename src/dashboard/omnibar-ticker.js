import Vue from 'vue';
import Vuetify from 'vuetify';
import NodeCGVue from 'nodecg-vue';
 
import 'vuetify/dist/vuetify.min.css';
 
Vue.use(Vuetify);
Vue.use(NodeCGVue);
 
import OmnibarTicker from './components/omnibar-ticker.vue';
 
new Vue({
    render: h => h(OmnibarTicker)
}).$mount('#app');