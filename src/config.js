/**
 * Application configuration
 */

import { ProjectModel, StringHelper } from '@bryntum/schedulerpro';

export const projectModel = new ProjectModel({
    // autoLoad: true,
    // silenceInitialCommit: true,
    assignmentStore: {
        syncDataOnLoad: true,
    },
    eventStore: {
        syncDataOnLoad: true,
    },
    resourceStore: {
        syncDataOnLoad: true,
        tree: true,
    },
});

export const schedulerConfig = {
    project: projectModel,
    startDate: new Date(2022, 10, 10),
    endDate: new Date(2022, 12, 31),
    rowHeight: 50,
    barMargin: 4,
    // forceFit   : true,
    resourceImagePath: 'users/',

    columns: [
        {
            text: 'Resource',
            field: 'name',
            width: 240,
            type: 'tree',
        },
    ],

    eventRenderer({ eventRecord: task, renderData }) {
        if (task.showInTimeline) {
            renderData.eventColor = 'green';
        } else {
            renderData.eventColor = 'blue';
        }

        return StringHelper.encodeHtml(task.name);
    }
};
