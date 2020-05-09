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
        <v-tab-item v-for="(item, index) in tabsSelect" :key="`${index}-tab`">
          <v-container class="grey lighten-5" :fluid="false">
            <v-row justify="space-around">
              <v-col cols="12">
                <Line
                  :chartDataToGraph="itemsToGraph[tab].dataSets"
                  :defaultStatus="itemsToGraph[tab].status"
                  :unitModelToSelect="unitToGraph[tab]"
                  :unitsTimeModelToSelect="unitsTimeToGraph[tab]"
                ></Line>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>
<script>
import Line from '@/graphics/Line.vue';

export default {
  name: 'All',
  components: {
    Line,
  },
  data() {
    return {
      tab: 0,
      items: ['Pressure', 'Temperature'],
      // datos por tab de grafica.
      itemsToGraph: [
        {
          name: 'Pressure sensors',
          status: {
            title: 'Online',
            icon: 'mdi-flash',
            color: '',
          },
          dataSets: {},
        },
        {
          name: 'Temperature sensors',
          status: {
            title: 'Online',
            icon: 'mdi-flash',
            color: '',
          },
          dataSets: {},
        },
      ],
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
        {
          labels: this.timeToLabel(1),
          datasets: [
            this.fillData('SP1', 1, 5000000),
            this.fillData('SP2', 1, 4000000),
            this.fillData('SP3', 1, 3000000),
            this.fillData('SP4', 1, 2000000),
            this.fillData('SP5', 1, 1000000),
          ],
        },
        {
          labels: this.timeToLabel(1),
          datasets: [
            this.fillData('ST1', 1, 5000000),
            this.fillData('ST2', 1, 6000000),
            this.fillData('ST3', 1, 7000000),
          ],
        },
      ],
    };
  },
  computed: {
    // opciones de vista de la frafica
    optionsChart() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: `Time (${this.time})`,
              },
              ticks: {
                min: 0,
                max: 30,
                stepSize: 1,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.unit,
              },
              ticks: {
                min: 100,
                max: 500,
                stepSize: 100,
              },
            },
          ],
        },
      };
    },
  },
  methods: {
    // evento para el cambio de unidad
    unitSelected(unit) {
      this.unit = unit.tag;
      // console.log(this.optionsChart);
    },
    // evento para el cambio de tiempo
    timeSelected(time) {
      this.time = time.tag;
      // console.log(this.optionsChart);
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
    tab(tabSelect) {
      this.unit = this.unitToGraph[tabSelect].tag;
      this.time = this.unitsTimeToGraph[tabSelect].tag;
    },
  },
  beforeMount() {
    /* 
       Acciones para variables de inicio 
       antes de que el componente sea montado a la vista.
    */
    const forTabOne = this.tabsSelect[0];
    const forTabTwo = this.tabsSelect[1];
    this.itemsToGraph[0].dataSets = forTabOne;
    this.itemsToGraph[1].dataSets = forTabTwo;
    this.unit = this.unitToGraph[this.tab].tag;
    this.time = this.unitsTimeToGraph[this.tab].tag;
  },
};
</script>
