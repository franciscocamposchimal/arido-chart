// import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import staffModule from './modules/staff.module';
import sensorsModule from './modules/sensors.module';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiResponse: {
      status: 0,
      message: '',
    },
  },
  getters: {
    getApiResponse(state) {
      return state.apiResponse;
    },
  },
  mutations: {
    SET_API_RESP(state, { status, message }) {
      state.apiResponse = {
        status,
        message,
      };
    },
  },
  actions: {},
  modules: {
    staffModule,
    sensorsModule,
  },
});
