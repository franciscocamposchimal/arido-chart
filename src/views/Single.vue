<template>
  <v-container class="grey lighten-5" :fluid="false">
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3">Single - {{ items[tab] }}</h1>
      </v-card-title>
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in tabsSelect" :key="`${index}-tab`">
          <v-container class="grey lighten-5" :fluid="false">
            <v-row justify="space-around">
              <v-col cols="12">
                <v-card class="pa-2" outlined tile elevation="4">
                  <v-card-text>
                    <v-row no-gutters>
                      <v-col cols="3">
                        {{ itemToGraph.status.title }}
                        <v-icon :color="itemToGraph.status.color">{{ itemToGraph.status.icon }}</v-icon>
                      </v-col>
                      <v-col cols="3">
                        <v-select
                          :items="item"
                          label="Sensors"
                          dense
                          outlined
                          item-text="name"
                          item-value="id"
                          return-object
                          @change="itemSelected"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text>Descargar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "Single",
  data() {
    return {
      tab: null,
      items: ["Temperature", "Pressure"],
      itemToGraph: {
        status: {
          title: "Offline",
          icon: "mdi-flash-alert",
          color: "red"
        }
      },
      tabsSelect: [
        [
          {
            id: 1,
            name: "Sensor T1",
            status: {
              title: "Offline",
              icon: "mdi-flash-alert",
              color: "red"
            }
          },
          {
            id: 2,
            name: "Sensor T2",
            status: {
              title: "Online",
              icon: "mdi-flash",
              color: "green"
            }
          },
          {
            id: 3,
            name: "Sensor T3",
            status: {
              title: "Offline",
              icon: "mdi-flash-alert",
              color: "red"
            }
          }
        ],
        [
          {
            id: 1,
            name: "Sensor P1",
            status: {
              title: "Offline",
              icon: "mdi-flash-alert",
              color: "red"
            }
          },
          {
            id: 2,
            name: "Sensor P2",
            status: {
              title: "Online",
              icon: "mdi-flash",
              color: "green"
            }
          },
          {
            id: 3,
            name: "Sensor P3",
            status: {
              title: "Offline",
              icon: "mdi-flash-alert",
              color: "red"
            }
          }
        ]
      ]
    };
  },
  methods: {
    itemSelected({ status }) {
      // console.log(status);
      this.itemToGraph.status = { ...status };
    }
  },
  watch: {
    tab() {
      // console.log(tabSelect);
      this.itemToGraph.status = {
        title: "Offline",
        icon: "mdi-flash-alert",
        color: "red"
      };
    }
  }
};
</script>