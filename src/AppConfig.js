/**
 * Application configuration
 */
import {
    ProjectModel,
    StringHelper
} from '@bryntum/schedulerpro/schedulerpro.umd';

const project = new ProjectModel({
    autoLoad: true,
});

const schedulerConfig = {
    project,
    startDate: new Date(2020, 10, 29),
    endDate: new Date(2021, 0, 10),
    rowHeight: 50,
    barMargin: 2,

    viewPreset: 'weekAndDay',
    resourceImagePath: 'users/',

    columns: [
        {
            text: 'Resource',
            field: 'name',
            width: 120,
            type: 'resourceInfo'
        },
        {
            text: 'Tasks',
            field: 'events.length',
            width: 70,
            align: 'right',
            editor: false
        }
    ],
};

const timelineConfig = {
    project
};

export { schedulerConfig, timelineConfig };
