<template>
  <v-container class="grey lighten-5" :fluid="false">
    <v-card>
      <!-- Titulo -->
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3">All - {{ items[tab] }}</h1>
      </v-card-title>
      <!-- Cabeceras de los tabs -->
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <!-- Contenedor de los tabs -->
      <v-tabs-items v-model="tab">
        <!-- contenidos del tab -->
        <v-tab-item
          v-for="(itemTab, index) in tabsSelect"
          :key="`${index}-tab`"
        >
          <v-container class="grey lighten-5" :fluid="false">
            <!-- Pagination -->
            <div class="text-center">
              <v-pagination
                v-if="itemTab.length > 2"
                v-model="page[tab]"
                :length="Math.floor(itemTab.length / 2) + 1"
                circle
              ></v-pagination>
            </div>
            <v-row justify="center">
              <v-col
                cols="6"
                v-for="(chart, idx) in chunkGraphs(itemTab, page[tab] - 1)"
                :key="`${idx}-chart`"
              >
                <cstm-line
                  :chartDataToGraph="chart.dataSets"
                  :defaultStatus="chart.status"
                  :unitModelToSelect="unitToGraph[tab]"
                  :unitsTimeModelToSelect="unitsTimeToGraph[tab]"
                  :unitSelect="unitsToSelect[tab]"
                  :unitTimeSelect="unitsTimeToSelect"
                  :responsiveChart="responsiveCharts"
                ></cstm-line>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>
<script>
import LineCustom from '@/graphics/LineCustom.vue';

export default {
  name: 'All',
  components: {
    'cstm-line': LineCustom,
  },
  data() {
    return {
      tab: 0,
      page: [1, 1],
      items: ['Pressure', 'Temperature'],
      responsiveCharts: true,
      // datos por tap de selects.
      unitsTimeToGraph: [
        {
          tag: 'min',
          name: '(min) Minutes',
        },
        {
          tag: 'min',
          name: '(min) Minutes',
        },
      ],
      unitToGraph: [
        {
          tag: 'PSI',
          name: '(PSI) Pounds per square inch',
        },
        {
          tag: 'ºC',
          name: '(ºC) Celsius',
        },
      ],
      // select para tiempo.
      unitsTimeToSelect: [
        {
          tag: 'min',
          name: '(min) Minutes',
        },
        {
          tag: 'seg',
          name: '(s) Seconds',
        },
        {
          tag: 'hr',
          name: '(hr) Hours',
        },
      ],
      // select para unidades de presion o temp.
      unitsToSelect: [
        [
          {
            tag: 'PSI',
            name: '(PSI) Pounds per square inch',
          },
          {
            tag: 'PA',
            name: '(PA) Pascal',
          },
          {
            tag: 'MPa',
            name: '(MPa) Megapascal',
          },
        ],
        [
          {
            tag: 'ºC',
            name: '(ºC) Celsius',
          },
          {
            tag: 'ºF',
            name: '(ºF) Fahrenheit',
          },
        ],
      ],
      // datos a graficar por tab
      tabsSelect: [
        [
          ...Array.from(Array(3), (x, idx) => {
            return {
              status: {
                title: `SP${idx + 1}`,
                icon: 'mdi-flash',
                color: idx % 2 ? 'green' : 'red',
              },
              dataSets: {
                labels: this.timeToLabel(1),
                datasets: [this.fillData(`SP${idx + 1}`, 1, 5000000)],
              },
            };
          }),
        ],
        [
          ...Array.from(Array(5), (x, idx) => {
            return {
              status: {
                title: `ST${idx + 1}`,
                icon: 'mdi-flash',
                color: idx % 2 ? 'green' : 'red',
              },
              dataSets: {
                labels: this.timeToLabel(1),
                datasets: [this.fillData(`ST${idx + 1}`, 1, 5000000)],
              },
            };
          }),
        ],
      ],
    };
  },
  methods: {
    // dividir el arreglo en grupos de a 2 y sobrantes
    chunkGraphs(charts, page) {
      const chunkIt = this.lodash.chunk(charts, 2);
      // console.log(charts);
      return chunkIt[page];
    },
    // datos random
    fillData(name, hours, colorMax) {
      const hexColor = this.getRandomHexColor(colorMax);
      return {
        label: name,
        backgroundColor: hexColor,
        borderColor: hexColor,
        fill: false,
        data: this.getRandomInt(hours, 100, 500),
      };
    },
    getRandomInt(hours, min, max) {
      const toMinutes = Math.floor(hours * 60);
      const timeList = Array.from(Array(toMinutes), () =>
        Math.floor(Math.random() * (max - min) + min),
      );
      return timeList;
    },
    timeToLabel(hours) {
      const toMinutes = Math.floor(hours * 60);
      const minutesList = Array.from(Array(toMinutes), (x, index) => index + 1);

      return minutesList;
    },
    getRandomHexColor(colorMax) {
      // 1000000
      const n = (Math.random() * 0xfffff * colorMax).toString(16);
      return `#${n.slice(0, 6)}`;
    },
  },
  watch: {
    // watcher para el cambio de tab
    tab() {
      this.responsiveCharts = !this.responsiveCharts;
    },
  },
};
</script>
