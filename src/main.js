import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import PulseLoader from 'vue-spinner/dist/vue-spinner.min.js'

Vue.use(VueResource);
new Vue({ // eslint-disable-line no-new
  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  },
  el: '#app',
  render: (h) => h(App),
});

