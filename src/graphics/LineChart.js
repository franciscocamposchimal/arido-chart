/* eslint-disable */
import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;
let canvasWidth = 0;
let canvasHeight = 0;
export default {
	extends: Line,
	mixins: [ reactiveProp ],
	props: [ 'chartData', 'options' ],
	watch: {
		options: {
			handler(newOption) {
				// console.log('newOption');
				this.$data._chart.destroy();
				this.renderChart(this.chartData, newOption);

				if (this.$refs.canvas.width > 0) {
					canvasWidth = this.$refs.canvas.width;
				}
				if (this.$refs.canvas.height > 0) {
					canvasHeight = this.$refs.canvas.height;
				}
				this.$refs.canvas.style.cssText = `display: block; width: ${canvasWidth}px; height: ${canvasHeight}px;`;
				// console.log(this.$refs.canvas.style.cssText);
			},
			deep: true
		},
		/* chartData: {
			handler(newData) {
				console.log('newData');
				this.$data._chart.destroy();
				this.renderChart(newData, this.option);
			},
			deep: true
		} */
	},
	mounted() {
		this.renderChart(this.chartData, this.options);
	}
};