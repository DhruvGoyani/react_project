import * as ActionType from '../ActionTypes'

export const addCart = (d) => (dispatch) => {
    dispatch({type:ActionType.ADD_CART, payload:{id:d.id,qty:1}})
}


export const incrementCounter = (id) => (dispatch) => {
    dispatch({type:ActionType.INCREMENT_COUNTER, payload : id});
}

export const decrementCounter = (id) => (dispatch) => {
    dispatch({type:ActionType.DECREMENT_COUNTER, payload : id});
}

export const handledelete = (id) => (dispatch) => {
    dispatch({type:ActionType.DELETE_CART, payload : id});
}
