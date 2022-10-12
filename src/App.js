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
} from '@bryntum/schedulerpro';
import { schedulerConfig, } from './AppConfig';
import { clone, range } from 'lodash';

export const eventTemplate = (eventData) => {
    return `<div>${StringHelper.encodeHtml(eventData.eventRecord.data?.name)}</div>
    `;
};
export function useRerender() {
    const [, u] = React.useReducer(x => !x, true);
    return u;
  }
  
const App = () => {
    const rerender = useRerender();
    const [resources, updateResources] = React.useState([{
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
    }, ...range(2, 100).map(id => ({
        id,
        name: "Test" + id,
        "startDate": new Date(2020, 11, Math.floor(id / 4), (id % 4) * 6),
        "duration": 4,
        "durationUnit": 'h',
    }))], []);
    const [assignments, updateAssignments] = React.useState(() => [{
        id: 1,
        eventId: 1,
        resourceId: 1,
    }, ...range(2, 100).map(id => ({
        id,
        eventId: id,
        resourceId: (id % 2) + 2,
    }))], [])

    const changeResource = (ev) => {
        updateAssignments(asgs => {
            const changedAsg = { 
                ...asgs[0], 
                // resourceId: asgs[0].resourceId === 1 ? 2 : 1,
                resource: asgs[0].resource === 1 ? 2 : 1,
            };
            const updated = [changedAsg, ...asgs.slice(1)];
            return updated;
        });
        ev.preventDefault();
        ev.stopPropagation();
    }

    const [projectModel] = React.useState(() => new ProjectModel({
        silenceInitialCommit: true,
        assignmentStore: {
            syncDataOnLoad: false,
            // autoCommit: true,
        },
        eventStore: {
            syncDataOnLoad: false,
        },
        resourceStore: {
            syncDataOnLoad: false,
        },
    }));

    const updating = React.useRef(false);
    React.useEffect(() => {
        // if (updating.current) return;
        const asgs = assignments;
        const ress = resources;
        const evts = events;
        (async () => {
            updating.current = true;
            console.log('updating');
            await projectModel.loadInlineData({
                // assignmentsData: [clone(asgs[0]), ...asgs.slice(1)],
                eventsData: evts,
                resourcesData: ress,
                assignmentsData: asgs,
                //assignmentsData: asgs.map(asg => clone(asg)),
            });
            rerender();
            console.log('finished updating');
            updating.current = false;
        })();
    }, [assignments, events, projectModel, rerender, resources])

    const syncResources = () => {
        updateResources(resources.map(resource => clone(resource)))
    };
    const syncEvents = () => {
        updateEvents(events.map(event => clone(event)));
    };
    const scrollable = React.useMemo(() => ({ onScroll: e => console.log(e)}), []);
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
            scrollable={scrollable}
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
