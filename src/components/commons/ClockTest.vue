<template>
  <v-layout justify-center>
    <h2 class="clock">{{ `${hours} : ${minutes} : ${seconds}` }}</h2>
  </v-layout>
</template>
<script>
export default {
  name: 'ClockWatch',
  props: ['dateToChron'],
  data() {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
      dateToUpdate: '',
    };
  },
  methods: {
    updateClock() {
      this.dateToUpdate = this.$moment(this.dateToUpdate, 'HH:mm:ss').add(
        1,
        's',
      );
      this.hours = this.dateToUpdate.format('HH');
      this.minutes = this.dateToUpdate.format('mm');
      this.seconds = this.dateToUpdate.format('ss');
    },
    initClock() {
      // console.log(this.dateToChron);
      const dateToParse = this.$moment(
        this.dateToChron.dateInit,
        'DD/MM/YYYY HH:mm:ss',
      );
      const currentDate = this.$moment()
        .format('DD/MM/YYYY HH:mm:ss')
        .toString();
      const diffDates = this.$moment(currentDate, 'DD/MM/YYYY HH:mm:ss').diff(
        dateToParse,
        'DD/MM/YYYY HH:mm:ss',
      );
      const getTime = this.$moment(
        this.$moment.utc(diffDates).format('HH:mm:ss'),
        'HH:mm:ss',
      );
      this.dateToUpdate = getTime;
      this.hours = getTime.format('HH');
      this.minutes = getTime.format('mm');
      this.seconds = getTime.format('ss');
      this.$options.interval = setInterval(this.updateClock, 1000);
    },
  },
  mounted() {
    // console.log('MOUNT FIRE');
    this.initClock();
  },
  beforeDestroy() {
    console.log('DESTROY FIRE');
    clearInterval(this.$options.interval);
  },
  watch: {
    /* dateToChron() {
      this.initClock();
    }, */
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');

.clock {
  font-family: 'Staatliches', cursive;
}
</style>
