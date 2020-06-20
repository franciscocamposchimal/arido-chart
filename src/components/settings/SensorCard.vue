<template>
  <v-card class="mx-auto" max-width="320" tile>
    <v-list three-line dense>
      <v-subheader>{{ typeSensor || 'NO' }} SENSORS</v-subheader>
      <v-divider></v-divider>
      <v-list-item-group v-model="itemSelected" color="primary">
        <v-list-item
          v-for="sensor in sensorInternalList"
          :key="sensor.id"
          two-line
        >
          <v-list-item-icon>
            <v-icon>mdi-clipboard-pulse</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <v-edit-dialog
                :return-value.sync="sensor.name"
                @save="save(sensor)"
              >
                {{ sensor.name }}
                <template v-slot:input>
                  <v-text-field
                    v-model="sensor.name"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </v-list-item-title>
            <v-list-item-subtitle
              v-text="`tag: ${sensor.tag}`"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: 'SensorCard',
  props: ['cardList', 'typeSensor'],
  data() {
    return {
      itemSelected: null,
      sensorInternalList: [],
      max25chars: (v) => v.length <= 25 || 'Name too long!',
    };
  },
  methods: {
    save(data) {
      this.$emit('sensorToEdit', data);
    },
  },
  beforeMount() {
    this.sensorInternalList = this.cardList;
    // console.log(this.sensorInternalList);
  },
};
</script>
