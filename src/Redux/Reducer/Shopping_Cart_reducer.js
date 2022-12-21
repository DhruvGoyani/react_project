import * as ActionType from '../ActionTypes'

const initalState = {
    isLoading: false,
    cart: [],
    error: ''
}

export const ShoppingCartReducer = (state = initalState, action) => {
    // console.log(action.payload, state.cart);
    switch (action.type) {
        case ActionType.ADD_CART:
            
                const Data = state.cart.find((c) => c.id === action.payload.id)
                if (Data) {
                    Data.qty++;
                } else {
                    state.cart.push(action.payload);
                }
                return {
                    ...state,
                    isLoading: false,
                    // cart: state.cart.concat(action.payload),
                    error: ''
                }
        case ActionType.INCREMENT_COUNTER:
            return {
                ...state,
                isLoading: false,
                cart: state.cart.map((c) => {
                    // console.log(c);
                    if (c.id === action.payload) {
                        return (
                            {
                                id: c.id,
                                qty: c.qty + 1
                            }
                        )
                    } else {
                        return c
                    }
                })
            }
        case ActionType.DECREMENT_COUNTER:
            return {
                ...state,
                isLoading: false,
                cart: state.cart.map((c) => {
                    console.log(c);
                    if (c.id === action.payload) {
                        return (
                            {
                                id: c.id,
                                qty: c.qty - 1
                            }
                        )
                    } else {
                        return c
                    }
                })
            }
            case ActionType.DELETE_CART:
                return {
                    ...state,
                    isLoading: false,
                    cart: state.cart.filter((d) => d.id !== action.payload),
                    error: ''
                }
        default:
            return state;
    }
}