import { StringHelper } from '@bryntum/schedulerpro';

export const eventTemplate = (eventData) => {
    return `<div>${StringHelper.encodeHtml(eventData.eventRecord.data?.name)}</div>`;
}
