import axios from 'axios';

import { GET_USERS, UPDATE_USER, USERS_LOADING } from './types';

//Get all Users
export const getUsers = () => dispatch => {
    dispatch(getUsersLoading());
    axios   
        .get('/api/users/getUsers')
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data.user
            })
        )
        .catch(err =>
            dispatch({
                type: GET_USERS,
                payload: null
            })
        );
};

export const updateUser = userData => dispatch => {
    console.log(userData)
    axios
        .patch("api/users/update", userData)
        .then(res => 
            dispatch({
                type: UPDATE_USER,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

//Get users loading
export const getUsersLoading = () => {
    return {
        type: USERS_LOADING
    };
};