import { 
    LOAD_AGENDA_DATA,
    PREV_CLICK,
    NEXT_CLICK,
    ON_VIEW_CHANGE,
    ON_SELECT_DATE,
    NEW_EVENT,
    ON_SCROLL_RIGHT,
    ON_SCROLL_LEFT
} from "./types";
import axios from 'axios';
import moment from 'moment';

export const prevClick = () => {
    return {
        type: PREV_CLICK
    };
};

export const nextClick = () => {
    return {
        type: NEXT_CLICK
    };
};

export const onViewChange = (schedulerData, view) => {
    return({
        type: ON_VIEW_CHANGE,
        payload: view
    });
};

export const onSelectDate = (schedulerData, date) => {
    return({
        type: ON_SELECT_DATE,
        payload: date
    });
};

export const newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    return({
        type: NEW_EVENT,
        payload: {schedulerData, slotId, slotName, start, end, type, item}
    });
};

export const loadAgendaData = () => dispatch => {
    axios
        .all([
            axios.get('/api/machines/getAll'),
            axios.get('/api/reservations/getReservations')
        ])
        .then(axios.spread((machines, reservations) =>
            dispatch({
                type: LOAD_AGENDA_DATA,
                payload: { machines: machines.data, reservations: reservations.data }
            })
        ))
        .catch(err => console.log(err));
};