<template>
  <v-container class="grey lighten-5" :fluid="false">
    <v-card>
      <!-- Titulo -->
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3">All - {{ items[tab] }}</h1>
      </v-card-title>
      <!-- Cabeceras de los tabs -->
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <!-- Contenedor de los tabs -->
      <v-tabs-items v-model="tab">
        <!-- contenidos del tab -->
        <v-tab-item
          v-for="(itemTab, index) in tabsSelect"
          :key="`${index}-tab`"
        >
          <v-container class="grey lighten-5" :fluid="false">
            <!-- Pagination -->
            <div class="text-center">
              <v-pagination
                v-if="itemTab.length > 2"
                v-model="page[tab]"
                :length="Math.floor(itemTab.length / 2) + 1"
                circle
              ></v-pagination>
            </div>
            <v-row justify="center">
              <v-col
                cols="6"
                v-for="(chart, idx) in chunkGraphs(itemTab, page[tab] - 1)"
                :key="`${idx}-chart`"
              >
                <cstm-line
                  :chartDataToGraph="chart.data"
                  :defaultStatus="chart.status"
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
  name: 'All',
  mixins: [dataDefaultMix],
  components: {
    'cstm-line': LineCustom,
  },
  data() {
    return {
      tab: 0,
      page: [1, 1],
      items: ['Pressure', 'Temperature'],
      responsiveCharts: true,
    };
  },
  methods: {
    // dividir el arreglo en grupos de a 2 y sobrantes
    chunkGraphs(charts, page) {
      const chunkIt = this.lodash.chunk(charts, 2);
      // console.log(charts);
      return chunkIt[page];
    },
  },
  watch: {
    // watcher para el cambio de tab
    tab() {
      this.responsiveCharts = !this.responsiveCharts;
    },
  },
  beforeMount() {
    /* 
       Acciones para variables de inicio 
       antes de que el componente sea montado a la vista.
    */
    // this.unit = this.unitToGraph[this.tab].tag;
    // this.time = this.unitsTimeToGraph[this.tab].tag;
  },
};
</script>
