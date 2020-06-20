<template>
  <v-card class="mx-auto" max-width="320" tile>
    <v-list two-line dense>
      <v-subheader>{{ title }}</v-subheader>
      <v-divider></v-divider>
      <v-list-item-group v-model="itemSelected" color="primary">
        <v-list-item
          v-for="staff in staffInternalList"
          :key="staff.id"
          two-line
        >
          <v-list-item-icon>
            <v-icon>mdi-account-hard-hat</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <v-edit-dialog
                :return-value.sync="staff.name"
                @save="save(staff)"
              >
                {{ staff.name }}
                <template v-slot:input>
                  <v-text-field
                    v-model="staff.name"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </v-list-item-title>
            <v-list-item-subtitle
              class="text--primary"
              v-text="`Tests ${staff.tests.length}`"
            ></v-list-item-subtitle>
            <v-list-item-subtitle
              v-text="$moment(staff.createdAt).format('DD/MM/YYYY')"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon @click="deleteItem(staff)">
              {{ staff.tests.length > 0 ? 'mdi-delete-off' : 'mdi-delete' }}
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: 'StaffCard',
  props: ['title', 'staffList'],
  data() {
    return {
      itemSelected: null,
      staffInternalList: [],
      max25chars: (v) => v.length <= 25 || 'Name too long!',
    };
  },
  methods: {
    save(data) {
      // console.log(data);
      this.$emit('itemToEdit', { table: this.title, data });
    },
    deleteItem(data) {
      if (data.tests.length > 0) {
        this.itemSelected = null;
      } else {
        // console.log('DELETE');
        this.$emit('itemToDelete', { table: this.title, data });
      }
    },
  },
  watch: {
    staffList() {
      this.staffInternalList = this.staffList;
    },
  },
};
</script>
