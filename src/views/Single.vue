<template>
  <v-container class="grey lighten-5" :fluid="true">
    <!-- <pre>{{ tabsSelectApi }}</pre> -->
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h2 class="font-weight-bold display-5">Pressure & Temperature</h2>
        <!-- <pre>{{ tag }}</pre> -->
      </v-card-title>
      <v-container class="grey lighten-5" :fluid="true">
        <v-row justify="center">
          <v-col cols="12">
            <!-- <cstm-line
              :idItem="sensorLeftDef.id"
              :sensorsSelect="itemsToGraphModel"
              :sensorModelToSelect="sensorLeftDef"
              :unitModelToSelect="unitToGraph[leftUnitSelect]"
              :unitSelect="unitsToSelect[leftUnitSelect]"
              :unitsTimeModelToSelect="unitsTimeToGraph[0]"
              :unitTimeSelect="unitsTimeToSelect"
              :chartData="sensorLeftDef.data"
              :defaultStatus="itemsToGraphModel[0].status"
              @sensorSelected="leftSensorGraph"
              @unitSelected="unitS"
            ></cstm-line> -->
            <pre>{{ startDate }} | {{ endDay }} | {{ new Date().getTime() }}</pre>
            <div id="wrapper">
              <div id="chart-line2">
                <apexchart
                  type="line"
                  height="230"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import { dataDefaultMix } from '@/mixins/dataMixin';
// import LineCustom from '@/graphics/LineCustom.vue';

export default {
  name: 'Single',
  props: ['sensorsList'],
  mixins: [dataDefaultMix],
  components: {
    // 'cstm-line': () => import('@/graphics/LineCustom.vue'),
    apexchart: () => import('vue-apexcharts'),
  },
  data() {
    return {
      tag: 'PSI',
      itemsToGraphModel: [],
      leftUnitSelect: 0,
      leftSensorDefault: {},
      startDate: this.$moment().valueOf(),
      endDay: this.$moment()
        .endOf('day').valueOf(),

      // APEX
      series: [
        {
          name: 'S1',
          data: [
            {
              x: this.$moment().add(4, 's').valueOf(),
              y: 84,
            },
            {
              x: this.$moment().add(7, 's').valueOf(),
              y: 56,
            },
            {
              x: this.$moment().add(10, 's').valueOf(),
              y: 114,
            },
            {
              x: this.$moment().add(13, 's').valueOf(),
              y: 303,
            },
            {
              x: this.$moment().add(16, 's').valueOf(),
              y: 122,
            },
            {
              x: this.$moment().add(19, 's').valueOf(),
              y: 38,
            },
            {
              x: this.$moment().add(22, 's').valueOf(),
              y: 345,
            },
            {
              x: this.$moment().add(25, 's').valueOf(),
              y: 250,
            },
            {
              x: this.$moment().add(28, 's').valueOf(),
              y: 243,
            },
          ],
        },
      ],
      // Options
      chartOptions: {
        chart: {
          id: 'chart2',
          type: 'line',
          height: 230,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: 'zoom',
          },
          /* stroke: {
            curve: 'smooth',
          }, */
        },
        colors: ['#546E7A'],
        stroke: {
          width: 3,
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 0,
        },
        yaxis: {
          title: {
            text: 'Price',
          },
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 1,
          min: new Date().getTime(),
          max: new Date().getTime(),
        },
      },
    };
  },
  computed: {
    sensorLeftDef() {
      return this.leftSensorDefault;
    },
  },
  methods: {
    leftSensorGraph(sensor) {
      this.leftSensorDefault = sensor;
      const { name } = sensor;
      if (name.includes('SensorP')) {
        this.leftUnitSelect = 0;
        if (this.tag === 'ºF' || this.tag === 'ºF') this.tag = 'PSI';
      } else {
        this.leftUnitSelect = 1;
        if (this.tag !== 'ºF') this.tag = 'ºC';
      }
    },
    unitS({ selectedItem: { tag } }) {
      this.tag = tag;
    },
    updateArraySensors({ dataSocket, localSensors }) {
      // console.log(localSensors);
      return localSensors.map((s) => {
        const {
          status: { title },
          units,
        } = s;
        const findDataSocket = dataSocket.find(
          ({ status: { title: titleSock } }) => {
            return titleSock === title;
          },
        );
        /* console.log(
          `title ${title},`,
          `findDataSocket ${findDataSocket.status.title}`,
          `selected ${this.leftSensorDefault.status.title}`,
        ); */
        const { datasets } = findDataSocket.data;

        // press sensors
        if (this.tag === 'PA') {
          const findUnit =
            units.paSensorList?.name === this.leftSensorDefault.status.title;
          if (findUnit) datasets[0].data = units.paSensorList.data;
        }
        if (this.tag === 'MPa') {
          const findUnit =
            units.mpaSensorList?.name === this.leftSensorDefault.status.title;
          if (findUnit) datasets[0].data = units.mpaSensorList.data;
        }
        if (this.tag === 'PSI') {
          const findUnit =
            units.psiSensorList?.name === this.leftSensorDefault.status.title;
          if (findUnit) datasets[0].data = units.psiSensorList.data;
        }
        // temp sensors
        if (this.tag === 'ºF') {
          const findUnit =
            units.fSensorList?.name === this.leftSensorDefault.status.title;
          if (findUnit) datasets[0].data = units.fSensorList.data;
        }
        if (this.tag === 'ºC') {
          const findUnit =
            units.cSensorList?.name === this.leftSensorDefault.status.title;
          if (findUnit) datasets[0].data = units.cSensorList.data;
        }
        s.data = { datasets };
        return s;
      });
    },
    updateData({ sensorsP, sensorsT }) {
      const updatedSensors = this.updateArraySensors({
        dataSocket: [...sensorsP, ...sensorsT],
        localSensors: this.itemsToGraphModel,
      });
      // console.log(pUpdatedSensors);
      this.itemsToGraphModel = updatedSensors;
    },
  },
  watch: {
    /* sensorsList([sensorsP, sensorsT]) {
      if (this.itemsToGraphModel.length > 0) {
        this.updateData({ sensorsP, sensorsT });
      }
    }, */
  },
  beforeMount() {
    /* const [pSensors, tSensors] = this.sensorsList;
    this.itemsToGraphModel = [
      ...pSensors.map((s) => {
        const {
          data: {
            datasets: [getData],
          },
        } = s;
        getData.yAxisID = 'y-axis-0';
        s.data.datasets[0] = getData;
        return s;
      }),
      ...tSensors.map((s) => {
        const {
          data: {
            datasets: [getData],
          },
        } = s;
        getData.yAxisID = 'y-axis-0';
        s.data.datasets[0] = getData;
        return s;
      }),
    ];
    const [leftS] = pSensors;
    this.leftSensorDefault = leftS; */
  },
};
</script>
