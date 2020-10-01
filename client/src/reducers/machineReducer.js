import { GET_MACHINES, MACHINES_LOADING, CREATE_MACHINE, DELETE_MACHINE, UPDATE_MACHINE } from '../actions/types';

const initialState = {
    machines: [],
    machinesLoading: false
};

export default function(state = initialState, action)
{
    switch(action.type)
    {
        case GET_MACHINES:
            return {
                ...state,
                machines: action.payload,
                machinesLoading: false
            };

        case MACHINES_LOADING:
            return {
                ...state,
                machinesLoading: true
            };

        case CREATE_MACHINE:
            return {
                ...state,
                machines: [action.payload, ...state.machines]
            }
        
        case UPDATE_MACHINE:
            let index = state.machines.findIndex(
                machine => machine._id === action.payload._id
            );

            state.machines.splice(index, 1);

            return {
                ...state,
                machines: [action.payload, ...state.machines]
            };
        
        case DELETE_MACHINE:
            return {
                ...state,
                machines: state.machines.filter(
                    machine => machine._id !== action.payload
                )
            };

        default:
            return state;
    }
}