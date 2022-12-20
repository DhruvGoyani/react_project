

import * as ActionTypes from "../ActionTypes"


const initVal = {
  isLoading: false,
  user: null,
  error: "",
};

export const authreducer = (state = initVal , action) => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case ActionTypes.LOGGEDIN:
      return {
        ...state,
        isLoading : false,
        user : action.payload,
        error: ''
      }
      case ActionTypes.FORGATEDPASSWORD: 
        return {
            ...state,
            isloading: false,
            user : action.payload,
            error : ''
        }
        case ActionTypes.LOGGEDOUT: 
        return {
            ...state,
            isloading: false,
            user : null,
            error : ''
        }
    default:
      return state;
  }
};
