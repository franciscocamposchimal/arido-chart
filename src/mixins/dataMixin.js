/* eslint-disable */

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
    };
  },
};
