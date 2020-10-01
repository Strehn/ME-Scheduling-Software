import axios from 'axios';

import { GET_CODES, CODES_LOADING, DELETE_CODE, CREATE_CODE, FIND_CODE, GET_ERRORS } from './types';

//Get All Billing Codes
export const getCodes = () => dispatch => {
    dispatch(setCodesLoading());
    axios   
        .get('/api/billingcodes/getCodes')
        .then(res =>
            dispatch({
                type: GET_CODES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_CODES,
                payload: null
            })
        );
};

//Create New Billing Code
export const createCode = codeData => dispatch => {
    axios
        .post("/api/billingcodes/newCode", codeData)
        .then(res =>
            dispatch({
                type: CREATE_CODE,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

export const findCode = code => dispatch => {
    axios
        .post("/api/billingcodes/checkCode", code)
        .then(res =>
            dispatch({
                type: FIND_CODE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}

//Delete a Billing Code
export const deleteCode = id => dispatch => {
    axios   
        .delete(`/api/billingcodes/delete/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_CODE,
                payload: id
            })
        )
        .catch(err => console.log(err));
};

//Billing Codes Loading
export const setCodesLoading = () => {
    return {
        type: CODES_LOADING
    };
};