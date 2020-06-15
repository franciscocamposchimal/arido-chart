/* eslint-disable */

export const methodsGraphMix = {
  methods: {
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
    createArrayToGraph(sensors) {
      return sensors.map(({ id, name, tag }) => {
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
    },
  },
};
