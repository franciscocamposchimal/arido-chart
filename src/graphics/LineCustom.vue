<template>
  <v-card class="pa-2" outlined tile elevation="4">
    <v-card-text>
      <v-row no-gutters justify="space-between" align="center">
        <v-col cols="2">
          {{ defaultStatus.title }}
          <v-icon :color="defaultStatus.color">{{ defaultStatus.icon }}</v-icon>
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="unitModelDefault"
            :items="unitSelect"
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
            v-model="unitTimeModelDefault"
            :items="unitTimeSelect"
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
      :chart-data="chartDataToGraph"
      :options="optionsChart"
    ></line-chart>

    <v-card-actions>
      <v-btn text>Download</v-btn>
    </v-card-actions>
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
    chartDataToGraph: {
      type: Object,
      required: true,
      default: () => {
        return {
          labels: [],
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
    // model de los items de los selects
    unitModelToSelect: {
      type: Object,
      required: true,
    },
    unitsTimeModelToSelect: {
      type: Object,
      required: true,
    },
    // data para los select
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
      time: '',
      responsive: true,
      // selected default unit
      unitModelDefault: {},
      // selected default time
      unitTimeModelDefault: {},
    };
  },
  methods: {
    // evento para el cambio de unidad
    unitSelected({ tag }) {
      this.unit = tag;
      // this.$emit('unitSelected', this.unitModelDefault);
    },
    // evento para el cambio de tiempo
    timeSelected({ tag }) {
      this.time = tag;
      // this.$emit('unitsTimeSelected', this.unitTimeModelDefault);
    },
  },
  computed: {
    // opciones de vista de la frafica
    optionsChart() {
      return {
        responsive: this.responsive,
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
  mounted() {
    this.responsive = true;
    this.unit = this.unitModelToSelect.tag;
    this.time = this.unitsTimeModelToSelect.tag;
    this.unitModelDefault = this.unitModelToSelect;
    this.unitTimeModelDefault = this.unitsTimeModelToSelect;
  },
  watch: {
    responsiveChart() {
      if (this.responsive) {
        this.responsive = false;
        this.responsive = true;
      }
      this.responsive = true;
    },
  },
};
</script>
