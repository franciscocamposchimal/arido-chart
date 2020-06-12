import axios from 'axios';

export default {
  state: {
    sensors: [],
  },
  getters: {
    sensorsList(state) {
      return state.sensors;
    },
  },
  mutations: {
    SET_SENSORS(state, payload) {
      state.sensors = payload;
    },
    UPDATE_SENSOR(state, payload) {
      state.sensors = state.sensors.map((sensor) => {
        if (sensor.id === payload.id) sensor = payload;
        return sensor;
      });
    },
    DELETE_SENSOR(state, payload) {
      state.sensors = state.sensors.filter((sensor) => {
        return sensor.id !== payload.id;
      });
    },
  },
  actions: {
    getSensors({ commit }) {
      axios
        .get('/sensor/graphic')
        .then(({ data, status }) => {
          // console.log('SENS: ', data);
          commit('SET_API_RESP', { status, message: 'Get sensors success.' });
          commit('SET_SENSORS', data);
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
    updateSens({ commit }, { id, name, tag }) {
      axios
        .put(`/sensor/${id}`, { name, tag })
        .then(({ data, status }) => {
          // console.log('PUT SENS: ', data);
          commit('SET_API_RESP', { status, message: 'Put sensor success.' });
          commit('UPDATE_SENSOR', data);
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
    deleteSens({ commit }, { id }) {
      axios
        .delete(`/sensor/${id}`)
        .then(({ data, status }) => {
          // console.log('DELETE OP: ', data);
          commit('SET_API_RESP', {
            status,
            message: 'Delete sensor success.',
          });
          commit('DELETE_SENSOR', data);
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
