<template>
  <v-card class="mx-auto" max-width="320" tile>
    <v-list three-line dense>
      <v-subheader>TESTS</v-subheader>
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
              v-text="`Op: ${test.operator.name}`"
            ></v-list-item-subtitle>
            <v-list-item-subtitle
              v-text="`Int: ${test.instrumentalist.name}`"
            ></v-list-item-subtitle>
            <v-list-item-subtitle
              v-text="$moment(test.createdAt).format('DD/MM/YYYY HH:mm')"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon @click="deleteItem(test)">mdi-delete</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: 'TestCard',
  props: ['testList'],
  data() {
    return {
      itemSelected: null,
      testInternalList: [],
      max25chars: (v) => v.length <= 25 || 'Input too long!',
    };
  },
  methods: {
    save(data) {
      // console.log(data);
      this.$emit('testToEdit', data);
    },
    deleteItem(data) {
      this.$emit('testToDelete', data);
    },
  },
  watch: {
    testList() {
      this.testInternalList = this.testList;
    },
  },
};
</script>
