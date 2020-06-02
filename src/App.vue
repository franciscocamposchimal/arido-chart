<template>
  <v-app id="inspire">
    <Navigation />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from '@/components/commons/NavBar.vue';

export default {
  name: 'App',

  components: {
    Navigation,
  },
  data: () => ({
    //
  }),
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
