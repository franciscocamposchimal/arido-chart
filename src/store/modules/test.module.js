import axios from 'axios';

export default {
  state: {
    tests: [],
  },
  getters: {
    testList(state) {
      return state.tests;
    },
  },
  mutations: {
    SET_TESTS(state, payload) {
      state.tests = payload;
    },
  },
  actions: {
    async getTests({ commit }) {
      await axios
        .get('/test')
        .then(({ data, status }) => {
          commit('SET_API_RESP', { status, message: 'Get sensors success.' });
          commit('SET_TESTS', data);
        })
        .catch(
          ({
            response: {
              data: { statusCode, error },
            },
          }) => {
            // console.log(`${statusCode} ${error}`);
            commit('SET_API_RESP', { status: statusCode, message: error });
          },
        );
    },
  },
};
