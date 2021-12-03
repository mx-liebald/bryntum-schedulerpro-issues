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
    ProjectModel
} from '@bryntum/schedulerpro/schedulerpro.umd.js';
import { schedulerConfig, } from './AppConfig';

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
    }], []);
    const [events, updateEvents] = React.useState(() => [{
        "id": 1,
        "name": "Ventilation",
        "startDate": "2020-12-01",
        "duration": 4,
        "resourceId": 1
    }], []);
    const rerender = useRerender();
    const changeResource = (ev) => {
        updateEvents(events => [{ ...events[0], resourceId: events[0].resourceId === 1 ? 2 : 1 }]);
        ev.preventDefault();
        ev.stopPropagation();
    }

    const [projectModel] = React.useState(() => new ProjectModel({
        eventStore: {
            syncDataOnLoad: true,
        },
        resourceStore: {
            syncDataOnLoad: true,
        },
        assignmentStore: {
            syncDataOnLoad: true,
        }
    }));
    React.useEffect(() => {
        projectModel.resourceStore.data = resources;
        rerender();

    }, [projectModel.resourceStore, resources])
    React.useEffect(() => {
        projectModel.eventStore.data = events;
        rerender();

    }, [events, projectModel.eventStore])
    return <div>
        <button type={'button'} onClick={changeResource}>Test</button>
        <BryntumSchedulerPro {...schedulerConfig}
            project={projectModel}
            eventStyle="regular"
            nonWorkingTimeFeature={{
                highlightWeekends: true,
            }}
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
            enableDeleteKey={false} />;
    </div>
};

export default App;
