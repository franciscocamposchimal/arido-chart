/* eslint-disable */

export const dataDefaultMix = {
  data() {
    return {
      // datos por tabs de selects
      unitsTimeToGraph: [
        {
          tag: 'minute',
          name: '(min) Minutes',
        },
        {
          tag: 'minute',
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
          tag: 'minute',
          name: '(min) Minutes',
        },
        {
          tag: 'second',
          name: '(s) Seconds',
        },
        {
          tag: 'hour',
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
    };
  },
};
