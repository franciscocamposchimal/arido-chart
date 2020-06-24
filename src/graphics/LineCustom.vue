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
      </v-row>
    </v-card-text>
    <line-chart :chart-data="chartData" :options="optionsChart"></line-chart>
  </v-card>
</template>
<script>
import LineChart from '@/graphics/LineChart';

// const statusKeys = ['title', 'icon', 'color'];
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
    unitTimeSelect: {
      type: Array,
      required: true,
      default: () => [],
    },
    // table
    responsiveChart: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  data() {
    return {
      // values for reactive options chart
      unit: '',
      time: 'minute',
      responsive: true,
      // selected defautl sensot
      sensorModelDefault: {},
      // selected default unit
      unitModelDefault: {},
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
    // evento para el cambio de tiempo
    timeSelected(selectedItem) {
      this.time = selectedItem.tag;
      this.$emit('timeSelected', { selectedItem, id: this.idItem });
    },
    // click en la grafica
    clickEventListener(point) {
      console.log('point ', point);
      // console.log('elements ', elements);
    },
  },
  computed: {
    // opciones de vista de la frafica
    optionsChart() {
      return {
        responsive: this.responsive,
        maintainAspectRatio: false,
        // onClick: this.clickEventListener,
        // events: ['click'],
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
          yAxes: [
            {
              // display: true,
              scaleLabel: {
                display: true,
                labelString: this.unit,
              },
              ticks: {
                min: 0,
                max: 500,
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
          ],
        },
      };
    },
  },
  mounted() {
    this.responsive = true;
    this.unit = this.unitModelToSelect.tag;
    this.time = this.unitsTimeModelToSelect.tag;
    this.sensorModelDefault = this.sensorModelToSelect;
    this.unitModelDefault = this.unitModelToSelect;
    this.unitTimeModelDefault = this.unitsTimeModelToSelect;
    // this.chartData = this.dataToGraph;
  },
  watch: {
    responsiveChart() {
      if (this.responsive) {
        this.responsive = false;
        this.responsive = true;
      }
      this.responsive = true;
    },
    unitModelToSelect(old) {
      if (this.idItem !== 0) {
        this.unitModelDefault = old;
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
