<template>
  <v-container class="grey lighten-5" :fluid="false">
    <!-- <pre>{{ tabsSelectApi }}</pre> -->
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h2 class="font-weight-bold display-5">{{ items[tab] }}</h2>
      </v-card-title>
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(item, index) in tabsSelectApi"
          :key="`${index}-tab`"
        >
          <v-container class="grey lighten-5" :fluid="false">
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
import { mapActions, mapGetters } from 'vuex';
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
      reactiveDataIncomming: [],
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
      // from API
      tabsSelectApi: [],
    };
  },
  methods: {
    ...mapActions(['getSensors']),
    itemSelected(graph) {
      // console.log(graph);
      const getItem = this.tabsSelectApi[this.tab].find((d) => {
        return d.id === graph.id;
      });
      // console.log(JSON.stringify(getItem));
      this.itemsToGraphModel[this.tab] = getItem;
      this.responsiveCharts = !this.responsiveCharts;
      // console.log(this.itemsToGraphModel);
    },
    reactiveData({ val }) {
      const {
        labels,
        datasets: [{ label, backgroundColor, borderColor, fill, data }],
      } = this.itemsToGraphModel[this.tab].data;

      data.push(val);

      if (data.length > 30) {
        data.shift();
        labels.shift();
        const lastItem = this.lodash.last(labels);
        if (lastItem === 60) {
          labels.push(1);
        } else {
          labels.push(lastItem + 1);
        }
      }

      this.itemsToGraphModel[this.tab].data = {
        labels,
        datasets: [
          {
            label,
            backgroundColor,
            borderColor,
            fill,
            data,
          },
        ],
      };
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
      const [pSensors, tSensors] = this.tabsSelectApi;

      const pUpdatedSensors = this.updateArraySensors({
        dataSocket: sensorsP,
        localSensors: pSensors,
      });

      const tUpdatedSensors = this.updateArraySensors({
        dataSocket: sensorsT,
        localSensors: tSensors,
      });

      // console.log('pUpdatedSensors: ', pUpdatedSensors);
      // console.log('tUpdatedSensors: ', tUpdatedSensors);
      this.tabsSelectApi = [pUpdatedSensors, tUpdatedSensors];
    },
  },
  computed: {
    ...mapGetters(['sensorsList']),
  },
  watch: {
    tab(tabSelect) {
      this.responsiveCharts = !this.responsiveCharts;
      this.unit = this.unitToGraph[tabSelect].tag;
      this.time = this.unitsTimeToGraph[tabSelect].tag;
    },
    sensorsList() {
      // console.log('WATCH: ', this.sensorsList);
      const { sensorsT, sensorsP } = this.sensorsList;
      const sensorsTemp = sensorsT.map(({ id, name, tag }) => {
        return {
          id,
          name,
          status: {
            title: tag,
            icon: 'mdi-flash',
            color: 'green',
          },
          data: {
            labels: this.timeToLabel(1),
            datasets: [this.fillDataZero(tag, 5000000)],
          },
        };
      });
      const sensorsPres = sensorsP.map(({ id, name, tag }) => {
        return {
          id,
          name,
          status: {
            title: tag,
            icon: 'mdi-flash',
            color: 'green',
          },
          data: {
            labels: this.timeToLabel(1),
            datasets: [this.fillDataZero(tag, 5000000)],
          },
        };
      });
      this.tabsSelectApi = [sensorsPres, sensorsTemp];
      // console.log('sensorsList', this.tabsSelectApi);
      // assign to tabs
      const [pSensors, tSensors] = this.tabsSelectApi;
      const [forTabOne] = pSensors;
      const [forTabTwo] = tSensors;
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
  },
  created() {
    this.getSensors();
    // console.log('CREATED: ');
  },
  sockets: {
    SENSORS_DATA({ sensorsP, sensorsT }) {
      if (this.tabsSelectApi) {
        this.updateData({ sensorsP, sensorsT });
      }
    },
  },
};
</script>

/** { date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'), sensorsP: [ {
name: 's5', type: 'p', val: pRandVal() }, { name: 's6', type: 'p', val:
pRandVal() }, { name: 's7', type: 'p', val: pRandVal() } ], sensorsT: [ { name:
's1', type: 't', val: tRandVal() }, { name: 's2', type: 't', val: tRandVal() },
{ name: 's3', type: 't', val: tRandVal() }, { name: 's4', type: 't', val:
tRandVal() } ] } */
