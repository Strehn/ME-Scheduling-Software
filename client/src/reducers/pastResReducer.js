import { GET_PAST_RESERVATIONS, PAST_RESERVATIONS_LOADING } from '../actions/types';

const initialState = {
    pastreservations: [],
    pastreservationsLoading: false
};

export default function(state = initialState, action)
{
    switch(action.type)
    {
        case GET_PAST_RESERVATIONS:
            return {
                ...state,
                pastreservations: action.payload,
                pastreservationsLoading: false
            };

        case PAST_RESERVATIONS_LOADING :
            return {
                ...state,
                pastreservationsLoading: true
            };

        default:
            return state;
    }
}