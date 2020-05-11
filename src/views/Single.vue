<template>
  <v-container class="grey lighten-5" :fluid="false">
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3">Single - {{ items[tab] }}</h1>
      </v-card-title>
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in tabsSelect" :key="`${index}-tab`">
          <v-container class="grey lighten-5" :fluid="false">
            <v-row justify="space-around">
              <v-col cols="12">
                <cstm-line
                  :chartDataToGraph="itemsToGraphModel[tab].data"
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
      this.itemsToGraphModel[this.tab] = this.tabsSelect[this.tab].find((d) => {
        return d.id === graph.id;
      });
      this.responsiveCharts = !this.responsiveCharts;
      // console.log(getToGraph);
      // this.itemsToGraph[this.tab] = graph;
    },
  },
  watch: {
    tab(tabSelect) {
      this.responsiveCharts = !this.responsiveCharts;
      this.unit = this.unitToGraph[tabSelect].tag;
      this.time = this.unitsTimeToGraph[tabSelect].tag;
    },
  },
  beforeMount() {
    /* 
       Acciones para variables de inicio 
       antes de que el componente sea montado a la vista.
    */
    const [pSensors, tSensors] = this.tabsSelect;
    const [forTabOne] = pSensors;
    const [forTabTwo] = tSensors;
    this.itemsToGraphModel[0] = forTabOne;
    this.itemsToGraphModel[1] = forTabTwo;
    this.sensorsDefaultToGraph[0] = { id: forTabOne.id, name: forTabOne.name };
    this.sensorsDefaultToGraph[1] = { id: forTabTwo.id, name: forTabTwo.name };
    this.unit = this.unitToGraph[this.tab].tag;
    this.time = this.unitsTimeToGraph[this.tab].tag;
    this.sensorsToSelect[0] = pSensors.map(({ id, name }) => {
      return {
        id,
        name,
      };
    });
    this.sensorsToSelect[1] = tSensors.map(({ id, name }) => {
      return {
        id,
        name,
      };
    });
  },
};
</script>
