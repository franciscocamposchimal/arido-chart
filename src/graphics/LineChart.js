/* eslint-disable */
import { Line, mixins } from 'vue-chartjs';
// import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels';
// import CorssHair from 'chartjs-plugin-crosshair';
import zoom from 'chartjs-plugin-zoom';

const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  // plugins: [ChartJSPluginDatalabels],
  watch: {
    options: {
      handler(newOption) {
        this.renderChart(this.chartData, newOption);
        /// this.$refs.canvas.height = '100%';
      },
      deep: true,
    },
  },
  mounted() {
    this.addPlugin(zoom);
    this.renderChart(this.chartData, this.options);
  },
};
