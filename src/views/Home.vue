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
              <v-card
                :color="
                  item.val < 30
                    ? '#26c6da'
                    : item.val < 60
                    ? '#FFF9C4'
                    : '#FF3D00'
                "
                :dark="item.val < 30 ? true : false"
                elevation="5"
              >
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline">
                      Sensor {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ currentDate }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-text>
                  <v-row align="center">
                    <v-col class="display-1" cols="6">
                      {{ item.val }}&deg;C
                    </v-col>
                    <v-col cols="6">
                      <v-img src="@/assets/temp-t.png" width="80"></v-img>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-card-title>Pressure sensors</v-card-title>
          <v-row justify="center" class="pa-5">
            <v-col
              cols="3"
              v-for="(item, index) in sensorsP"
              :key="`p-${index}`"
            >
              <v-card color="#26c6da" :dark="true" elevation="5">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline">
                      Sensor {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ currentDate }}
                    </v-list-item-subtitle>
                    <v-divider></v-divider>
                  </v-list-item-content>
                </v-list-item>
                <v-card-text>
                  <v-row align="center">
                    <v-col class="display-1" cols="6">{{ item.val }}Pa</v-col>
                    <v-col cols="6">
                      <v-img src="@/assets/pre-t.png" width="90"></v-img>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon :color="item.val < 151 ? 'green accent-3' : ''">
                      {{
                        151 > item.val
                          ? 'mdi-alarm-light'
                          : 'mdi-alarm-light-outline'
                      }}
                    </v-icon>
                    <v-icon
                      :color="item.val > 150 && item.val < 251 ? 'yellow' : ''"
                    >
                      {{
                        item.val > 150 && 251 > item.val
                          ? 'mdi-alarm-light'
                          : 'mdi-alarm-light-outline'
                      }}
                    </v-icon>
                    <v-icon
                      :color="item.val > 250 && item.val < 501 ? 'red' : ''"
                    >
                      {{
                        item.val > 250 && 501 > item.val
                          ? 'mdi-alarm-light'
                          : 'mdi-alarm-light-outline'
                      }}
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-card>
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
      <!--
      <v-col cols="12">
        <v-row justify="space-around" align="center">
          <v-col :cols="this.$vuetify.breakpoint.sm ? 12 : 6">
            <v-card class="pa-2" outlined tile elevation="4">
              <v-img :src="require('@/assets/argosLogo.svg')"></v-img>
            </v-card>
          </v-col>
          <v-col :cols="this.$vuetify.breakpoint.sm ? 12 : 6">
            <v-card class="pa-2" outlined tile elevation="4">
              <v-img :src="require('@/assets/aridoLogoCompleto.png')"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {},
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
