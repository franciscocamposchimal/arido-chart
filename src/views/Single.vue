<template>
  <v-container class="grey lighten-5" :fluid="true">
    <!-- <pre>{{ tabsSelectApi }}</pre> -->
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h2 class="font-weight-bold display-5">{{ items[tab] }}</h2>
      </v-card-title>
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in sensorsList" :key="`${index}-tab`">
          <v-container class="grey lighten-5" :fluid="true">
            <v-row justify="space-around">
              <v-col cols="12">
                <cstm-line
                  :chartData="itemsToGraphModel[tab].data"
                  :defaultStatus="itemsToGraphModel[tab].status"
                  :sensorModelToSelect="sensorsDefaultToGraph[tab]"
                  :unitModelToSelect="unitToGraph[tab]"
                  :unitsTimeModelToSelect="unitsTimeToGraph[tab]"
                  :sensorsSelect="sensorsToSelect[tab]"
                  :unitSelect="unitsToSelect[tab]"
                  :unitTimeSelect="unitsTimeToSelect"
                  :responsiveChart="responsiveCharts"
                  @sensorSelected="itemSelected"
                ></cstm-line>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>
<script>
import LineCustom from '@/graphics/LineCustom.vue';
import { dataDefaultMix } from '@/mixins/dataMixin';
// :width="300" :height="300"
export default {
  name: 'Single',
  props: ['sensorsList'],
  mixins: [dataDefaultMix],
  components: {
    'cstm-line': LineCustom,
  },
  data() {
    return {
      tab: 0,
      unit: '',
      time: '',
      items: ['Pressure', 'Temperature'],
      responsiveCharts: true,
      itemsToGraphModel: [
        ...Array.from(Array(2), () => {
          return {
            status: {},
            data: {},
          };
        }),
      ],
      // default model for sensor
      sensorsDefaultToGraph: [{}, {}],
      // select para los sensores
      sensorsToSelect: [[], []],
    };
  },
  methods: {
    itemSelected(graph) {
      const getItem = this.sensorsList[this.tab].find((d) => {
        return d.id === graph.id;
      });
      this.itemsToGraphModel[this.tab] = getItem;
      this.responsiveCharts = !this.responsiveCharts;
    },
    updateArraySensors({ dataSocket, localSensors }) {
      // console.log('SENSORS: ', dataSocket);
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

        s.data = {
          datasets,
        };
        // console.log('FIND: ', findDataSocket);
        return s;
      });
    },
    updateData({ sensorsP, sensorsT }) {
      const [pSensors, tSensors] = this.sensorsToSelect;

      const pUpdatedSensors = this.updateArraySensors({
        dataSocket: sensorsP,
        localSensors: pSensors,
      });

      const tUpdatedSensors = this.updateArraySensors({
        dataSocket: sensorsT,
        localSensors: tSensors,
      });
      this.sensorsToSelect = [pUpdatedSensors, tUpdatedSensors];
      // console.log(this.sensorsToSelect );
    },
  },
  watch: {
    tab(tabSelect) {
      this.responsiveCharts = !this.responsiveCharts;
      this.unit = this.unitToGraph[tabSelect].tag;
      this.time = this.unitsTimeToGraph[tabSelect].tag;
    },
    sensorsList([sensorsP, sensorsT]) {
      this.updateData({ sensorsP, sensorsT });
      // this.updateArraySensors(sensorsT);
    },
  },
  beforeMount() {
    const [forTabOne] = this.sensorsList[0];
    const [forTabTwo] = this.sensorsList[1];
    this.itemsToGraphModel[0] = forTabOne;
    this.itemsToGraphModel[1] = forTabTwo;
    this.sensorsDefaultToGraph[0] = {
      id: forTabOne.id,
      name: forTabOne.name,
    };
    this.sensorsDefaultToGraph[1] = {
      id: forTabTwo.id,
      name: forTabTwo.name,
    };
    this.unit = this.unitToGraph[this.tab].tag;
    this.time = this.unitsTimeToGraph[this.tab].tag;

    const [forTabOneG, forTabTwoG] = this.sensorsList;
    this.sensorsToSelect[0] = forTabOneG;
    this.sensorsToSelect[1] = forTabTwoG;
  },
};
</script>
