<template>
  <v-card class="pa-2" outlined tile elevation="4">
    <v-card-text>
      <v-row no-gutters justify="space-around">
        <v-col cols="3" v-if="sensorsSelect.length > 0">
          <v-select
            label="Sensors"
            v-model="sensorModelDefault"
            :items="sensorsSelect"
            item-text="name"
            item-value="id"
            @change="sensorSelected"
            return-object
            dense
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Units"
            v-model="unitModelDefault"
            :items="unitSelect"
            item-text="name"
            item-value="tag"
            @change="unitSelected"
            return-object
            dense
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Time"
            v-model="unitTimeModelDefault"
            :items="unitTimeSelect"
            item-text="name"
            item-value="tag"
            @change="timeSelected"
            return-object
            dense
          ></v-select>
        </v-col>
        <v-col cols="3" v-if="isTwoY">
          <v-select
            label="Units"
            v-model="unitModelDefaultMulti"
            :items="unitSelectMulti"
            item-text="name"
            item-value="tag"
            @change="unitSelectedMulti"
            return-object
            dense
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text>
    <line-chart :chart-data="chartData" :options="optionsChart"></line-chart>
  </v-card>
</template>
<script>
import LineChart from '@/graphics/LineChart';

export default {
  name: 'LineCustom',
  components: {
    LineChart,
  },
  props: {
    // datos de entrada del chart
    chartData: {
      type: Object,
      required: true,
      default: () => {
        return {
          // labels: [],
          datasets: [],
        };
      },
    },
    // datos de llenado
    defaultStatus: {
      type: Object,
      required: true,
      // validator: (value) => statusKeys.every((key) => key in value),
      default: () => {
        return {
          title: 'Online',
          icon: 'mdi-flash',
          color: 'green',
        };
      },
    },
    // id only for pagination
    idItem: {
      type: Number,
      default: () => 0,
    },
    // model de los items de los selects
    sensorModelToSelect: {
      type: Object,
    },
    unitModelToSelect: {
      type: Object,
      required: true,
    },
    unitModelToSelectMulti: {
      type: Object,
    },
    unitsTimeModelToSelect: {
      type: Object,
      required: true,
    },
    // data para los select
    sensorsSelect: {
      type: Array,
      default: () => [],
    },
    unitSelect: {
      type: Array,
      required: true,
      default: () => [],
    },
    unitSelectMulti: {
      type: Array,
      default: () => [],
    },
    unitTimeSelect: {
      type: Array,
      required: true,
      default: () => [],
    },
    // table
    isTwoY: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // values for reactive options chart
      unit: '',
      unitMulti: '',
      time: 'minute',
      // selected defautl sensot
      sensorModelDefault: {},
      // selected default unit
      unitModelDefault: {},
      unitModelDefaultMulti: {},
      // selected default time
      unitTimeModelDefault: {},
    };
  },
  methods: {
    // evento para el cambio de unidad
    sensorSelected(sensor) {
      // console.log(sensor);
      this.$emit('sensorSelected', sensor);
    },
    // evento para el cambio de unidad
    unitSelected(selectedItem) {
      // console.log('emit-selectedItem ', selectedItem);
      this.unit = selectedItem.tag;
      this.$emit('unitSelected', { selectedItem, id: this.idItem });
    },
    unitSelectedMulti(selectedItem) {
      // console.log('emit-selectedItem ', selectedItem);
      this.unitMulti = selectedItem.tag;
      this.$emit('unitSelectedMulti', { selectedItem, id: this.idItem });
    },
    // evento para el cambio de tiempo
    timeSelected(selectedItem) {
      this.time = selectedItem.tag;
      this.$emit('timeSelected', { selectedItem, id: this.idItem });
    },
  },
  computed: {
    // opciones de vista de la frafica
    twoYAxes() {
      if (!this.isTwoY) {
        return [
          {
            // display: true,
            id: 'A',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: this.unit,
            },
            ticks: {
              // suggestedMin: 0,
              // suggestedMax: 500,
              beginAtZero: true,
              stepSize: 50,
              /* callback: (value) => {
                  return ;
                }, */
            },
            gridLines: {
              drawBorder: true,
              color: ['red', 'green'],
            },
          },
        ];
      }
      return [
        {
          // display: true,
          id: 'A',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: this.unit,
          },
          ticks: {
            // suggestedMin: 0,
            // suggestedMax: 500,
            beginAtZero: true,
            stepSize: 50,
            /* callback: (value) => {
              console.log(value);
              return value;
            }, */
          },
          gridLines: {
            drawBorder: true,
            color: ['red', 'green'],
          },
        },
        {
          // display: true,
          id: 'B',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: this.unitMulti,
          },
          ticks: {
            // suggestedMin: 0,
            // suggestedMax: 500,
            beginAtZero: true,
            stepSize: 50,
            /* callback: (value) => {
                  return ;
                }, */
          },
        },
      ];
    },
    optionsChart() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 80,
        // onClick: this.clickEventListener,
        // events: ['click'],\
        /* animation: {
          duration: 0
        }, */
        // responsiveAnimationDuration: 0,
        tooltips: {
          mode: 'interpolate',
          intersect: false,
        },
        plugins: {
          /* zoom: {
            zoom: {
              enabled: true,
              drag: true,

              mode: 'xy',

              speed: 0.1,

              threshold: 2,

              sensitivity: 3,

              // Function called while the user is zooming
              onZoom: () => {
                console.log(`I'm zooming!!!`);
              },
              // Function called once zooming is completed
              onZoomComplete: () => {
                console.log(`I was zoomed!!!`);
              },
            },
          }, */
          /* crosshair: {
            line: {
              color: '#FF0000', // crosshair line color
              width: 1, // crosshair line width
            },
            zoom: {
              enable: false,
            },
          }, */
          /* datalabels: {
            backgroundColor: (context) => {
              return context.dataset.backgroundColor;
            },
            borderRadius: 5,
            color: 'white',
            formatter: (value) => {
              // console.log(value);
              return value.y;
            },
            font: {
              weight: 'bold',
              size: 8,
            },
          }, */
        },
        scales: {
          xAxes: [
            {
              // display: true,
              type: 'time',
              time: {
                unit: this.time,
              },
              scaleLabel: {
                display: true,
                labelString: `Time (${this.time})`,
              },
              /* ticks: {
                min: 0,
                stepSize: 1,
                /* callback: (value) => {
                  return `${value}${this.time}`;
                },
              }, */
            },
          ],
          yAxes: this.twoYAxes,
        },
      };
    },
  },
  mounted() {
    this.unit = this.unitModelToSelect.tag;
    if (this.isTwoY) this.unitMulti = this.unitModelToSelectMulti.tag;
    this.time = this.unitsTimeModelToSelect.tag;
    this.sensorModelDefault = this.sensorModelToSelect;
    this.unitModelDefault = this.unitModelToSelect;
    if (this.isTwoY) this.unitModelDefaultMulti = this.unitModelToSelectMulti;
    this.unitTimeModelDefault = this.unitsTimeModelToSelect;
    // this.chartData = this.dataToGraph;
  },
  watch: {
    unitModelToSelect(old) {
      if (this.idItem !== 0) {
        this.unitModelDefault = old;
      }
    },
    unitModelToSelectMulti(old) {
      if (this.idItem !== 0) {
        this.unitModelDefaultMulti = old;
      }
    },
    unitsTimeModelToSelect(old) {
      if (this.idItem !== 0) {
        this.unitTimeModelDefault = old;
      }
    },
  },
};
</script>
