<template>
  <v-app id="inspire">
    <Navigation
      :currentTest="testInProgress"
      @openDialog="openDialog"
    ></Navigation>
    <v-main>
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
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { methodsGraphMix } from '@/mixins/methodsGraph';
// import Navigation from '@/components/commons/NavBar.vue';
// import TestDialog from './components/commons/TestDialog.vue';

export default {
  name: 'App',
  mixins: [methodsGraphMix],
  components: {
    Navigation: () => import('@/components/commons/NavBar.vue'),
    TestDialog: () => import('./components/commons/TestDialog.vue'),
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
    setDataSensors({ type, sockUnitsData, localSensors }) {
      // console.log('sockUnitsData ', sockUnitsData);
      localSensors = localSensors.map((s) => {
        const {
          status: { title },
          units,
        } = s;
        if (type === 'T') {
          const fUnitTData = sockUnitsData.fSensorList.find(
            (sensorSock) => sensorSock.name === title,
          );
          const cUnitTData = sockUnitsData.cSensorList.find(
            (sensorSock) => sensorSock.name === title,
          );

          units.fSensorList.data.push(fUnitTData.val);
          units.cSensorList.data.push(cUnitTData.val);

          if (units.fSensorList.data.length > 30) {
            units.fSensorList.data.shift();
            units.cSensorList.data.shift();
          }
        } else {
          const unitPDataPa = sockUnitsData.paSensorList.find(
            (sensorSock) => sensorSock.name === title,
          );
          const unitPDataMPa = sockUnitsData.mpaSensorList.find(
            (sensorSock) => sensorSock.name === title,
          );
          const unitPDataPSI = sockUnitsData.psiSensorList.find(
            (sensorSock) => sensorSock.name === title,
          );

          units.paSensorList.data.push(unitPDataPa.val);
          units.mpaSensorList.data.push(unitPDataMPa.val);
          units.psiSensorList.data.push(unitPDataPSI.val);

          if (units.paSensorList.data.length > 200) {
            units.paSensorList.data.shift();
            units.mpaSensorList.data.shift();
            units.psiSensorList.data.shift();
          }
        }
        s.units = units;
        // s.data.datasets[0].data = datos;
        return s;
      });
      return localSensors;
    },
    setDataConvertSensors({ date, dataSocket }) {
      return dataSocket.map((sensor) => {
        return {
          name: sensor.name,
          val: {
            x: this.$moment(date, 'DD/MM/YYYY h:mm:ss a'),
            y: sensor.val,
          },
        };
      });
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
      this.$store.commit('SET_SENSOR_API', [
        this.createArrayToGraphP(sensorsP),
        this.createArrayToGraphT(sensorsT),
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
    SENSORS_DATA({
      date,
      sensorsP,
      sensorsT,
      sensorsPa,
      sensorsMPa,
      sensorsF,
    }) {
      if (!this.lodash.isEmpty(this.sensorsList)) {
        const [pSensors, tSensors] = this.sensorsAPIList;

        // Units converted
        const psiSensorList = this.setDataConvertSensors({
          date,
          dataSocket: sensorsP,
        });
        const cSensorList = this.setDataConvertSensors({
          date,
          dataSocket: sensorsT,
        });
        const paSensorList = this.setDataConvertSensors({
          date,
          dataSocket: sensorsPa,
        });
        const mpaSensorList = this.setDataConvertSensors({
          date,
          dataSocket: sensorsMPa,
        });
        const fSensorList = this.setDataConvertSensors({
          date,
          dataSocket: sensorsF,
        });
        // create arrays
        const pSensorResult = this.setDataSensors({
          type: 'P',
          sockUnitsData: { psiSensorList, paSensorList, mpaSensorList },
          localSensors: pSensors,
        });
        const tSensorResult = this.setDataSensors({
          type: 'T',
          sockUnitsData: { cSensorList, fSensorList },
          localSensors: tSensors,
        });
        // console.log('SENSORS_DATA', JSON.stringify(pSensorResult) );
        this.$store.commit('SET_SENSOR_API', [pSensorResult, tSensorResult]);
      }
    },
  },
};
</script>
