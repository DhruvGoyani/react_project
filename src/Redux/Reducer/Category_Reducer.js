import * as ActionTypes from "../ActionTypes";

const initVal = {
  isloading: false,
  category: [],
  error: "",
};

export const CategoryReducer = (state = initVal, action) => {
  console.log((state = initVal), action);
  switch (action.type) {
    case ActionTypes.GETCATEGORY:
      return {
        ...state,
        isloading: false,
        category: action.payload,
        error: "",
      };
    case ActionTypes.ADDCATEGORY:
      return {
        ...state,
        isLoading: false,
        category: state.category.concat(action.payload),
        error: "",
      };
    case ActionTypes.DELETECATEGORY:
      return {
        ...state,
        isLoading: false,
        category: state.category.filter((c) => c.id !== action.payload),
        error: "",
      };
    case ActionTypes.UPDATECATEGORY:
      return {
            ...state,
            isLoading: false,
            category: state.category.map((c) => {
            if (c.id === action.payload.id) {
                return action.payload;
            } else {
                return c;
            }
            }),
            error: "",
      };
    case ActionTypes.ERRORCATEGORY:
      return {
        ...state,
        isloading: false,
        category: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
