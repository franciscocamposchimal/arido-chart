<template>
  <v-container class="grey lighten-5" :fluid="true">
    <v-row>
      <v-col cols="12" no-gutters>
        <v-card>
          <v-card-title>Temperature sensors</v-card-title>
          <v-row justify="center" class="pa-5">
            <v-col
              :cols="colsResponsive"
              v-for="(item, index) in sensorsT"
              :key="`t-${index}`"
            >
              <TempSensorCard
                :sensor="item"
                :date="currentDate"
              ></TempSensorCard>
            </v-col>
          </v-row>
          <v-card-title>Pressure sensors</v-card-title>
          <v-row justify="center" class="pa-5">
            <v-col
              cols="colsResponsive"
              v-for="(item, index) in sensorsP"
              :key="`p-${index}`"
            >
              <PreSensorCard :sensor="item" :date="currentDate"></PreSensorCard>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import TempSensorCard from '../components/dashboard/TempSensorCard.vue';
// import PreSensorCard from '../components/dashboard/PreSensorCard.vue';

export default {
  name: 'Home',
  components: {
    TempSensorCard: () => import('../components/dashboard/TempSensorCard.vue'),
    PreSensorCard: () => import('../components/dashboard/PreSensorCard.vue'),
  },
  data() {
    return {
      menu2: false,
      currentDate: '',
      sensorsT: [],
      sensorsP: [],
    };
  },
  computed: {
    colsResponsive() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '12';
        case 'sm':
        case 'md':
        case 'lg':
        case 'xl':
        default:
          return '4';
      }
    },
  },
  sockets: {
    SENSORS_DATA(data) {
      this.currentDate = data.date;
      this.sensorsT = data.sensorsT;
      this.sensorsP = data.sensorsP;
    },
  },
};
</script>
