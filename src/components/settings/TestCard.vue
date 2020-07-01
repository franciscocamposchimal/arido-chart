<template>
  <v-card class="mx-auto" max-width="320" tile>
    <v-list three-line dense>
      <v-subheader>TESTS</v-subheader>
      <v-divider></v-divider>
      <v-list-item-group v-model="selectedItem">
        <v-virtual-scroll
          :items="testInternalList"
          :item-height="80"
          height="300"
        >
          <template v-slot="{ item }">
            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon>mdi-clipboard-list</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <v-edit-dialog
                    :return-value.sync="item.name"
                    @save="save(item)"
                  >
                    {{ item.name }}
                    <template v-slot:input>
                      <v-text-field
                        v-model="item.name"
                        :rules="[max25chars]"
                        label="Edit"
                        single-line
                        counter
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </v-list-item-title>
                <v-list-item-subtitle
                  v-text="
                    `Init: ${$moment(item.dateInit, 'DD/MM/YYYY HH:mm').format(
                      'DD/MM/YYYY HH:mm',
                    )}`
                  "
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-text="
                    `End: ${
                      checkDate(item.dateEnd)
                        ? 'In progress..'
                        : $moment(item.dateEnd, 'DD/MM/YYYY HH:mm').format(
                            'DD/MM/YYYY HH:mm',
                          )
                    }`
                  "
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon
                  color="green"
                  :disabled="checkDate(item.dateEnd)"
                  @click="fetchData({ name: item.name, id: item.id })"
                >
                  {{ isDownload ? 'mdi-file-download' : 'mdi-microsoft-excel' }}
                </v-icon>
                <v-icon
                  @click="deleteItem(item)"
                  :disabled="checkDate(item.dateEnd)"
                >
                  {{
                    checkDate(item.dateEnd) ? 'mdi-delete-off' : 'mdi-delete'
                  }}
                </v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import XLSX from 'xlsx';
// import XLSXChart from 'xlsx-chart';

export default {
  name: 'TestCard',
  props: ['testList'],
  data() {
    return {
      testInternalList: [],
      max25chars: (v) => v.length <= 25 || 'Name too long!',
      json_fields: {
        date: 'Date time',
        s1: 'Sensor 1',
        s2: 'Sensor 2',
        s3: 'Sensor 3',
        s4: 'Sensor 5',
        s5: 'Sensor 4',
        s6: 'Sensor 6',
      },
      isDownload: false,
      selectedItem: null,
    };
  },
  methods: {
    save(data) {
      // console.log(data);
      this.$emit('testToEdit', data);
    },
    deleteItem(data) {
      if (
        this.$moment(data.dateEnd, 'DD/MM/YYYY HH:mm').format(
          'DD/MM/YYYY HH:mm',
        ) !== 'Fecha invalida'
      ) {
        this.$emit('testToDelete', { table: 'TEST', data });
      }
    },
    checkDate(dateEnd) {
      return (
        this.$moment(dateEnd, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm') ===
        'Fecha invalida'
      );
    },
    async fetchData({ name, id }) {
      this.startDownload();
      await this.$store.dispatch('getExcelData', { id });

      const createRows = this.testEcxelData.map((data) => {
        const item = {};
        const keyList = Object.keys(data);
        keyList.forEach((key) => {
          const getHeader = this.json_fields[key];
          item[getHeader] = data[key];
        });
        return item;
      });
      // console.log(createRows);
      const data = XLSX.utils.json_to_sheet(createRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, 'data');
      XLSX.writeFile(wb, `${name}.xlsx`);
      this.finishDownload();
    },
    startDownload() {
      this.isDownload = true;
    },
    finishDownload() {
      this.isDownload = false;
    },
  },
  computed: {
    ...mapGetters(['testEcxelData']),
  },
  watch: {
    testList() {
      this.testInternalList = this.testList;
    },
  },
  beforeMount() {
    this.testInternalList = this.testList;
  },
};
</script>
