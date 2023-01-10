// React libraries
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Stylings
import './App.scss';

// Application components
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react';
import { projectModel, schedulerConfig } from './config';
import { eventTemplate } from "./utils";
import { getResources, getAssignments, getEvents } from "./data";
  
const App = () => {
    const [grouped, updateGrouped] = useState(null);
    const schedulerRef = useRef();

    // Default data (not updated)
    const assignments = useMemo(() => getAssignments(), []);
    const events = useMemo(() => getEvents(), []);
    const resources = useMemo(getResources, []);

    /** Grouped or ungrouped resources list */
    const maybeGroupedResources = useMemo(() => {
        if (grouped === null) {
            return resources;
        }
        const namedGroups = [...new Set(resources.flatMap(resource => resource.groups))].filter(group => group === grouped);
        return namedGroups.map(namedGroup => ({
            id: namedGroup,
            name: namedGroup,
            expanded: false,
            children: resources
                .filter(resource => resource.groups.includes(namedGroup))
                .map(resource => ({ ...resource, id: `${namedGroup}/${resource.id}` }))
        }));
    }, [grouped, resources]);

    /** Grouped or ungrouped assignment list */
    const maybeGroupedAssignments = useMemo(() => {
        if (grouped !== null) {
            return assignments.map(assignment => ({
                id: `${grouped}/${assignment.id}`,
                eventId: assignment.eventId,
                resourceId: `${grouped}/${assignment.resourceId}`,
            }));
        }
        return assignments.map(assignment => ({
            id: `${assignment.resourceId}/${assignment.eventId}`,
            eventId: assignment.eventId,
            resourceId: assignment.resourceId,
        }));
    }, [assignments, grouped]);

    const groupModes = useMemo(() => [null, 'large-group', 'small-group'],[]);
    const toggleGroupMode = useCallback(() => {
        updateGrouped(old => {
            const groupMode = groupModes[(groupModes.indexOf(old) + 1) % groupModes.length]
            console.log('%cSet group mode to:', 'color:green', groupMode)
            return groupMode;
        });
    }, [groupModes]);

    // Update projectModel
    useEffect(() => {
        (async () => {
            console.log('updating projectModel');
            await projectModel.loadInlineData({
                eventsData: events,
                resourcesData: maybeGroupedResources,
                assignmentsData: maybeGroupedAssignments,
            });
            console.log('finished updating projectModel');
        })();
    }, [events, maybeGroupedAssignments, maybeGroupedResources]);

    // Listen to `scroll` event. For debugging.
    useEffect(() => {
        if (!schedulerRef.current || schedulerRef.current.instance.isDestroyed) return;
        const scrollableListener = (scrollable)=> {
            console.groupCollapsed(`scrollEnd Event | y: ${scrollable.source.y}`);
            console.log('scrollable', scrollable);
            console.groupEnd();
        }
        const scrollable = schedulerRef.current.instance.scrollable;
        scrollable.addListener('scrollEnd', scrollableListener);
        return () => {
            // Check if scrollable is already destroyed
            if ('removeListener' in scrollable) {
                scrollable.removeListener('scrollEnd', scrollableListener);
            }
        }
    }, [schedulerRef]);

    const maybeGroupedResourcesCount = maybeGroupedResources.length > 0 && 'children' in maybeGroupedResources[0]
        ? maybeGroupedResources[0].children.length
        : maybeGroupedResources.length;

    console.groupCollapsed(`data - resources: ${maybeGroupedResourcesCount}/${resources.length}`);
    console.log('resources', resources);
    console.log('events', events);
    console.log('assignments', assignments);
    console.log('maybeGroupedResources', maybeGroupedResources);
    console.log('maybeGroupedAssignments', maybeGroupedAssignments);
    console.groupEnd();

    return (
        <div className="container">
            <div className="header">
                <button type="button" onClick={toggleGroupMode}>Toggle grouping mode</button>
                <select onChange={e => updateGrouped(e.target.value)} value={grouped ?? 'all'}>
                    {groupModes.map(group => (
                        <option key={group}>{group ?? 'all'}</option>
                    ))}
                </select>
                <div style={{ margin: '1rem'}}>
                    {`Group: ${ grouped !== null ? grouped : 'without groups'} (${maybeGroupedResourcesCount})`}
                </div>
            </div>
            <BryntumSchedulerPro
                {...schedulerConfig}
                ref={schedulerRef}
                project={projectModel}
                eventStyle="plain"
                eventRenderer={eventTemplate}
                headerMenuFeature={false}
                cellMenuFeature={false}
                dependencyEditFeature={false}
                dependenciesFeature={false}
                columnPickerFeature={false}
                eventMenuFeature={{
                    items: {
                        deleteEvent: false,
                        unassignEvent: false,
                    },
                }}
                scrollable={true}
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
                treeFeature
                taskEditFeature={false}
                headerZoomFeature={false}
                eventEditFeature
                createEventOnDblClick={false}
                enableDeleteKey={false}
            />
        </div>
    )
};

export default App;
