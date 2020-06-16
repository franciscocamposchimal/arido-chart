<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Test</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="nameTest"
                label="Test name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-datetime-picker
                dateFormat="yyyy-MM-dd"
                timeFormat="HH:mm"
                label="Datetime"
                v-model="datetime"
              ></v-datetime-picker>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="opModel"
                :items="opList"
                item-text="name"
                :return-object="true"
                dense
                filled
                label="Operator"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="instModel"
                :items="instList"
                item-text="name"
                :return-object="true"
                dense
                filled
                label="Instrumentalist"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-container class="grey lighten-3 rounded-tl-xl">
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
                      v-model="sensorsTSelected"
                      :value="sensor.id"
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
                      v-model="sensorsPSelected"
                      :value="sensor.id"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Close</v-btn>
        <v-btn color="blue darken-1" text @click="close">Start test</v-btn>
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
      nameTest: null,
      datetime: new Date(),
      opModel: null,
      instModel: null,
      selectAllT: false,
      selectAllP: false,
      sensorsTSelected: [],
      sensorsPSelected: [],
    };
  },
  methods: {
    close() {
      this.clearForm();
      this.$emit('closeDialog', false);
    },
    clearForm() {
      this.nameTest = null;
      this.datetime = null;
      this.opModel = null;
      this.instModel = null;
      this.selectAllT = false;
      this.selectAllP = false;
      this.sensorsTSelected = [];
      this.sensorsPSelected = [];
    },
  },
  computed: {
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
        this.sensorsTSelected = sensorsT.map(({ id }) => id);
        // sensorsT.forEach((s) => console.log(s.id));
      } else {
        this.sensorsTSelected = [];
      }
    },
    selectAllP(isSelected) {
      const { sensorsP } = this.sensorsArr;

      if (isSelected) {
        this.sensorsPSelected = sensorsP.map(({ id }) => id);
        // sensorsT.forEach((s) => console.log(s.id));
      } else {
        this.sensorsPSelected = [];
      }
    },
  },
};
</script>
