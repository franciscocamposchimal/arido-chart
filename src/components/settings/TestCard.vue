<template>
  <v-card class="mx-auto" max-width="320" tile>
    <v-list three-line dense>
      <v-subheader>TESTS</v-subheader>
      <v-divider></v-divider>
      <v-list-item-group v-model="itemSelected" color="primary">
        <v-list-item v-for="test in testInternalList" :key="test.id" two-line>
          <v-list-item-icon>
            <v-icon>mdi-clipboard-list</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <v-edit-dialog :return-value.sync="test.name" @save="save(test)">
                {{ test.name }}
                <template v-slot:input>
                  <v-text-field
                    v-model="test.name"
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
                `Init: ${$moment(test.dateInit, 'DD/MM/YYYY HH:mm').format(
                  'DD/MM/YYYY HH:mm',
                )}`
              "
            ></v-list-item-subtitle>
            <v-list-item-subtitle
              v-text="
                `End: ${
                  checkDate(test.dateEnd)
                    ? 'In progress..'
                    : $moment(test.dateEnd, 'DD/MM/YYYY HH:mm').format(
                        'DD/MM/YYYY HH:mm',
                      )
                }`
              "
            ></v-list-item-subtitle>
            <!-- <v-list-item-subtitle
              v-text="$moment(test.dateInit, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm')"
            ></v-list-item-subtitle> -->
          </v-list-item-content>
          <v-list-item-action>
            <v-icon
              color="green"
              :disabled="checkDate(test.dateEnd)"
              @click="fetchData({ name: test.name, id: test.id })"
            >
              {{ isDownload ? 'mdi-file-download' : 'mdi-microsoft-excel' }}
            </v-icon>
            <v-icon
              @click="deleteItem(test)"
              :disabled="checkDate(test.dateEnd)"
            >
              {{ checkDate(test.dateEnd) ? 'mdi-delete-off' : 'mdi-delete' }}
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import XLSX from 'xlsx';

export default {
  name: 'TestCard',
  props: ['testList'],
  data() {
    return {
      itemSelected: null,
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
        this.$emit('testToDelete', data);
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
};
</script>
