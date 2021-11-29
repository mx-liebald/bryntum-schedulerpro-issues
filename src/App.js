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

const App = () => {
    const resources = React.useMemo(() => [{
        "id": 1,
        "name": "Angelo"
    },
    {
        "id": 2,
        "name": "Arnold"
    }], []);
    const events = React.useMemo(() => [{
        "id": 1,
        "name": "Ventilation",
        "startDate": "2020-12-01",
        "duration": 4,
        "iconCls": "b-fa b-fa-fan"
    }], []);
    const [assignments, updateAssignments] = React.useState(() => [{
        "id": 1,
        "event": 1,
        "resource": 2
    }]);
    const changeResource = (ev) => {
        updateAssignments(asgs => [{ ...asgs[0], resource: asgs[0].resource === 1 ? 2 : 1 }]);
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
        projectModel.eventStore.data = events;

    }, [events, projectModel.eventStore, projectModel.resourceStore, resources])
    React.useEffect(() => {
        projectModel.assignmentStore.data = assignments;
    }, [assignments, projectModel.assignmentStore]);
    return <div>
        <button type={'button'} onClick={changeResource}>Test</button>
        <BryntumSchedulerPro {...schedulerConfig} project={projectModel} />;
    </div>
};

export default App;
