<template>
  <v-app id="inspire">
    <Navigation @openDialog="openDialog"></Navigation>
    <v-content>
      <router-view :sensorsList="sensorsAPIList"></router-view>
      <TestDialog
        :dialog="isOpenDialog"
        :opList="operatorsList"
        :instList="instrumentalistsList"
        @closeDialog="closeDialog"
      ></TestDialog>
      <!-- <pre>{{ sensorsAPIList }}</pre> -->
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
    sensorsData: [],
  }),
  methods: {
    ...mapActions(['getOperators', 'getInstrumentaslists']),
    openDialog(dialog) {
      this.isOpenDialog = dialog;
    },
    closeDialog(dialog) {
      this.isOpenDialog = dialog;
    },
    setDataSensors({ dataSocket, localSensors }) {
      localSensors = localSensors.map((s) => {
        const {
          status: { title },
          data: {
            datasets: [{ data: datos }],
            labels,
          },
        } = s;
        dataSocket.forEach(({ name, val }) => {
          if (name === title) {
            datos.push(val);
            if (datos.length > 30) {
              datos.shift();
              labels.shift();
              const lastItem = this.lodash.last(labels);
              if (lastItem === 60) {
                labels.push(1);
              } else {
                labels.push(lastItem + 1);
              }
            }
          }
        });
        s.data.labels = labels;
        s.data.datasets[0].data = datos;
        return s;
      });
      return localSensors;
    },
  },
  computed: {
    ...mapGetters([
      'sensorsAPIList',
      'operatorsList',
      'instrumentalistsList',
      'sensorsList',
    ]),
  },
  async created() {
    await this.$store.dispatch('getSensors');
  },
  beforeMount() {
    this.getOperators();
    this.getInstrumentaslists();
  },
  watch: {
    sensorsList() {
      const { sensorsP, sensorsT } = this.sensorsList;
      this.$store.commit('SET_SENSOR_API', [
        this.createArrayToGraph(sensorsP),
        this.createArrayToGraph(sensorsT),
      ]);
    },
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    disconnect() {
      console.log('disconnected');
    },
    SENSORS_DATA({ sensorsP, sensorsT }) {
      // console.log('SENSORS_DATA');
      if (!this.lodash.isEmpty(this.sensorsList)) {
        const [pSensors, tSensors] = this.sensorsAPIList;
        const pSensorResult = this.setDataSensors({
          dataSocket: sensorsP,
          localSensors: pSensors,
        });
        const tSensorResult = this.setDataSensors({
          dataSocket: sensorsT,
          localSensors: tSensors,
        });
        this.$store.commit('SET_SENSOR_API', [pSensorResult, tSensorResult]);
      }
    },
  },
};
</script>
