import { GET_USERS, USERS_LOADING, UPDATE_USER } from '../actions/types';

const initialState = {
    users: [],
    usersLoading: false
};

export default function(state = initialState, action)
{
    switch(action.type)
    {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                usersLoading: false
            };

        case UPDATE_USER:
            console.log(action.payload._id)
            let index = state.users.findIndex(
                user => user._id === action.payload._id
            );

            state.users.splice(index, 1);

            return{
                ...state,
                users: [action.payload, ...state.users]
            };

        case USERS_LOADING:
            return {
                ...state,
                usersLoading: true
            };

        default:
                return state;
    }  
}