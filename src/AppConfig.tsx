import { BryntumSchedulerProProps } from '@bryntum/schedulerpro-react';

/**
 * Application configuration
 */

export const schedulerConfig: Partial<BryntumSchedulerProProps> = {
  // project: {
  // autoLoad: true,
  // loadUrl: "./data/data.json",
  // },

  // startDate: new Date(2025, 2, 4),
  // endDate: new Date(2025, 2, 11),
  rowHeight: 50,
  barMargin: 5,
  // eventStyle: 'border',
  // eventColor: 'indigo',

  viewPreset: {
    base: 'hourAndDay',
    tickWidth: 30,
    headers: [
      {
        unit: 'year',
        dateFormat: 'YYYY',
      },
      {
        unit: 'day',
        dateFormat: 'ddd DD/MM',
      },
      {
        unit: 'hour',
        increment: 4,
        dateFormat: 'HH',
      },
    ],
  },

  columns: [
    {
      text: 'Resource',
      field: 'name',
      width: 200,
    },
  ],
  resourceTimeRangesFeature: {
    enableMouseEvents: true,
  },
};
