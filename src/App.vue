<template>
  <v-app id="inspire">
    <Navigation @openDialog="openDialog"></Navigation>
    <v-content>
      <router-view></router-view>
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
    ...mapGetters(['operatorsList', 'instrumentalistsList']),
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
  },
};
</script>
