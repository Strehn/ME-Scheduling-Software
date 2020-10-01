import axios from 'axios';

import { GET_MACHINES, MACHINES_LOADING, CREATE_MACHINE, DELETE_MACHINE, UPDATE_MACHINE } from '../actions/types';

//Get all machines
export const getMachines = () => dispatch => {
    dispatch(getMachinesLoading());
    axios   
        .get('/api/machines/getAll')
        .then(res =>
            dispatch({
                type: GET_MACHINES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_MACHINES,
                payload: null
            })
        );
};

export const createMachine = machineData => dispatch => {
    axios
        .post("api/machines/newMachine", machineData)
        .then(res =>
            dispatch({
                type: CREATE_MACHINE,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

export const updateMachine = machineData => dispatch => {
    axios
        .patch("api/machines/update", machineData)
        .then(res =>
            dispatch({
                type: UPDATE_MACHINE,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

export const deleteMachine = id => dispatch => {
    axios
        .delete(`/api/machines/delete/${id}`)
        .then(res =>
            dispatch ({
                type: DELETE_MACHINE,
                payload: id
            })
        )
        .catch(err => console.log(err));
};

//Get machines loading
export const getMachinesLoading = () => {
    return {
        type: MACHINES_LOADING
    };
};