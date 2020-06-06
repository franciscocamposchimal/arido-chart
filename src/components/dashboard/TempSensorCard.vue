<template>
  <v-card
    :color="
      sensor.val < 30
        ? colors.blue
        : sensor.val < 60
        ? colors.yellow
        : colors.red
    "
    :dark="sensor.val < 30 ? true : false"
    elevation="5"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          Sensor {{ sensor.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ date }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-row align="center">
        <v-col class="display-1" cols="6">{{ sensor.val }}&deg;C</v-col>
        <v-col cols="6">
          <v-img src="@/assets/temp-t.png" width="80"></v-img>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'TempSensorCard',
  props: ['sensor', 'date'],
  data() {
    return {
      colors: {
        blue: '#26c6da',
        yellow: '#FFF9C4',
        red: '#FF3D00',
      },
    };
  },
};
</script>
