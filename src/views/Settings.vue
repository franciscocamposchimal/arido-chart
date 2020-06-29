<template>
  <v-container class="grey lighten-5" :fluid="true">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Staff</v-card-title>
          <v-divider></v-divider>
          <v-row justify="center" class="pa-5">
            <v-col cols="6">
              <StaffCard
                title="OPERATORS"
                :staffList="operatorsList"
                @itemToEdit="editStaff"
                @itemToDelete="openModal"
              ></StaffCard>
            </v-col>
            <v-col cols="6">
              <StaffCard
                title="INSTRUMENTALISTS"
                :staffList="instrumentalistsList"
                @itemToEdit="editStaff"
                @itemToDelete="openModal"
              ></StaffCard>
            </v-col>
          </v-row>
          <v-card-title>Utils</v-card-title>
          <v-divider></v-divider>
          <v-row justify="center" class="pa-5">
            <v-col cols="4">
              <SensorCard
                typeSensor="TEMPERATURE"
                :cardList="sensorsList.sensorsT"
                @sensorToEdit="editSensor"
              ></SensorCard>
            </v-col>
            <v-col cols="4">
              <SensorCard
                typeSensor="PRESSURE"
                :cardList="sensorsList.sensorsP"
                @sensorToEdit="editSensor"
              ></SensorCard>
            </v-col>
            <v-col cols="4">
              <TestCard
                :testList="testList"
                @testToDelete="openModal"
              ></TestCard>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <DeleteModal
      :isOpen="isOpenDelete"
      :itemToDelete="itemToDeleteConfirm"
      @closeModal="modalDeleteHandler"
    />
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import StaffCard from '../components/settings/StaffCard.vue';
import TestCard from '../components/settings/TestCard.vue';
import SensorCard from '../components/settings/SensorCard.vue';
import DeleteModal from '../components/settings/DeleteModal.vue';

export default {
  name: 'Settings',
  components: {
    TestCard,
    StaffCard,
    SensorCard,
    DeleteModal,
  },
  data() {
    return {
      isOpenDelete: false,
      itemToDeleteConfirm: {
        table: 'NO TABLE',
        data: {
          name: '',
        },
      },
      operatorSelected: null,
      instrumentalistsSelected: null,
      max25chars: (v) => v.length <= 25 || 'Input too long!',
    };
  },
  methods: {
    ...mapActions([
      'deleteOp',
      'getTests',
      'updateSens',
      'deleteInst',
      'deleteTest',
      'getOperators',
      'updateOperator',
      'getInstrumentaslists',
      'updateInstrumentalist',
    ]),
    modalDeleteHandler({ confirm, itemToDelete }) {
      this.isOpenDelete = false;
      if (confirm) {
        if (itemToDelete.table === 'TEST') {
          this.deleteTestItem({ id: itemToDelete.data.id });
        } else {
          this.deleteStaff(itemToDelete);
        }
      }
    },
    openModal(item) {
      this.itemToDeleteConfirm = item;
      this.isOpenDelete = true;
      // console.log(item);
    },
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
    deleteTestItem({ id }) {
      // console.log(id);
      this.deleteTest({ id });
    },
    editSensor(sens) {
      this.updateSens(sens);
    },
  },
  computed: {
    ...mapGetters([
      'testList',
      'sensorsList',
      'operatorsList',
      'instrumentalistsList',
      'getApiResponse',
    ]),
  },
  mounted() {
    this.getTests();
    this.getOperators();
    this.getInstrumentaslists();
  },
};
</script>
