<template>
  <v-container class="grey lighten-5" :fluid="true">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Staff</v-card-title>
          <v-row justify="center" class="pa-5">
            <v-col cols="6">
              <StaffCard
                title="OPERATORS"
                :staffList="operatorsList"
                @itemToEdit="editStaff"
              ></StaffCard>
            </v-col>
            <v-col cols="6">
              <StaffCard
                title="INSTRUMENTALISTS"
                :staffList="instrumentalistsList"
                @itemToEdit="editStaff"
              ></StaffCard>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import StaffCard from '../components/settings/StaffCard.vue';

export default {
  name: 'Settings',
  components: {
    StaffCard,
  },
  data() {
    return {
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      operatorSelected: null,
      instrumentalistsSelected: null,
    };
  },
  methods: {
    ...mapActions([
      'getOperators',
      'getInstrumentaslists',
      'updateOperator',
      'updateInstrumentalist',
    ]),
    editStaff({ table, data: { id, name } }) {
      if (table === 'OPERATORS') this.updateOperator({ id, name });
      if (table === 'INSTRUMENTALISTS')
        this.updateInstrumentalist({ id, name });
      // console.log(staff);
    },
  },
  computed: {
    ...mapGetters(['operatorsList', 'instrumentalistsList']),
  },
  mounted() {
    this.getOperators();
    this.getInstrumentaslists();
  },
};
</script>
