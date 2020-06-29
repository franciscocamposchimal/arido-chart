<template>
  <v-container class="grey lighten-5" :fluid="true">
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h2 class="font-weight-bold display-5">Pressure & Temperature</h2>
      </v-card-title>
      <v-container class="grey lighten-5" :fluid="true">
        <v-row justify="space-around">
          <v-col cols="12">
            <cstm-line
              :isTwoY="true"
              :chartData="itemsToGraph[0].data"
              :defaultStatus="itemsToGraph[0].status"
              :unitModelToSelect="unitToGraph[0]"
              :unitModelToSelectMulti="unitToGraph[1]"
              :unitsTimeModelToSelect="unitsTimeToGraph[0]"
              :unitSelect="unitsToSelect[0]"
              :unitSelectMulti="unitsToSelect[1]"
              :unitTimeSelect="unitsTimeToSelect"
              @unitSelected="unitSelectedP"
              @unitSelectedMulti="unitSelectedT"
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
  name: 'Single',
  props: ['sensorsList'],
  mixins: [dataDefaultMix],
  components: {
    'cstm-line': LineCustom,
  },
  data() {
    return {
      unitP: 'PSI',
      unitT: 'ºC',
      time: '',
      // datos por tab de grafica.
      itemsToGraph: [
        {
          id: 1,
          name: '',
          status: {
            title: 'Online',
            icon: 'mdi-flash',
            color: '',
          },
          data: {
            // labels: [],
            datasets: [],
          },
        },
      ],
    };
  },
  methods: {
    unitSelectedP({ selectedItem: { tag } }) {
      this.unitP = tag;
      // console.log(selectedItem);
    },
    unitSelectedT({ selectedItem: { tag } }) {
      this.unitT = tag;
      // console.log(this.unitT);
    },
    updateArraySensors({ dataSocket, localSensors }) {
      const {
        data: { datasets },
      } = localSensors;
      // console.log(datasets);
      const newDatasets = datasets.map((s) => {
        const { label /* data: datos */ } = s;

        const findDataSocket = dataSocket.find(({ name }) => name === label);

        let {
          datasets: [{ data: dataSock }],
        } = findDataSocket.data;

        if (this.unitT === 'ºF') {
          const includesT = findDataSocket.name.includes('SensorT');
          if (includesT) dataSock = findDataSocket.units.fSensorList.data;
        }
        if (this.unitT === 'ºC') {
          const includesT = findDataSocket.name.includes('SensorT');
          if (includesT) dataSock = findDataSocket.units.cSensorList.data;
        }

        if (this.unitP === 'PA') {
          const includesP = findDataSocket.name.includes('SensorP');
          if (includesP) dataSock = findDataSocket.units.paSensorList.data;
        }
        if (this.unitP === 'MPa') {
          const includesP = findDataSocket.name.includes('SensorP');
          if (includesP) dataSock = findDataSocket.units.mpaSensorList.data;
        }
        if (this.unitP === 'PSI') {
          const includesP = findDataSocket.name.includes('SensorP');
          if (includesP) dataSock = findDataSocket.units.psiSensorList.data;
        }
        s.data = dataSock;
        return s;
      });

      // console.log('LOCALDATA ', localSensors.data);
      localSensors.data = {
        datasets: newDatasets,
      };
      // console.log('LOCALDATA ', localSensors.data);
      return localSensors;
    },
    updateData({ sensorsP, sensorsT }) {
      // console.log('before itemsToGraph ', this.itemsToGraph);
      const updatedSensors = this.updateArraySensors({
        dataSocket: [...sensorsP, ...sensorsT],
        localSensors: this.itemsToGraph[0],
      });

      this.itemsToGraph[0] = updatedSensors;
      // console.log('after itemsToGraph ', this.itemsToGraph);
    },
  },
  watch: {
    sensorsList([sensorsP, sensorsT]) {
      this.updateData({ sensorsP, sensorsT });
    },
  },
  beforeMount() {
    /* 
       Acciones para variables de inicio 
       antes de que el componente sea montado a la vista.
    */
    const [forTabOne, forTabTwo] = this.sensorsList;
    this.itemsToGraph[0].data.datasets = [
      ...forTabOne.map(
        ({
          name,
          data: {
            datasets: [getData],
          },
        }) => {
          getData.label = name;
          getData.yAxisID = 'y-axis-0';
          // console.log(getData);
          return getData;
        },
      ),
      ...forTabTwo.map(
        ({
          name,
          data: {
            datasets: [getData],
          },
        }) => {
          getData.label = name;
          getData.yAxisID = 'y-axis-1';
          return getData;
        },
      ),
    ];
    // console.log('itemsToGraph: ',this.itemsToGraph);
    // this.unit = this.unitToGraph[0].tag;
    this.time = this.unitsTimeToGraph[0].tag;
  },
};
</script>
