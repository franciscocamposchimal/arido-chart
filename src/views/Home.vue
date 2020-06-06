<template>
  <v-container class="grey lighten-5" :fluid="true">
    <v-row>
      <v-col cols="12" no-gutters>
        <v-card>
          <v-card-title>Temperature sensors</v-card-title>
          <v-row justify="center" class="pa-5">
            <v-col
              cols="3"
              v-for="(item, index) in sensorsT"
              :key="`t-${index}`"
            >
              <TempSensorCard
                :sensor="item"
                :date="currentDate"
              ></TempSensorCard>
            </v-col>
          </v-row>
          <v-card-title>Pressure sensors</v-card-title>
          <v-row justify="center" class="pa-5">
            <v-col
              cols="3"
              v-for="(item, index) in sensorsP"
              :key="`p-${index}`"
            >
              <PreSensorCard :sensor="item" :date="currentDate"></PreSensorCard>
            </v-col>
          </v-row>
          <v-card-title>Create test</v-card-title>
          <v-form>
            <v-row justify="start" class="pa-5">
              <v-col cols="6">
                <v-row>
                  <v-col cols="6">
                    <v-text-field label="Test name" required></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-datetime-picker
                      label="Datetime"
                      v-model="datetime"
                    ></v-datetime-picker>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Operator" required></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Instrumentalist"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-btn color="secondary">
                      Start test
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row no-gutters>
                  <v-col cols="6">
                    <v-container class="grey lighten-5">
                      <p>Temperature sensors</p>
                      <v-row no-gutters>
                        <v-col cols="6">
                          <v-checkbox label="sensor S1"></v-checkbox>
                          <v-checkbox label="sensor S2"></v-checkbox>
                        </v-col>
                        <v-col cols="6">
                          <v-checkbox label="sensor S3"></v-checkbox>
                          <v-checkbox label="sensor S4"></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col cols="6">
                    <v-container>
                      <p>Pressure sensors</p>
                      <v-row no-gutters>
                        <v-col cols="6">
                          <v-checkbox label="sensor S5"></v-checkbox>
                          <v-checkbox label="sensor S6"></v-checkbox>
                        </v-col>
                        <v-col cols="6">
                          <v-checkbox label="sensor S7"></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TempSensorCard from '../components/dashboard/TempSensorCard.vue';
import PreSensorCard from '../components/dashboard/PreSensorCard.vue';

export default {
  name: 'Home',
  components: {
    TempSensorCard,
    PreSensorCard,
  },
  data() {
    return {
      datetime: null,
      menu2: false,
      currentDate: '',
      sensorsT: [],
      sensorsP: [],
    };
  },
  methods: {},
  sockets: {
    SENSORS_DATA(data) {
      this.currentDate = data.date;
      this.sensorsT = data.sensorsT;
      this.sensorsP = data.sensorsP;
    },
  },
};
</script>
