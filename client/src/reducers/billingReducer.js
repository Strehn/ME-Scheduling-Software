import { GET_CODES, CODES_LOADING, DELETE_CODE, CREATE_CODE, FIND_CODE } from '../actions/types';

const initialState = {
    codes: [],
    success: false,
    codesLoading: false
};

export default function(state = initialState, action)
{
    switch(action.type)
    {
        case DELETE_CODE:
            return {
                ...state,
                codes: state.codes.filter(
                    codes => codes._id !== action.payload
                )
            };

        case GET_CODES:
            return {
                ...state, 
                codes: action.payload,
                codesLoading: false
            };
        
        case CODES_LOADING:
            return {
                ...state,
                codesLoading: true
            };

        case CREATE_CODE:
            return {
                ...state,
                codes: [action.payload, ...state.codes]
            }

        case FIND_CODE:
            return {
                ...state,
                codes: action.payload,
                success: true
            }

        default:
            return state;
    }
}