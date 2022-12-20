import * as ActionTypes from "../ActionTypes"

const initalState = {
    isLoading: false,
    product: [],
    error: ''
}

export const productReducer = (state = initalState, action) => {
    // console.log(action.type, action.payload, state);

    switch (action.type) {

        case ActionTypes.GET_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: action.payload,
                error: ''
            }
        case ActionTypes.ADD_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: state.product.concat(action.payload),
                error: ''
            }
        case ActionTypes.DELETE_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: state.product.filter((l) => l.id !== action.payload),
                error: ''
            }
        case ActionTypes.EDIT_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: state.product.map((l) => {
                    if (l.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return l;
                    }
                }),
                error: ''
            }
        case ActionTypes.ERROR_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: [],
                error: action.payload
            }

        default:
            return state;
    }
}