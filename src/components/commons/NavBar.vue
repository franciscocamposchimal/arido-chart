<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      fixed
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Monitoring dashboard
          </v-list-item-title>
          <v-list-item-subtitle>views & settings</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.name"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item link to="/settings">
          <v-list-item-icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn small @click="isOpenDialog" :disabled="showTestClock">
              CREATE TEST
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content v-if="showTestClock">
            <span>
              {{
                `${
                  currentTest.name ? currentTest.name : 'Test'
                } started ago ...`
              }}
            </span>
            <ClockWatch :dateToChron="currentTest"></ClockWatch>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content v-if="showTestClock">
            <v-btn
              small
              color="red"
              @click="stopTest"
              :loading="stopSensorModel"
              :disabled="stopSensorModel"
            >
              STOP TEST
            </v-btn>
            <!-- <pre>{{ currentTest }}</pre> -->
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="#0CCC9D"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      dark
      app
      fixed
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">
        <v-img
          :src="require('@/assets/argosLogo.svg')"
          height="50%"
          width="50%"
        ></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon :color="sensorsIsOnline ? 'deep-purple darken-3' : 'red'">
          {{ sensorsIsOnline ? 'mdi-sync' : 'mdi-sync-off' }}
        </v-icon>
      </v-btn>
      <i>
        {{
          sensorsIsOnline ? ' Sensors connected, ' : ' Sensors disconnected, '
        }}
      </i>
      <v-btn icon>
        <v-icon :color="$socket.connected ? 'deep-purple darken-3' : 'red'">
          {{
            $socket.connected ? 'mdi-server-network' : 'mdi-server-network-off'
          }}
        </v-icon>
      </v-btn>
      <i>
        {{ $socket.connected ? ' Server connected' : ' Server disconnected' }}
      </i>
    </v-app-bar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ClockWatch from './ClockTest.vue';

export default {
  name: 'Navigation',
  props: ['currentTest'],
  components: {
    ClockWatch,
  },
  data: () => ({
    drawer: null,
    sensorsOnline: false,
    items: [
      {
        name: 'Home',
        icon: 'mdi-home-analytics',
        link: '/',
      },
      {
        name: 'Single',
        icon: 'mdi-chart-bell-curve-cumulative',
        link: '/single',
      },
      {
        name: 'Multiple',
        icon: 'mdi-chart-multiple',
        link: '/multiple',
      },
      {
        name: 'All',
        icon: 'mdi-chart-line-stacked',
        link: '/all',
      },
    ],
  }),
  methods: {
    isOpenDialog() {
      this.$emit('openDialog', true);
    },
    async stopTest() {
      // console.log('STOP');
      await this.$store.dispatch('stopTest');
    },
  },
  computed: {
    ...mapGetters(['stopSensorModel']),
    sensorsIsOnline() {
      return this.sensorsOnline;
    },
    showTestClock() {
      return !this.lodash.isEmpty(this.currentTest);
    },
  },
  sockets: {
    SENSORS_ISCONNECTED(payload) {
      this.sensorsOnline = payload.isConnected;
      // console.log('SENSORS_ISCONNECTED: ', payload);
    },
  },
};
</script>
