import axios from 'axios';

export default {
  state: {
    operators: [],
    instrumentalists: [],
  },
  getters: {
    operatorsList(state) {
      return state.operators;
    },
    instrumentalistsList(state) {
      return state.instrumentalists;
    },
  },
  mutations: {
    SET_OPERATORS(state, payload) {
      state.operators = payload;
    },
    UPDATE_OPERATOR(state, payload) {
      state.operators = state.operators.map((op) => {
        if (op.id === payload.id) op = payload;
        return op;
      });
    },
    DELETE_OPERATOR(state, payload) {
      state.operators = state.operators.filter((op) => {
        return op.id !== payload.id;
      });
    },
    SET_INSTRUMENTALISTS(state, payload) {
      state.instrumentalists = payload;
    },
    UPDATE_INSTRUMENTALIST(state, payload) {
      state.instrumentalists = state.instrumentalists.map((inst) => {
        if (inst.id === payload.id) inst = payload;
        return inst;
      });
    },
    DELETE_INST(state, payload) {
      state.instrumentalists = state.instrumentalists.filter((inst) => {
        return inst.id !== payload.id;
      });
    },
  },
  actions: {
    getOperators({ commit }) {
      axios
        .get('/staff/operators')
        .then(({ data, status }) => {
          // console.log('OPS: ', data);
          commit('SET_API_RESP', { status, message: 'Get operators success.' });
          commit('SET_OPERATORS', data);
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
    getInstrumentaslists({ commit }) {
      axios
        .get('/staff/instrumentalists')
        .then(({ data, status }) => {
          // console.log('INST: ', data);
          commit('SET_API_RESP', { status, message: 'Get operators success.' });
          commit('SET_INSTRUMENTALISTS', data);
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
    updateOperator({ commit }, { id, name }) {
      axios
        .put(`/staff/operators/${id}`, { name })
        .then(({ data, status }) => {
          // console.log('PUT OPS: ', data);
          commit('SET_API_RESP', { status, message: 'Put operators success.' });
          commit('UPDATE_OPERATOR', data);
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
    updateInstrumentalist({ commit }, { id, name }) {
      axios
        .put(`/staff/instrumentalists/${id}`, { name })
        .then(({ data, status }) => {
          // console.log('PUT INS: ', data);
          commit('SET_API_RESP', {
            status,
            message: 'Put instrumentalists success.',
          });
          commit('UPDATE_INSTRUMENTALIST', data);
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
    deleteOp({ commit }, { id }) {
      axios
        .delete(`/staff/operators/${id}`)
        .then(({ data, status }) => {
          // console.log('DELETE OP: ', data);
          commit('SET_API_RESP', {
            status,
            message: 'Delete operator success.',
          });
          commit('DELETE_OPERATOR', data);
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
    deleteInst({ commit }, { id }) {
      axios
        .delete(`/staff/instrumentalists/${id}`)
        .then(({ data, status }) => {
          // console.log('DELETE INST: ', data);
          commit('SET_API_RESP', {
            status,
            message: 'Delete instrumentalist success.',
          });
          commit('DELETE_INST', data);
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
