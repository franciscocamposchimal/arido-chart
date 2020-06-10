/* eslint-disable */
import { mapActions, mapGetters } from 'vuex';

export const dataDefaultMix = {
  data() {
    return {
      // datos por tabs de selects
      unitsTimeToGraph: [
        {
          tag: 'min',
          name: '(min) Minutes',
        },
        {
          tag: 'min',
          name: '(min) Minutes',
        },
      ],
      unitToGraph: [
        {
          tag: 'PSI',
          name: '(PSI) Pounds per square inch',
        },
        {
          tag: 'ºC',
          name: '(ºC) Celsius',
        },
      ],
      // selects para el tiempo
      unitsTimeToSelect: [
        {
          tag: 'min',
          name: '(min) Minutes',
        },
        {
          tag: 'seg',
          name: '(s) Seconds',
        },
        {
          tag: 'hr',
          name: '(hr) Hours',
        },
      ],
      // select para unidades de presion o temp.
      unitsToSelect: [
        [
          {
            tag: 'PSI',
            name: '(PSI) Pounds per square inch',
          },
          {
            tag: 'PA',
            name: '(PA) Pascal',
          },
          {
            tag: 'MPa',
            name: '(MPa) Megapascal',
          },
        ],
        [
          {
            tag: 'ºC',
            name: '(ºC) Celsius',
          },
          {
            tag: 'ºF',
            name: '(ºF) Fahrenheit',
          },
        ],
      ],
      // datos a graficar por tab
      tabsSelect: [
        [
          ...Array.from(Array(3), (x, idx) => {
            return {
              id: idx + 1,
              name: `Sensor P${idx + 1}`,
              status: {
                title: `SP${idx + 1}`,
                icon: 'mdi-flash',
                color: idx % 2 ? 'green' : 'red',
              },
              data: {
                labels: this.timeToLabel(1),
                datasets: [this.fillData(`SP${idx + 1}`, 1, 5000000)],
              },
            };
          }),
        ],
        [
          ...Array.from(Array(5), (x, idx) => {
            return {
              id: idx + 1,
              name: `Sensor T${idx + 1}`,
              status: {
                title: `ST${idx + 1}`,
                icon: 'mdi-flash',
                color: idx % 2 ? 'green' : 'red',
              },
              data: {
                labels: this.timeToLabel(1),
                datasets: [this.fillData(`ST${idx + 1}`, 1, 5000000)],
              },
            };
          }),
        ],
      ],
      tabsSelectReactive: [
        [
          ...Array.from(Array(3), (x, idx) => {
            return {
              id: idx + 1,
              name: `Sensor P${idx + 1}`,
              status: {
                title: `SP${idx + 1}`,
                icon: 'mdi-flash',
                color: idx % 2 ? 'green' : 'red',
              },
              data: {
                labels: this.timeToLabel(1),
                datasets: [this.fillDataZero(`SP${idx + 1}`, 5000000)],
              },
            };
          }),
        ],
        [
          ...Array.from(Array(5), (x, idx) => {
            return {
              id: idx + 1,
              name: `Sensor T${idx + 1}`,
              status: {
                title: `ST${idx + 1}`,
                icon: 'mdi-flash',
                color: idx % 2 ? 'green' : 'red',
              },
              data: {
                labels: this.timeToLabel(1),
                datasets: [this.fillDataZero(`ST${idx + 1}`, 5000000)],
              },
            };
          }),
        ],
      ],
    };
  },
  methods: {
    ...mapActions(['getSensors']),
    // datos random
    fillData(name, hours, colorMax) {
      const hexColor = this.getRandomHexColor(colorMax);
      return {
        label: name,
        backgroundColor: hexColor,
        borderColor: hexColor,
        fill: false,
        data: this.getRandomInt(hours, 100, 500),
      };
    },
    fillDataZero(name, colorMax) {
      const hexColor = this.getRandomHexColor(colorMax);
      return {
        label: name,
        backgroundColor: hexColor,
        borderColor: hexColor,
        fill: false,
        data: [],
      };
    },
    getRandomInt(hours, min, max) {
      const toMinutes = Math.floor(hours * 60);
      const timeList = Array.from(Array(toMinutes), () =>
        Math.floor(Math.random() * (max - min) + min),
      );
      // console.log(timeList);
      return timeList;
    },
    timeToLabel(hours) {
      const toMinutes = Math.floor(hours * 60) / 2;
      // const toSeconds = Math.floor(hours * 60 * 60);
      const minutesList = Array.from(Array(toMinutes), (x, index) => index + 1);
      // console.log(minutesList);
      return minutesList;
    },
    getRandomHexColor(colorMax) {
      // 1000000
      const n = (Math.random() * 0xfffff * colorMax).toString(16);
      return `#${n.slice(0, 6)}`;
    },
  },
  computed: {
	...mapGetters(['sensorsList']),
  },
  mounted() {
    this.getSensors();
  },
  watch: {
    sensorsList({ sensorsT, sensorsP }) {
        const sensorsTemp = sensorsT.map(({ id, name, tag }) => {
          return {
            id,
            name,
            status: {
              title: tag,
              icon: 'mdi-flash',
              color: 'green',
            },
            data: {
              labels: this.timeToLabel(1),
              datasets: [this.fillDataZero(tag, 5000000)],
            },
          };
        });
        const sensorsPres = sensorsP.map(({ id, name, tag }) => {
          return {
            id,
            name,
            status: {
              title: tag,
              icon: 'mdi-flash',
              color: 'green',
            },
            data: {
              labels: this.timeToLabel(1),
              datasets: [this.fillDataZero(tag, 5000000)],
            },
          };
        });
        console.log('sensorsList');
        this.tabsSelectReactive = [sensorsTemp, sensorsPres];
    },
  },
};
