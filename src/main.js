import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import DatetimePicker from 'vuetify-datetime-picker';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import store from './store';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

console.log('IP SERVER', window.location.hostname);

const socket = io(`http://${window.location.hostname}:3000`);

Vue.config.productionTip = false;

Vue.use(VueSocketIOExt, socket);
Vue.use(VueLodash, { lodash });
Vue.use(DatetimePicker);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
