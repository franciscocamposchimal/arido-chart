<template>
  <v-container class="grey lighten-5" :fluid="true">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Staff</v-card-title>
          <v-row justify="center" class="pa-5">
            <v-col cols="4">
              <StaffCard
                title="OPERATORS"
                :staffList="operatorsList"
                @itemToEdit="editStaff"
                @itemToDelete="deleteStaff"
              ></StaffCard>
            </v-col>
            <v-col cols="4">
              <StaffCard
                title="INSTRUMENTALISTS"
                :staffList="instrumentalistsList"
                @itemToEdit="editStaff"
                @itemToDelete="deleteStaff"
              ></StaffCard>
            </v-col>
            <v-col cols="4">
              <TestCard :testList="testList"></TestCard>
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
import TestCard from '../components/settings/TestCard.vue';

export default {
  name: 'Settings',
  components: {
    TestCard,
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
      'deleteOp',
      'getTests',
      'deleteInst',
      'getOperators',
      'updateOperator',
      'getInstrumentaslists',
      'updateInstrumentalist',
    ]),
    editStaff({ table, data: { id, name } }) {
      if (table === 'OPERATORS') this.updateOperator({ id, name });
      if (table === 'INSTRUMENTALISTS')
        this.updateInstrumentalist({ id, name });
      // console.log(staff);
    },
    deleteStaff({ table, data: { id } }) {
      // console.log(`${table}-${id}`);
      if (table === 'OPERATORS') this.deleteOp({ id });
      if (table === 'INSTRUMENTALISTS') this.deleteInst({ id });
    },
  },
  computed: {
    ...mapGetters(['testList', 'operatorsList', 'instrumentalistsList']),
  },
  mounted() {
    this.getOperators();
    this.getInstrumentaslists();
    this.getTests();
  },
};
</script>
