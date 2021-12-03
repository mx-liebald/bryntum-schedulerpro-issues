/**
 * The React App file
 */

// React libraries
import React from 'react';

// Stylings
import './App.scss';

// Application components
import {
    BryntumSchedulerPro,
} from '@bryntum/schedulerpro-react';
import {
    ProjectModel,
    StringHelper
} from '@bryntum/schedulerpro/schedulerpro.umd.js';
import { schedulerConfig, } from './AppConfig';
import { clone, range } from 'lodash';

export const eventTemplate = (eventData) => {
    return `<div>${StringHelper.encodeHtml(eventData.eventRecord.data?.name)}</div>
    `;
};

function useRerender() {
    const [, u] = React.useReducer(x => !x, true);
    return u;
}

const App = () => {
    const resources = React.useMemo(() => [{
        "id": 1,
        "name": "Angelo"
    },
    {
        "id": 2,
        "name": "Arnold"
    }, ...range(3, 150).map(id => ({ id, name: "Hello World" }))], []);
    const [events, updateEvents] = React.useState(() => [{
        "id": 1,
        "name": "Ventilation",
        "startDate": "2020-12-01",
        "duration": 1,
        "durationUnit": 'd',
        "resourceId": 1
    }, ...range(2, 100).map(id => ({
        id,
        name: "Test" + id,
        "startDate": new Date(2020, 11, Math.floor(id / 4), (id % 4) * 6),
        "duration": 4,
        "durationUnit": 'h',
        "resourceId": (id % 2) + 2,
    }))], []);
    const rerender = useRerender();
    const changeResource = (ev) => {
        updateEvents(events => [{ ...events[0], resourceId: events[0].resourceId === 1 ? 2 : 1 }, ...events.slice(1)]);
        ev.preventDefault();
        ev.stopPropagation();
    }

    const [projectModel] = React.useState(() => new ProjectModel({
        silenceInitialCommit: true,
        eventStore: {
            syncDataOnLoad: true,
            autoCommit: false,
        },
        resourceStore: {
            syncDataOnLoad: true,
        },
    }));
    React.useEffect(() => {
        projectModel.resourceStore.data = resources;
        rerender();
    }, [projectModel.resourceStore, rerender, resources])
    React.useEffect(() => {
        projectModel.eventStore.data = events.map(event => clone(event));
        rerender();
    }, [events, projectModel.eventStore, rerender])
    const syncResources = () => {
        projectModel.resourceStore.data = resources.map(resource => clone(resource));
    }
    const syncEvents = () => {
        projectModel.eventStore.data = [...events];
    }
    return <div style={{ minHeight: '50vh' }}>
        <div style={{ display: 'flex', margin: '1rem' }}>
            <button type="button" onClick={changeResource}>Switch assignment of Ventilation</button>
            <button type="button" onClick={syncResources}>Sync resources</button>
            <button type="button" onClick={syncEvents}>Sync events</button>
        </div>
        <BryntumSchedulerPro {...schedulerConfig}
            project={projectModel}
            eventStyle="regular"
            nonWorkingTimeFeature={{
                highlightWeekends: true,
            }}
            eventRenderer={eventTemplate}
            headerMenuFeature={false} // disables menu together with sorting of resource columns
            cellMenuFeature={false} // removes menu on resource column cells
            dependencyEditFeature={false} // also removes circle shaped handles
            dependenciesFeature={false}
            columnPickerFeature={false}
            eventMenuFeature={{
                items: {
                    deleteEvent: false,
                    unassignEvent: false,
                },
            }}
            sortFeature={false}
            eventCopyPasteFeature={false}
            eventDragCreateFeature={false}
            scheduleTooltipFeature={false}
            scheduleMenuFeature={{
                items: {
                    addEvent: false,
                },
            }}
            cellEditFeature={false}
            timeAxisHeaderMenuFeature={{
                items: {
                    zoomLevel: false,
                    eventsFilter: false,
                    dateRange: false,
                },
            }}
            taskEditFeature={false}
            headerZoomFeature={false}
            eventEditFeature
            createEventOnDblClick={false}
            enableDeleteKey={false} />
    </div >
};

export default App;
