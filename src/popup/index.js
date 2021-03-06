import Vue from 'vue'
import 'bulma-fluent/bulma.sass'

// vue-select
// import vSelect from "vue-select";
// Vue.component("v-select", vSelect);
// import 'vue-select/dist/vue-select.css';

// // vue-multi-select
// import Multiselect from 'vue-multiselect'
// Vue.component('multiselect', Multiselect)
// import 'vue-multiselect/dist/vue-multiselect.min.css'

import 'selectize/dist/css/selectize.default.css' // This is required, we use the same css as selectize.js
import VSelectize from '@isneezy/vue-selectize'
Vue.component('v-selectize', VSelectize)


// vue-currency-input
import VueCurrencyInput from 'vue-currency-input'
Vue.use(VueCurrencyInput)


import App from './App.vue'

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App),
})

// chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {
//   // Tab opened.
// });