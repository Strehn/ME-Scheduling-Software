import { 
    LOAD_AGENDA_DATA,
    PREV_CLICK,
    NEXT_CLICK,
    ON_VIEW_CHANGE,
    ON_SELECT_DATE,
    NEW_EVENT,
    ON_SCROLL_RIGHT,
    ON_SCROLL_LEFT
} from "../actions/types";
import { SchedulerData, ViewTypes, DATE_FORMAT } from "react-big-scheduler";
import calConfig from '../components/calendar/components/calConfig';
import moment from "moment";

let today = moment().format(DATE_FORMAT);
let scheduler = new SchedulerData(today, ViewTypes.Day, false, false, calConfig);

const initialState = {
    schedulerdata: scheduler,  //Current storage of all reservations
    newReservation: [],  //Temp storage while creating reservation
};

export default function(state = new SchedulerData(today, ViewTypes.Day, false, false, calConfig), action) 
{
    const tempScheduler = new SchedulerData(state.startDate, state.viewType, false, false, calConfig);
    switch(action.type)
    {
        case LOAD_AGENDA_DATA:
            tempScheduler.setResources(action.payload.machines);
            tempScheduler.setEvents(action.payload.reservations);
            return tempScheduler;

        case PREV_CLICK:                        //()
            tempScheduler.prev();
            tempScheduler.setResources(state.resources);
            tempScheduler.setEvents(state.events);
            return tempScheduler;

        case NEXT_CLICK:                        //()
            tempScheduler.next();
            tempScheduler.setResources(state.resources);
            tempScheduler.setEvents(state.events);
            return tempScheduler;

        case ON_VIEW_CHANGE:
            tempScheduler.setViewType(action.payload.viewType, action.payload.showAgenda, action.payload.isEventPerspective);
            tempScheduler.setResources(state.resources);
            tempScheduler.setEvents(state.events);
            console.log(tempScheduler)
            return tempScheduler;

        case ON_SELECT_DATE:
            tempScheduler.setDate(action.payload);
            tempScheduler.setResources(state.resources);
            tempScheduler.setEvents(state.events);
            return tempScheduler;

        case NEW_EVENT:
            tempScheduler.setEvents(state.events);
            if(tempScheduler.viewType === 0)
            {
                // if(window.confirm(`Create reservation for ${action.payload.slotName} from ${action.payload.start} to ${action.payload.end}?`))
                // {
                    let newFreshId = 0;
                    tempScheduler.events.forEach((item) => {
                        if(item.id >= newFreshId)
                        { newFreshId = item.id + 1; }
                    });

                    let newEvent = {
                        id: newFreshId,
                        title: 'New Event',
                        start: action.payload.start,
                        end: action.payload.end,
                        resourceId: action.payload.slotId,
                        bgColor: 'blue'
                    }
                    //Should probably fix?
                    tempScheduler.addEvent(newEvent);
                //}
                // else
                // { tempScheduler.setEvents(state.events); }
            }
            tempScheduler.setResources(state.resources);
            return tempScheduler;


        default:
            return state;
    }
}


