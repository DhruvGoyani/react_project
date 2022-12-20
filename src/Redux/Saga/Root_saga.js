import { all } from "redux-saga/effects";
import { authsaga } from "./Auth_saga";

export default function* rootsaga(){
    yield all ([
        authsaga()
    ])
} 