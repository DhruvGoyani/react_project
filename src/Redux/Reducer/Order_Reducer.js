import * as ActionTypes from "../ActionTypes"

const initialState = {
    isLoading: false,
    order: [],
    errors: ''
}

export const orderreducer = (state = initialState, action) => {
    // console.log(action.type, action.payload);
    switch (action.type) {
        case ActionTypes.ADD_ORDER:
            return {
                ...state,
                isLoading: false,
                order: state.order.concat(action.payload),
                errors: ''
            }
        case ActionTypes.GET_ORDER:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
                errors: ''
            }
        default:
            return state
    }
}