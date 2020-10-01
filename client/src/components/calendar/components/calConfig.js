import { ViewTypes } from 'react-big-scheduler';

export default {
    startResizable: false,
    endResizable: false,
    movable: false,
    creatable: true,
    schedulerWidth: '90%',
    checkConflict: true,
    resourceName: 'Machine',
    minuteStep: 30,

    views: [
        { viewName: 'Day', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false },
        { viewName: 'Week', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false },
        { viewName: 'Month', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false },
    ]
}