import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

const socket = io('http://localhost:3000');

Vue.config.productionTip = false;

Vue.use(VueSocketIOExt, socket);
Vue.use(VueLodash, { lodash });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
