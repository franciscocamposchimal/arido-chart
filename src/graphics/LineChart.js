/* eslint-disable */
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  watch: {
    options: {
      handler(newOption) {
        this.renderChart(this.chartData, newOption);
      },
      deep: true,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
