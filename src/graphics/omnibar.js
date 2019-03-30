import Vue from 'vue';
import Omnibar from './components/omnibar.vue'
import DonationPopup from './components/donation-popup.vue'

import FitText from './components/vue-fit-text/index.js';
Vue.use(FitText);

new Vue({
    render: h => h(Omnibar)
}).$mount('#omnibar');

new Vue({
    render: h => h(DonationPopup)
}).$mount('#donation-popup');
