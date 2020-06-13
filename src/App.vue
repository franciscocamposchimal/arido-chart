<template>
  <v-app id="inspire">
    <Navigation @openDialog="openDialog"></Navigation>
    <v-content>
      <router-view
        :sensorsData="sensorsData"
        :sensorsList="sensorsList"
      ></router-view>
      <TestDialog
        :dialog="isOpenDialog"
        :opList="operatorsList"
        :instList="instrumentalistsList"
        @closeDialog="closeDialog"
      ></TestDialog>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navigation from '@/components/commons/NavBar.vue';
import TestDialog from './components/commons/TestDialog.vue';

export default {
  name: 'App',
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
  },
  computed: {
    ...mapGetters(['operatorsList', 'instrumentalistsList', 'sensorsList']),
  },
  async created() {
    await this.$store.dispatch('getSensors');
  },
  mounted() {
    this.getOperators();
    this.getInstrumentaslists();
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
      this.sensorsData = { sensorsP, sensorsT };
    },
  },
};
</script>
