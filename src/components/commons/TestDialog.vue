<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Test</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="testForm" v-model="valid">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="test.name"
                  label="Test name"
                  required
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-datetime-picker
                  dateFormat="yyyy-MM-dd"
                  timeFormat="HH:mm"
                  label="Datetime"
                  v-model="test.dateInit"
                  :date-picker-props="dateProps"
                  :time-picker-props="timeProps"
                  :text-field-props="textFieldProps"
                  rules="required"
                >
                  <template slot="dateIcon">
                    <v-icon>mdi-calendar-text</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>mdi-table-clock</v-icon>
                  </template>
                </v-datetime-picker>
              </v-col>
              <v-col cols="12" sm="6">
                <v-combobox
                  v-model="test.operator.name"
                  :items="opList"
                  :return-object="false"
                  item-text="name"
                  item-value="name"
                  label="Operator"
                  filled
                  dense
                  :rules="comboRules"
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-combobox
                  v-model="test.instrumentalist.name"
                  :items="instList"
                  :return-object="false"
                  item-text="name"
                  item-value="name"
                  label="Instrumentalist"
                  filled
                  dense
                  :rules="comboRules"
                ></v-combobox>
              </v-col>
              <v-col cols="12">
                <v-container class="grey lighten-3">
                  <v-checkbox v-model="selectAllT">
                    <template slot="label">
                      <small><b>Temperature sensors *</b></small>
                    </template>
                  </v-checkbox>
                  <v-row no-gutters>
                    <v-col
                      v-for="(sensorsT, index) in sensorsData.sensorsT"
                      :key="`stcol-${index}`"
                      cols="6"
                    >
                      <v-checkbox
                        v-for="(sensor, index) in sensorsT"
                        :key="`st-${index}`"
                        :label="sensor.name"
                        v-model="test.sensorsTSelected"
                        :value="sensor.id"
                        :rules="checkBoxRules"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col cols="12">
                <v-container class="grey lighten-3">
                  <v-checkbox v-model="selectAllP">
                    <template slot="label">
                      <small><b>Pressure sensors *</b></small>
                    </template>
                  </v-checkbox>
                  <v-row no-gutters>
                    <v-col
                      v-for="(sensorsP, index) in sensorsData.sensorsP"
                      :key="`spcol-${index}`"
                      cols="6"
                    >
                      <v-checkbox
                        v-for="(sensor, index) in sensorsP"
                        :key="`sp-${index}`"
                        :label="sensor.name"
                        v-model="test.sensorsPSelected"
                        :value="sensor.id"
                        :rules="checkBoxRules"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="close">Close</v-btn>
        <v-btn color="blue darken-1" text @click="sendTest">Start test</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'TestDialog',
  props: {
    dialog: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    opList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    instList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    sensorsArr: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      valid: true,
      comboRules: [(v) => !!v || 'Not empty'],
      nameRules: [(v) => !!v || 'Name not empty'],
      test: {
        name: null,
        dateInit: new Date(),
        operator: {
          name: null,
        },
        instrumentalist: {
          name: null,
        },
        sensorsTSelected: [],
        sensorsPSelected: [],
      },
      selectAllT: false,
      selectAllP: false,
      dateProps: {
        headerColor: 'red',
      },
      timeProps: {
        ampmInTitle: true,
        dark: true,
      },
      textFieldProps: {
        rules: [(v) => !!v || 'Date not empty'],
      },
    };
  },
  methods: {
    close() {
      this.clearForm();
      this.$emit('closeDialog', false);
    },
    sendTest() {
      if (this.$refs.testForm.validate()) {
        const testTocreate = { ...JSON.parse(JSON.stringify(this.test)) };
        testTocreate.dateInit = this.$moment(testTocreate.dateInit).format(
          'DD/MM/YYYY HH:mm',
        );
        this.clearForm();
        this.$emit('createTest', testTocreate);
      }
    },
    clearForm() {
      this.test = {
        name: null,
        dateInit: new Date(),
        operator: {
          name: null,
        },
        instrumentalist: {
          name: null,
        },
        sensorsTSelected: [],
        sensorsPSelected: [],
      };
      this.selectAllT = false;
      this.selectAllP = false;
    },
  },
  computed: {
    checkBoxRules() {
      return [
        this.test.sensorsTSelected.length > 0 ||
          this.test.sensorsPSelected.length > 0 ||
          'One should be selected',
      ];
    },
    sensorsData() {
      if (this.sensorsArr) {
        let { sensorsP, sensorsT } = this.sensorsArr;
        sensorsP = this.lodash.chunk(sensorsP, 2);
        sensorsT = this.lodash.chunk(sensorsT, 2);
        return { sensorsP, sensorsT };
      }
      return {
        sensorsP: [],
        sensorsT: [],
      };
    },
  },
  watch: {
    selectAllT(isSelected) {
      const { sensorsT } = this.sensorsArr;

      if (isSelected) {
        this.test.sensorsTSelected = sensorsT.map(({ id }) => id);
        // sensorsT.forEach((s) => console.log(s.id));
      } else {
        this.test.sensorsTSelected = [];
      }
    },
    selectAllP(isSelected) {
      const { sensorsP } = this.sensorsArr;

      if (isSelected) {
        this.test.sensorsPSelected = sensorsP.map(({ id }) => id);
        // sensorsT.forEach((s) => console.log(s.id));
      } else {
        this.test.sensorsPSelected = [];
      }
    },
    dialog(isOpen) {
      if (isOpen) {
        this.test.dateInit = new Date();
      }
    },
  },
};
</script>
