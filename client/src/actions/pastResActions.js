import axios from 'axios';

import { GET_PAST_RESERVATIONS, PAST_RESERVATIONS_LOADING } from './types';

export const getPastReservations = () => dispatch => {
    dispatch(setPastReservationsLoading());
    axios
        .get('/api/reservations/getPastRes')
        .then(res =>
            dispatch({
                type: GET_PAST_RESERVATIONS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PAST_RESERVATIONS,
                payload: null
            })
        );
};

export const getPastResID = id => dispatch => {
    dispatch(setPastReservationsLoading());
    axios   
        .get(`/api/reservations/past/${id}`)
        .then(res =>
            dispatch({
                type: GET_PAST_RESERVATIONS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PAST_RESERVATIONS,
                payload: null
            })
        );
};

export const setPastReservationsLoading = () => {
    return {
        type: PAST_RESERVATIONS_LOADING
    };
};