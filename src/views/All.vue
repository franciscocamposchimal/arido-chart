<template>
  <v-container class="grey lighten-5" :fluid="true">
    <v-card>
      <!-- Titulo -->
      <v-card-title class="text-center justify-center py-6">
        <h2 class="font-weight-bold display-5">Pressure & Temperature</h2>
      </v-card-title>
      <v-container class="grey lighten-5" :fluid="true">
        <v-row justify="center">
          <v-col cols="6">
            <cstm-line
              :idItem="sensorLeftDef.id"
              :sensorsSelect="itemsToGraphModel"
              :sensorModelToSelect="sensorLeftDef"
              :unitModelToSelect="unitToGraph[leftUnitSelect]"
              :unitSelect="unitsToSelect[leftUnitSelect]"
              :unitsTimeModelToSelect="unitsTimeToGraph[0]"
              :unitTimeSelect="unitsTimeToSelect"
              :chartData="sensorLeftDef.data"
              :defaultStatus="itemsToGraphModel[0].status"
              :responsiveChart="responsiveCharts"
              @sensorSelected="leftSensorGraph"
            ></cstm-line>
          </v-col>
          <v-col cols="6">
            <cstm-line
              :idItem="sensorRiDef.id"
              :sensorsSelect="itemsToGraphModel"
              :sensorModelToSelect="sensorRiDef"
              :unitModelToSelect="unitToGraph[riUnitSelect]"
              :unitSelect="unitsToSelect[riUnitSelect]"
              :unitsTimeModelToSelect="unitsTimeToGraph[0]"
              :unitTimeSelect="unitsTimeToSelect"
              :chartData="sensorRiDef.data"
              :defaultStatus="itemsToGraphModel[0].status"
              :responsiveChart="responsiveCharts"
              @sensorSelected="riSensorGraph"
            ></cstm-line>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import LineCustom from '@/graphics/LineCustom.vue';
import { dataDefaultMix } from '@/mixins/dataMixin';

export default {
  name: 'All',
  props: ['sensorsList'],
  mixins: [dataDefaultMix],
  components: {
    'cstm-line': LineCustom,
  },
  data() {
    return {
      responsiveCharts: true,
      // datos a graficar
      itemsToGraphModel: [],
      leftUnitSelect: 0,
      riUnitSelect: 1,
      leftSensorDefault: {},
      riSensorDefault: {},
    };
  },
  computed: {
    sensorLeftDef() {
      return this.leftSensorDefault;
    },
    sensorRiDef() {
      return this.riSensorDefault;
    },
  },
  methods: {
    leftSensorGraph(sensor) {
      this.leftSensorDefault = sensor;
      const { name } = sensor;
      if (name.includes('SensorP')) {
        this.leftUnitSelect = 0;
      } else {
        this.leftUnitSelect = 1;
      }
    },
    riSensorGraph(sensor) {
      this.riSensorDefault = sensor;
      const { name } = sensor;
      if (name.includes('SensorP')) {
        this.riUnitSelect = 0;
      } else {
        this.riUnitSelect = 1;
      }
    },
    updateArraySensors({ dataSocket, localSensors }) {
      // console.log(localSensors);
      return localSensors.map((s) => {
        const {
          status: { title },
        } = s;
        const findDataSocket = dataSocket.find(
          ({ status: { title: titleSock } }) => {
            return titleSock === title;
          },
        );
        const { datasets } = findDataSocket.data;

        s.data = { datasets };
        // console.log('FIND: ', findDataSocket);
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
    sensorsList([sensorsP, sensorsT]) {
      // console.log([sensorsP, sensorsT]);
      this.updateData({ sensorsP, sensorsT });
      // this.updateArraySensors(sensorsT);
    },
  },
  beforeMount() {
    /*
       Acciones para variables de inicio
       antes de que el componente sea montado a la vista.
    */
    const [pSensors, tSensors] = this.sensorsList;
    this.itemsToGraphModel = [...pSensors, ...tSensors];
    const [leftS] = pSensors;
    const [riS] = tSensors;
    this.leftSensorDefault = leftS;
    this.riSensorDefault = riS;
    // console.log('ITEMS ', this.itemsToGraphModel);
  },
};
</script>
