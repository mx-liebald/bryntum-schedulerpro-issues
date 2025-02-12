import { range } from 'lodash';
import { oneDayInMs, oneHourInMs, todayInMs } from './util';

// Test data config
const resourceCount = 30;
const eventCount = 2_000;

export function generateTestData() {
  const resourcesData = range(resourceCount).map((i) => ({
    id: `resource-${i}`,
    name: `Resource ${i}`,
  }));

  const eventsData = range(eventCount).map((i) => ({
    id: `event-${i}`,
    name: `${i}`,
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

  return { eventsData, resourcesData, assignmentsData };
}
