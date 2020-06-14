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
        <v-tab-item v-for="(item, index) in sensorsAPI" :key="`${index}-tab`">
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
  props: ['sensorsData', 'sensorsList'],
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
      sensorsAPI: [],
    };
  },
  methods: {
    itemSelected(graph) {
      const getItem = this.sensorsAPI[this.tab].find((d) => {
        return d.id === graph.id;
      });
      this.itemsToGraphModel[this.tab] = getItem;
      this.responsiveCharts = !this.responsiveCharts;
    },
    updateArraySensors({ dataSocket, localSensors }) {
      return localSensors.map((s) => {
        const {
          status: { title },
          data,
        } = s;
        const {
          labels,
          datasets: [
            { label, backgroundColor, borderColor, fill, data: datos },
          ],
        } = data;

        let sensorsData = dataSocket
          .map((sensor) => {
            if (sensor.name === title) {
              datos.push(sensor.val);
              if (datos.length > 30) {
                datos.shift();
                labels.shift();
                const lastItem = this.lodash.last(labels);
                if (lastItem === 60) {
                  labels.push(1);
                } else {
                  labels.push(lastItem + 1);
                }
              }
              return {
                labels,
                datasets: [
                  {
                    label,
                    backgroundColor,
                    borderColor,
                    fill,
                    data: datos,
                  },
                ],
              };
            }
            return null;
          })
          .filter((d) => d !== null);
        sensorsData = { ...sensorsData[0] };
        s.data = sensorsData;
        return s;
      });
    },
    updateData({ sensorsP, sensorsT }) {
      const [pSensors, tSensors] = this.sensorsAPI;

      const pUpdatedSensors = this.updateArraySensors({
        dataSocket: sensorsP,
        localSensors: pSensors,
      });

      const tUpdatedSensors = this.updateArraySensors({
        dataSocket: sensorsT,
        localSensors: tSensors,
      });
      this.sensorsAPI = [pUpdatedSensors, tUpdatedSensors];
    },
  },
  watch: {
    tab(tabSelect) {
      this.responsiveCharts = !this.responsiveCharts;
      this.unit = this.unitToGraph[tabSelect].tag;
      this.time = this.unitsTimeToGraph[tabSelect].tag;
    },
    sensorsData({ sensorsP, sensorsT }) {
      if (this.sensorsAPI.length > 0) {
        // console.log(this.sesorsAPI);
        this.updateData({ sensorsP, sensorsT });
      }
    },
  },
  beforeMount() {
    const { sensorsP, sensorsT } = this.sensorsList;

    this.sensorsAPI = [
      this.createArrayToGraph(sensorsP),
      this.createArrayToGraph(sensorsT),
    ];
    const [forTabOne] = this.sensorsAPI[0];
    const [forTabTwo] = this.sensorsAPI[1];
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
    this.sensorsToSelect[0] = sensorsP.map(({ id, name }) => {
      return {
        id,
        name,
      };
    });
    this.sensorsToSelect[1] = sensorsT.map(({ id, name }) => {
      return {
        id,
        name,
      };
    });
  },
};
</script>
