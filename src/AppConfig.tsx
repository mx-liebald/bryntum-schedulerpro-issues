import { EventModel, ResourceModel } from "@bryntum/schedulerpro";
import { BryntumSchedulerProProps } from "@bryntum/schedulerpro-react";

/**
 * Application configuration
 */

export const schedulerConfig: Partial<BryntumSchedulerProProps> = {
  project: {
    // autoLoad: true,
    // loadUrl: "./data/data.json",
  },

  startDate: new Date(2020, 1, 1),
  endDate: new Date(2020, 1, 6),
  rowHeight: 50,
  barMargin: 0,
  eventStyle: undefined,

  viewPreset: {
    base: "hourAndDay",
    tickWidth: 25,
    headers: [
      {
        unit: "day",
        dateFormat: "dddd", // Monday
      },
      {
        unit: "hour",
        dateFormat: "HH", // 00-23
      },
    ],
  },

  columns: [
    {
      text: "Resource",
      field: "name",
      width: 200,
    },
  ],
};
