<template>
  <v-container class="grey lighten-5" :fluid="true">
    <v-card>
      <!-- Titulo -->
      <v-card-title class="text-center justify-center py-6">
        <h2 class="font-weight-bold display-5">Pressure & Temperature</h2>
      </v-card-title>
      <v-container class="grey lighten-5" :fluid="true">
        <v-row justify="center">
          <v-col :cols="colsResponsive">
            <cstm-line
              :idItem="sensorLeftDef.id"
              :sensorsSelect="itemsToGraphModel"
              :sensorModelToSelect="sensorLeftDef"
              :unitModelToSelect="leftUnitSelect"
              :unitSelect="unitsToSelect[leftUnitSelect2]"
              :unitsTimeModelToSelect="unitsTimeToGraph[0]"
              :unitTimeSelect="unitsTimeToSelect"
              :chartData="sensorLeftDef.data"
              :defaultStatus="itemsToGraphModel[0].status"
              @sensorSelected="leftSensorGraph"
              @unitSelected="leftUnitS"
            ></cstm-line>
          </v-col>
          <v-col :cols="colsResponsive">
            <cstm-line
              :idItem="sensorRiDef.id"
              :sensorsSelect="itemsToGraphModel"
              :sensorModelToSelect="sensorRiDef"
              :unitModelToSelect="riUnitSelect"
              :unitSelect="unitsToSelect[riUnitSelect2]"
              :unitsTimeModelToSelect="unitsTimeToGraph[0]"
              :unitTimeSelect="unitsTimeToSelect"
              :chartData="sensorRiDef.data"
              :defaultStatus="itemsToGraphModel[0].status"
              @sensorSelected="riSensorGraph"
              @unitSelected="riUnitS"
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
      // datos a graficar
      leftUnit: 'PSI',
      riUnit: 'ºC',
      itemsToGraphModel: [],
      leftUnitSelect: {
        tag: 'PSI',
        name: '(PSI) Pounds per square inch',
      },
      riUnitSelect: {
        tag: 'ºC',
        name: '(ºC) Celsius',
      },
      leftUnitSelect2: 0,
      riUnitSelect2: 1,
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
    colsResponsive() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '12';
        case 'sm':
        case 'md':
        case 'lg':
        case 'xl':
        default:
          return '6';
      }
    },
  },
  methods: {
    // select sensor, left
    leftSensorGraph(sensor) {
      const { name } = sensor;
      if (name.includes('SensorP')) {
        this.leftUnitSelect2 = 0;
        if (this.leftSensorDefault.name.includes('SensorT')) {
          if (name === this.riSensorDefault.name) {
            this.leftUnitSelect = this.riUnitSelect;
            this.leftUnit = this.riUnitSelect.tag;
          } else {
            this.leftUnitSelect = {
              tag: 'PSI',
              name: '(PSI) Pounds per square inch',
            };
            this.leftUnit = 'PSI';
          }
        }
        if (name === this.riSensorDefault.name) {
          this.leftUnitSelect = this.riUnitSelect;
          this.leftUnit = this.riUnitSelect.tag;
        } else {
          this.leftUnitSelect = {
            tag: 'PSI',
            name: '(PSI) Pounds per square inch',
          };
          this.leftUnit = 'PSI';
        }
      } else {
        this.leftUnitSelect2 = 1;
        if (this.leftSensorDefault.name.includes('SensorP')) {
          if (name === this.riSensorDefault.name) {
            this.leftUnitSelect = this.riUnitSelect;
            this.leftUnit = this.riUnitSelect.tag;
          } else {
            this.leftUnitSelect = {
              tag: 'ºC',
              name: '(ºC) Celsius',
            };
            this.leftUnit = 'ºC';
          }
        }
        if (name === this.riSensorDefault.name) {
          this.leftUnitSelect = this.riUnitSelect;
          this.leftUnit = this.riUnitSelect.tag;
        } else {
          this.leftUnitSelect = {
            tag: 'ºC',
            name: '(ºC) Celsius',
          };
          this.leftUnit = 'ºC';
        }
      }
      this.leftSensorDefault = sensor;
    },
    // select sensor, ri
    riSensorGraph(sensor) {
      const { name } = sensor;
      if (name.includes('SensorP')) {
        this.riUnitSelect2 = 0;
        if (this.riSensorDefault.name.includes('SensorT')) {
          if (this.leftSensorDefault.name === name) {
            this.riUnitSelect = this.leftUnitSelect;
            this.riUnit = this.leftUnitSelect.tag;
          } else {
            this.riUnitSelect = {
              tag: 'PSI',
              name: '(PSI) Pounds per square inch',
            };
            this.riUnit = 'PSI';
          }
        }
        if (this.leftSensorDefault.name === name) {
          this.riUnitSelect = this.leftUnitSelect;
          this.riUnit = this.leftUnitSelect.tag;
        } else {
          this.riUnitSelect = {
            tag: 'PSI',
            name: '(PSI) Pounds per square inch',
          };
          this.riUnit = 'PSI';
        }
      } else {
        this.riUnitSelect2 = 1;
        if (this.riSensorDefault.name.includes('SensorP')) {
          if (this.leftSensorDefault.name === name) {
            this.riUnitSelect = this.leftUnitSelect;
            this.riUnit = this.leftUnitSelect.tag;
          } else {
            this.riUnitSelect = {
              tag: 'ºC',
              name: '(ºC) Celsius',
            };
            this.riUnit = 'ºC';
          }
        }
        if (this.leftSensorDefault.name === name) {
          this.riUnitSelect = this.leftUnitSelect;
          this.riUnit = this.leftUnitSelect.tag;
        } else {
          this.riUnitSelect = {
            tag: 'ºC',
            name: '(ºC) Celsius',
          };
          this.riUnit = 'ºC';
        }
      }
      this.riSensorDefault = sensor;
    },
    // select de units, left
    leftUnitS({ selectedItem }) {
      this.leftD({ selectedItem });
      if (this.leftSensorDefault.name === this.riSensorDefault.name) {
        this.riD({ selectedItem });
      }
    },
    leftD({ selectedItem }) {
      this.leftUnit = selectedItem.tag;
      this.leftUnitSelect = selectedItem;
    },
    // select de units, ri
    riUnitS({ selectedItem }) {
      this.riD({ selectedItem });
      if (this.leftSensorDefault.name === this.riSensorDefault.name) {
        this.leftD({ selectedItem });
      }
    },
    riD({ selectedItem }) {
      this.riUnit = selectedItem.tag;
      this.riUnitSelect = selectedItem;
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
        const { datasets } = findDataSocket.data;
        // left P
        if (this.leftUnit === 'PA') {
          const findUnitLeft =
            units.paSensorList?.name ===
            this.leftSensorDefault.units.paSensorList?.name;

          if (findUnitLeft) {
            datasets[0].data = units.paSensorList.data;
          }
        }
        if (this.leftUnit === 'MPa') {
          const findUnitLeft =
            units.mpaSensorList?.name ===
            this.leftSensorDefault.units.mpaSensorList?.name;

          if (findUnitLeft) {
            datasets[0].data = units.mpaSensorList.data;
          }
        }
        if (this.leftUnit === 'PSI') {
          const findUnitLeft =
            units.psiSensorList?.name ===
            this.leftSensorDefault.units.psiSensorList?.name;

          if (findUnitLeft) {
            datasets[0].data = units.psiSensorList.data;
          }
        }
        // left T
        if (this.leftUnit === 'ºF') {
          const findUnitLeft =
            units.fSensorList?.name.slice(-1) ===
            this.leftSensorDefault.name.slice(-1);

          if (findUnitLeft) {
            datasets[0].data = units.fSensorList.data;
          }
        }
        if (this.leftUnit === 'ºC') {
          const findUnitLeft =
            units.cSensorList?.name.slice(-1) ===
            this.leftSensorDefault.name.slice(-1);

          if (findUnitLeft) {
            datasets[0].data = units.cSensorList.data;
          }
        }
        // ri P
        if (this.riUnit === 'PA') {
          const findUnitRi =
            units.paSensorList?.name ===
            this.riSensorDefault.units.paSensorList?.name;

          if (findUnitRi) {
            datasets[0].data = units.paSensorList.data;
          }
        }
        if (this.riUnit === 'MPa') {
          const findUnitRi =
            units.mpaSensorList?.name ===
            this.riSensorDefault.units.mpaSensorList?.name;

          if (findUnitRi) {
            datasets[0].data = units.mpaSensorList.data;
          }
        }
        if (this.riUnit === 'PSI') {
          const findUnitRi =
            units.psiSensorList?.name ===
            this.riSensorDefault.units.psiSensorList?.name;

          if (findUnitRi) {
            datasets[0].data = units.psiSensorList.data;
          }
        }
        // ri T
        if (this.riUnit === 'ºF') {
          const findUnitRi =
            units.fSensorList?.name ===
            this.riSensorDefault.units.fSensorList?.name;

          if (findUnitRi) {
            datasets[0].data = units.fSensorList.data;
          }
        }
        if (this.riUnit === 'ºC') {
          const findUnitRi =
            units.cSensorList?.name ===
            this.riSensorDefault.units.cSensorList.name;

          if (findUnitRi) {
            datasets[0].data = units.cSensorList.data;
          }
        }

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
      this.itemsToGraphModel = updatedSensors;
    },
  },
  watch: {
    sensorsList([sensorsP, sensorsT]) {
      if (this.itemsToGraphModel.length > 0) {
        this.updateData({ sensorsP, sensorsT });
      }
    },
  },
  beforeMount() {
    /*
       Acciones para variables de inicio
       antes de que el componente sea montado a la vista.
    */
    const [pSensors, tSensors] = this.sensorsList;
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
    const [riS] = tSensors;
    this.leftSensorDefault = leftS;
    this.riSensorDefault = riS;
    // console.log('ITEMS ', this.itemsToGraphModel);
  },
};
</script>
