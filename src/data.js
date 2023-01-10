import { faker } from '@faker-js/faker/locale/en_GB';
import { schedulerConfig } from "./config";

const RESOURCE_COUNT = 100;

const RESOURCES_IN_SMALL_GROUP_COUNT = 4;
const RESOURCES_IN_LARGE_GROUP_COUNT = 50;

const getGroup = (index) =>  ([
    ...(index < RESOURCES_IN_SMALL_GROUP_COUNT ? ['small-group'] : []),
    ...(index < RESOURCES_IN_LARGE_GROUP_COUNT ? ['large-group'] : []),
])


export const getResources = () => {
    return Array.from(Array(RESOURCE_COUNT)).map((_, index) => ({
        id: index,
        name: faker.name.fullName() + ` (${index})`,
        groups: getGroup(index),
    }));
}


export const getAssignments = () => {
    return Array.from(Array(RESOURCE_COUNT)).map((_, index) => ({
        id: index,
        eventId: index,
        resourceId: index,
    }));
}

export const getEvents = () => {
    return Array.from(Array(RESOURCE_COUNT)).map((_, index) => {
        const duration = faker.datatype.number({ min: 4, max: 15 });
        return {
            id: index,
            name: `event ${index}`,
            startDate: schedulerConfig.startDate, // faker.date.between(schedulerConfig.startDate, schedulerConfig.endDate),
            duration: duration,
            durationUnit: 'd',
        };
    });
}