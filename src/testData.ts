import { range } from 'lodash';
import { oneDayInMs, oneHourInMs, todayInMs } from './util';
import { ResourceTimeRangeModelConfig } from '@bryntum/schedulerpro';

// Test data config
const resourceCount = 25;
const eventCount = 1000;
const daysWithResourceTimeRanges = 200;

export function generateTestData(includeEvents: boolean) {
  // Mock data
  const resourcesData = range(resourceCount).map((i) => ({
    id: `resource-${i}`,
    name: `Resource ${i}`,
  }));

  const eventsData = range(includeEvents ? eventCount : 0).map((i) => ({
    id: `event-${i}`,
    name: `Event ${i}`,
    startDate: new Date(
      todayInMs +
        Math.floor(i / resourcesData.length) * oneDayInMs +
        8 * oneHourInMs
    ),
    duration: 8,
    durationUnit: 'hour',
  }));

  const assignmentsData = eventsData.map((event, i) => ({
    id: `assignment-${i}`,
    event: event.id,
    resourceId: resourcesData[i % resourcesData.length].id,
  }));

  const resourceTimeRangesData = resourcesData.flatMap((resource) =>
    range(
      -Math.floor(daysWithResourceTimeRanges / 2),
      Math.ceil(daysWithResourceTimeRanges / 2)
    ).map(
      (i): Partial<ResourceTimeRangeModelConfig> => ({
        id: `time-range-${resource.id}-${i}`,
        resourceId: resource.id,
        name: `Day ${i} for ${resource.name}`,
        startDate: new Date(todayInMs + i * oneDayInMs + 4 * oneHourInMs),
        endDate: new Date(todayInMs + i * oneDayInMs + 20 * oneHourInMs),
      })
    )
  );

  return { eventsData, resourcesData, assignmentsData, resourceTimeRangesData };
}
