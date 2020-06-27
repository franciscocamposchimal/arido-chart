<template>
  <v-card color="#26c6da" :dark="true" elevation="5">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          Sensor {{ sensor.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ date }}
        </v-list-item-subtitle>
        <v-divider></v-divider>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-row align="center">
        <v-col class="headline" cols="6">{{ sensor.val }}PSI</v-col>
        <v-col cols="6">
          <v-img src="@/assets/pre-t.png" width="90"></v-img>
        </v-col>
      </v-row>
    </v-card-text>
    <v-list-item>
      <v-list-item-icon>
        <v-icon :color="sensor.val < 151 ? 'green accent-3' : ''">
          {{ 151 > sensor.val ? icons.alarm : icons.alarmOut }}
        </v-icon>
        <v-icon :color="sensor.val > 150 && sensor.val < 251 ? 'yellow' : ''">
          {{
            sensor.val > 150 && 251 > sensor.val ? icons.alarm : icons.alarmOut
          }}
        </v-icon>
        <v-icon :color="sensor.val > 250 && sensor.val < 501 ? 'red' : ''">
          {{
            sensor.val > 250 && 501 > sensor.val ? icons.alarm : icons.alarmOut
          }}
        </v-icon>
      </v-list-item-icon>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  name: 'PreSensorCard',
  props: ['sensor', 'date'],
  data() {
    return {
      icons: {
        alarm: 'mdi-alarm-light',
        alarmOut: 'mdi-alarm-light-outline',
      },
    };
  },
};
</script>
