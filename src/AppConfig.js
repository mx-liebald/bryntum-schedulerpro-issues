/**
 * Application configuration
 */

const schedulerConfig = {
    appendTo : 'container',

    startDate : new Date(2021, 10, 1),
    endDate   : new Date(2021, 10, 20),
    barMargin : 10,
    rowHeight : 60,

    viewPreset : 'weekAndDay',

    columns : [
        { type : 'resourceInfo', width : 200 }
    ],
};

export { schedulerConfig };
