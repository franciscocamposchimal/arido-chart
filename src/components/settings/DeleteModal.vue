<template>
  <v-dialog v-model="isOpen" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        {{ itemToDelete.table }}
      </v-card-title>
      <v-card-text>
        Are you sure to delete {{ itemToDelete.data.name }} ?
        <!-- <pre>{{ itemToDelete }}</pre> -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          @click="modalHandler({ confirm: false })"
        >
          Close
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="modalHandler({ confirm: true })"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'DeleteModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    itemToDelete: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    modalHandler({ confirm }) {
      this.$emit('closeModal', { confirm, itemToDelete: this.itemToDelete });
    },
  },
};
</script>
