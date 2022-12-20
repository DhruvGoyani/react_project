import { combineReducers } from "redux";
import { alertReducer } from "./Alert_reducer";
import { authreducer, authReducer } from "../Reducer/Auth_Reducer";
import { CategoryReducer } from "./Category_Reducer";
import { productReducer } from "./Product_Reducer";


export const rootReducer = combineReducers({ 
    auth : authreducer,
    alert : alertReducer,
    category: CategoryReducer,
    product : productReducer
});