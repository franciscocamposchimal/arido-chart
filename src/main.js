import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import DatetimePicker from 'vuetify-datetime-picker';
import Vue from 'vue';
import moment from 'moment';
import VueMoment from 'vue-moment';
import axios from 'axios';
import JsonExcel from 'vue-json-excel';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import store from './store';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

require('moment/locale/es');

moment.locale('es');

console.log('IP SERVER', window.location.hostname);
// const serverUrl = `http://${window.location.hostname}:3000`;
const serverUrl = `https://argosback.arido.dev`;
axios.defaults.baseURL = serverUrl;
const socket = io(serverUrl);

Vue.config.productionTip = false;
Vue.use(VueMoment, { moment });
Vue.use(VueSocketIOExt, socket);
Vue.use(VueLodash, { lodash });
Vue.use(DatetimePicker);
Vue.component('downloadExcel', JsonExcel);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
