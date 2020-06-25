<template>
  <v-app id="inspire">
    <Navigation
      :currentTest="testInProgress"
      @openDialog="openDialog"
    ></Navigation>
    <v-content>
      <!-- <pre>{{ sensorsAPIList }}</pre> -->
      <router-view :sensorsList="sensorsAPIList"></router-view>
      <TestDialog
        :dialog="isOpenDialog"
        :opList="operatorsList"
        :instList="instrumentalistsList"
        :sensorsArr="sensorsData"
        @closeDialog="closeDialog"
        @createTest="createTest"
      ></TestDialog>
      <!-- <pre>{{ testList }}</pre> -->
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { methodsGraphMix } from '@/mixins/methodsGraph';
import Navigation from '@/components/commons/NavBar.vue';
import TestDialog from './components/commons/TestDialog.vue';

export default {
  name: 'App',
  mixins: [methodsGraphMix],
  components: {
    Navigation,
    TestDialog,
  },
  data: () => ({
    isOpenDialog: false,
    sensorsData: {},
  }),
  methods: {
    ...mapActions(['getOperators', 'getInstrumentaslists']),
    openDialog(dialog) {
      this.isOpenDialog = dialog;
    },
    closeDialog(dialog) {
      this.isOpenDialog = dialog;
    },
    async createTest(newTest) {
      this.isOpenDialog = false;
      await this.$store.dispatch('createTest', newTest);
    },
    setDataSensors({ date, dataSocket, localSensors }) {
      localSensors = localSensors.map((s) => {
        const {
          status: { title },
          data: {
            datasets: [{ data: datos }],
          },
        } = s;
        dataSocket.forEach(({ name, val }) => {
          if (name === title) {
            datos.push({
              x: this.$moment(date, 'DD/MM/YYYY h:mm:ss a'),
              y: val,
            });
            if (datos.length > 30) {
              datos.shift();
            }
          }
        });
        s.data.datasets[0].data = datos;
        return s;
      });
      return localSensors;
    },
  },
  computed: {
    ...mapGetters([
      'sensorsList',
      'operatorsList',
      'testInProgress',
      'sensorsAPIList',
      'instrumentalistsList',
    ]),
  },
  async created() {
    await this.$store.dispatch('getSensors');
    await this.$store.dispatch('getTestInProgress');
  },
  beforeMount() {
    this.getOperators();
    this.getInstrumentaslists();
  },
  watch: {
    sensorsList() {
      const { sensorsP, sensorsT } = this.sensorsList;
      this.sensorsData = this.sensorsList;
      // console.log(this.sensorsData);
      this.$store.commit('SET_SENSOR_API', [
        this.createArrayToGraph(sensorsP),
        this.createArrayToGraph(sensorsT),
      ]);
    },
  },
  sockets: {
    connect() {
      // console.log('socket connected');
    },
    disconnect() {
      // console.log('disconnected');
    },
    SENSORS_DATA({ date, sensorsP, sensorsT }) {
      // console.log('SENSORS_DATA', date);
      if (!this.lodash.isEmpty(this.sensorsList)) {
        const [pSensors, tSensors] = this.sensorsAPIList;
        const pSensorResult = this.setDataSensors({
          date,
          dataSocket: sensorsP,
          localSensors: pSensors,
        });
        const tSensorResult = this.setDataSensors({
          date,
          dataSocket: sensorsT,
          localSensors: tSensors,
        });
        // console.log('SENSORS_DATA', pSensorResult);
        this.$store.commit('SET_SENSOR_API', [pSensorResult, tSensorResult]);
      }
    },
  },
};
</script>
