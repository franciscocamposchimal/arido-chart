import axios from 'axios';

export default {
  state: {
    tests: [],
    testInProgress: {},
    stopSensorModel: false,
    test_json_data: [],
  },
  getters: {
    testList(state) {
      return state.tests;
    },
    testInProgress(state) {
      return state.testInProgress;
    },
    stopSensorModel(state) {
      return state.stopSensorModel;
    },
    testEcxelData(state) {
      return state.test_json_data;
    },
  },
  mutations: {
    SET_TESTS(state, payload) {
      state.tests = payload;
    },
    SET_TEST_IN_PROGRESS(state, payload) {
      state.testInProgress = payload;
    },
    SET_STOP_TEST(state, payload) {
      state.stopSensorModel = payload;
    },
    SET_EXCEL_DATA(state, payload) {
      state.test_json_data = payload;
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
    async getTestInProgress({ commit }) {
      await axios
        .get('/test/in-progress')
        .then(({ data, status }) => {
          // console.log('SET_TEST_IN_PROGRESS', data);
          commit('SET_API_RESP', { status, message: 'Get test success.' });
          commit('SET_TEST_IN_PROGRESS', data);
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
    async getExcelData({ commit }, { id }) {
      await axios
        .get(`test/excel-data/${id}`)
        .then(({ data, status }) => {
          commit('SET_API_RESP', {
            status,
            message: 'Get excel data success.',
          });
          commit('SET_EXCEL_DATA', data);
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
    async createTest({ commit, dispatch }, newTest) {
      // then -> dispatch to : test and staff
      await axios
        .post('test', newTest)
        .then(({ status }) => {
          commit('SET_API_RESP', { status, message: 'Get test success.' });
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
        )
        .finally(() => {
          dispatch('getTests');
          dispatch('getOperators');
          dispatch('getTestInProgress');
          dispatch('getInstrumentaslists');
        });
    },
    async stopTest({ commit, dispatch }) {
      commit('SET_STOP_TEST', true);
      await axios
        .post('/test/end-test')
        .then(({ data, status }) => {
          // console.log(`SET_API_RESP`, data);
          commit('SET_API_RESP', { status, message: 'Get test success.' });
          commit('SET_TEST_IN_PROGRESS', data);
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
        )
        .finally(() => {
          commit('SET_STOP_TEST', false);
          dispatch('getTestInProgress');
          dispatch('getTests');
        });
    },
    deleteTest({ commit, dispatch }, { id }) {
      console.log('DELETE FIRE ', id);
      axios
        .delete(`/test/${id}`)
        .then(({ status }) => {
          // console.log(`SET_API_RESP`, data);
          commit('SET_API_RESP', { status, message: 'Delete test success.' });
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
        )
        .finally(() => {
          dispatch('getOperators');
          dispatch('getInstrumentaslists');
          dispatch('getTests');
        });
    },
  },
};
