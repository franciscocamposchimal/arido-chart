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
              <v-text-field label="Test name" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-datetime-picker
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
              <v-container class="grey lighten-5">
                <small>Temperature sensors *</small>
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
            <v-col cols="12">
              <v-container class="grey lighten-5">
                <small>Pressure sensors *</small>
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
  },
  data() {
    return {
      datetime: null,
      opModel: null,
      instModel: null,
    };
  },
  methods: {
    close() {
      this.$emit('closeDialog', false);
    },
  },
};
</script>
