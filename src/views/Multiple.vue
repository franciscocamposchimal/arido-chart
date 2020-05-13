<template>
  <v-container class="grey lighten-5" :fluid="false">
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3">Multiple - {{ items[tab] }}</h1>
      </v-card-title>
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in itemsToGraph" :key="`${index}-tab`">
          <v-container class="grey lighten-5" :fluid="false">
            <v-row justify="space-around">
              <v-col cols="12">
                <cstm-line
                  :chartData="itemsToGraph[tab].data"
                  :defaultStatus="itemsToGraph[tab].status"
                  :unitModelToSelect="unitToGraph[tab]"
                  :unitsTimeModelToSelect="unitsTimeToGraph[tab]"
                  :unitSelect="unitsToSelect[tab]"
                  :unitTimeSelect="unitsTimeToSelect"
                  :responsiveChart="responsiveCharts"
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
      // datos por tab de grafica.
      itemsToGraph: [
        {
          id: 1,
          name: 'Pressure sensors',
          status: {
            title: 'Online',
            icon: 'mdi-flash',
            color: '',
          },
          data: {
            labels: this.timeToLabel(1),
            datasets: [],
          },
        },
        {
          id: 2,
          name: 'Temperature sensors',
          status: {
            title: 'Online',
            icon: 'mdi-flash',
            color: '',
          },
          data: {
            labels: this.timeToLabel(1),
            datasets: [],
          },
        },
      ],
    };
  },
  methods: {},
  watch: {
    // watcher para el cambio de tab
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
    const [forTabOne, forTabTwo] = this.tabsSelect;
    this.itemsToGraph[0].data.datasets = forTabOne.map(
      ({
        data: {
          datasets: [getData],
        },
      }) => {
        return getData;
      },
    );
    this.itemsToGraph[1].data.datasets = forTabTwo.map(
      ({
        data: {
          datasets: [getData],
        },
      }) => {
        return getData;
      },
    );
    this.unit = this.unitToGraph[this.tab].tag;
    this.time = this.unitsTimeToGraph[this.tab].tag;
  },
};
</script>
