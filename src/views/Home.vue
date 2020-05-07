<template>
  <v-container class="grey lighten-5" :fluid="false">
    <v-row justify="space-around">
      <v-col cols="6">
        <v-card class="pa-2" outlined tile elevation="4">
          <v-card-text>
            <v-row no-gutters justify="space-around">
              <v-col cols="3">
                <div class="text-start">
                  Online
                  <v-icon color="green">mdi-flash</v-icon>
                </div>
              </v-col>
              <v-col cols="3">
                <v-select
                  :items="['PSI', 'Pascales', 'Megapascales']"
                  label="Medidas"
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select :items="['minutos', 'segundos', 'hora']" label="Tiempo" dense outlined></v-select>
              </v-col>
            </v-row>
            <div class="small">
              <line-chart :chart-data="fillData(1, 1000000)" :options="options('sensor 1')"></line-chart>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text>Descargar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-2" outlined tile elevation="4">
          <v-card-text>
            <div>
              Offline
              <v-icon color="red">mdi-flash-alert</v-icon>
            </div>
            <div class="small">
              <line-chart :chart-data="fillData(1, 999999)" :options="options('sensor 2')"></line-chart>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text>Descargar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="12">
        <v-card class="pa-2" outlined tile elevation="4">
          <v-card-text>
            <div>
              Offline
              <v-icon color="red">mdi-flash-alert</v-icon>
            </div>
            <p class="display-1 text--primary">Sensor 3</p>
            <div class="small">
              <line-chart :chart-data="fillData(1, 5000000)" :options="options('sensor 3')"></line-chart>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text>Descargar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// mdi-flash-alert
import LineChart from "@/graphics/LineChart.js";

export default {
  name: "Home",
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: {}
    };
  },
  methods: {
    fillData(hours, colorMax) {
      const hexColor = this.getRandomHexColor(colorMax);
      return {
        labels: this.time(hours),
        datasets: [
          {
            label: "data uno",
            backgroundColor: hexColor,
            borderColor: hexColor,
            fill: false,
            data: this.getRandomInt(hours, 100, 500)
          }
        ]
      };
    },
    options(title) {
      return {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: title
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Tiempo (min)"
              },
              ticks: {
                min: 15,
                max: 30,
                stepSize: 1
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "PSI"
              },
              ticks: {
                min: 100,
                max: 500,
                stepSize: 100
              }
            }
          ]
        }
      };
    },
    getRandomInt(hours, min, max) {
      const toMinutes = Math.floor(hours * 60);
      const timeList = Array.from(Array(toMinutes), () =>
        Math.floor(Math.random() * (max - min) + min)
      );
      // console.log(timeList);
      return timeList;
    },
    time(hours) {
      const toMinutes = Math.floor(hours * 60);
      // const toSeconds = Math.floor(hours * 60 * 60);
      const minutesList = Array.from(Array(toMinutes), (x, index) => index + 1);
      // console.log(minutesList);
      return minutesList;
    },
    getRandomHexColor(colorMax) {
      // 1000000
      let n = (Math.random() * 0xfffff * colorMax).toString(16);
      return `#${n.slice(0, 6)}`;
    }
  }
};
</script>
