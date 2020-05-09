<template>
  <v-container class="grey lighten-5" :fluid="false">
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3">Single - {{ items[tab] }}</h1>
      </v-card-title>
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in tabsSelect" :key="`${index}-tab`">
          <v-container class="grey lighten-5" :fluid="false">
            <v-row justify="space-around">
              <v-col cols="12">
                <v-card class="pa-2" outlined tile elevation="4">
                  <v-card-text>
                    <v-row no-gutters justify="space-between" align="center">
                      <v-col cols="2">
                        {{ itemsToGraph[tab].status.title }}
                        <v-icon :color="itemsToGraph[tab].status.color">
                          {{ itemsToGraph[tab].status.icon }}
                        </v-icon>
                      </v-col>
                      <v-col cols="2">
                        <v-select
                          v-model="itemsToGraph[tab]"
                          :items="item"
                          label="Sensors"
                          dense
                          outlined
                          item-text="name"
                          item-value="id"
                          return-object
                          @change="itemSelected"
                        ></v-select>
                      </v-col>
                      <v-col cols="2">
                        <v-select
                          v-model="unitToGraph[tab]"
                          :items="unitsToSelect[tab]"
                          label="Units"
                          dense
                          outlined
                          item-text="name"
                          item-value="tag"
                          return-object
                          @change="unitSelected"
                        ></v-select>
                      </v-col>
                      <v-col cols="2">
                        <v-select
                          v-model="unitsTimeToGraph[tab]"
                          :items="unitsTimeToSelect"
                          label="Time"
                          dense
                          outlined
                          item-text="name"
                          item-value="tag"
                          return-object
                          @change="timeSelected"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <line-chart
                    :ref="`tabSelectted`"
                    :chart-data="itemsToGraph[tab].data"
                    :options="optionsChart"
                  ></line-chart>

                  <pre>{{ $vuetify.breakpoint.name }}</pre>
                  <pre
                    >{{ $vuetify.breakpoint.width }} - {{
                      $vuetify.breakpoint.height
                    }}</pre
                  >
                  <v-card-actions>
                    <v-btn text>Download</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>
<script>
import LineChart from '@/graphics/LineChart';
// :width="300" :height="300"
export default {
  name: 'Single',
  components: {
    LineChart,
  },
  data() {
    return {
      tab: 0,
      unit: '',
      time: '',
      items: ['Pressure', 'Temperature'],
      itemsToGraph: [
        {
          id: 0,
          name: '',
          status: {
            title: 'Online',
            icon: 'mdi-flash',
            color: 'green',
          },
          data: this.fillData(1, 5000000),
        },
        {
          id: 0,
          name: '',
          status: {
            title: 'Online',
            icon: 'mdi-flash',
            color: 'green',
          },
          data: this.fillData(1, 1000000),
        },
      ],
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
      tabsSelect: [
        [
          {
            id: 1,
            name: 'Sensor P1',
            status: {
              title: 'Online',
              icon: 'mdi-flash',
              color: 'green',
            },
            data: this.fillData(1, 5000000),
          },
          {
            id: 2,
            name: 'Sensor P2',
            status: {
              title: 'Online',
              icon: 'mdi-flash',
              color: 'green',
            },
            data: this.fillData(1, 5000000),
          },
          {
            id: 3,
            name: 'Sensor P3',
            status: {
              title: 'Offline',
              icon: 'mdi-flash-alert',
              color: 'red',
            },
            data: this.fillData(1, 5000000),
          },
        ],
        [
          {
            id: 1,
            name: 'Sensor T1',
            status: {
              title: 'Offline',
              icon: 'mdi-flash-alert',
              color: 'red',
            },
            data: this.fillData(1, 5000000),
          },
          {
            id: 2,
            name: 'Sensor T2',
            status: {
              title: 'Online',
              icon: 'mdi-flash',
              color: 'green',
            },
            data: this.fillData(1, 5000000),
          },
          {
            id: 3,
            name: 'Sensor T3',
            status: {
              title: 'Offline',
              icon: 'mdi-flash-alert',
              color: 'red',
            },
            data: this.fillData(1, 5000000),
          },
        ],
      ],
    };
  },
  computed: {
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
    itemSelected({ status }) {
      // console.log(status);
      this.itemsToGraph[this.tab].status = { ...status };
    },
    unitSelected(unit) {
      this.unit = unit.tag;
      // console.log(this.optionsChart);
    },
    timeSelected(time) {
      this.time = time.tag;
      // console.log(this.optionsChart);
    },
    fillData(hours, colorMax) {
      const hexColor = this.getRandomHexColor(colorMax);
      return {
        labels: this.timeToLabel(hours),
        datasets: [
          {
            label: 'data uno',
            backgroundColor: hexColor,
            borderColor: hexColor,
            fill: false,
            data: this.getRandomInt(hours, 100, 500),
          },
        ],
      };
    },
    getRandomInt(hours, min, max) {
      const toMinutes = Math.floor(hours * 60);
      const timeList = Array.from(Array(toMinutes), () =>
        Math.floor(Math.random() * (max - min) + min),
      );
      // console.log(timeList);
      return timeList;
    },
    timeToLabel(hours) {
      const toMinutes = Math.floor(hours * 60);
      // const toSeconds = Math.floor(hours * 60 * 60);
      const minutesList = Array.from(Array(toMinutes), (x, index) => index + 1);
      // console.log(minutesList);
      return minutesList;
    },
    getRandomHexColor(colorMax) {
      // 1000000
      const n = (Math.random() * 0xfffff * colorMax).toString(16);
      return `#${n.slice(0, 6)}`;
    },
  },
  watch: {
    tab(tabSelect) {
      console.log('tabSelect');
      // const forTab = this.tabsSelect[tabSelect];
      // this.itemsToGraph[tabSelect] = forTab[tabSelect];
      this.unit = this.unitToGraph[tabSelect].tag;
      this.time = this.unitsTimeToGraph[tabSelect].tag;
      // console.log("tabSelect ", this.itemsToGraph);
      // console.log();
    },
  },
  beforeMount() {
    const [[forTabOne], [forTabTwo]] = this.tabsSelect;
    this.itemsToGraph[0] = forTabOne;
    this.itemsToGraph[1] = forTabTwo;
    this.unit = this.unitToGraph[this.tab].tag;
    this.time = this.unitsTimeToGraph[this.tab].tag;
    // console.log('beforeMount', this.itemsToGraph);
  },
};
</script>
