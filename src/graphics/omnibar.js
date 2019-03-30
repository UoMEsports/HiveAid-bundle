import Vue from 'vue';
import Omnibar from './components/omnibar.vue'
import DonationPopup from './components/donation-popup.vue'

new Vue({
    render: h => h(Omnibar)
}).$mount('#omnibar');

new Vue({
    render: h => h(DonationPopup)
}).$mount('#donation-popup');
