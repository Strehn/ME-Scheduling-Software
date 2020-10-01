import axios from 'axios';

import { GET_UPCOMING_RESERVATIONS, RESERVATIONS_LOADING, DELETE_RESERVATION, NEW_RESERVATION } from './types';

export const createReservation = newReservation => dispatch => {
    axios
        .post("/api/reservations/newReservation", newReservation)
        .then(res =>
            dispatch({
                type: NEW_RESERVATION,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: NEW_RESERVATION,
                payload: null
            })
        );
};

export const getUpcomingReservations = () => dispatch => {
    dispatch(setReservationsLoading());
    axios
        .get('/api/reservations/getUpcomingRes')
        .then(res =>
            dispatch({
                type: GET_UPCOMING_RESERVATIONS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_UPCOMING_RESERVATIONS,
                payload: null
            })
        );
};

export const getUpcomingResID = id => dispatch => {
    dispatch(setReservationsLoading());
    axios   
        .get(`/api/reservations/upcoming/${id}`)
        .then(res =>
            dispatch({
                type: GET_UPCOMING_RESERVATIONS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_UPCOMING_RESERVATIONS,
                payload: null
            })
        );
};

export const deleteReservation = id => dispatch => {
    axios   
        .delete(`api/reservations/delete/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_RESERVATION,
                payload: id
            })
        )
        .catch(err => console.log(err));
};

export const setReservationsLoading = () => {
    return {
        type: RESERVATIONS_LOADING
    };
};