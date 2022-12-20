
import * as ActionTypes from "../ActionTypes"
import { all, call, put, takeEvery } from "redux-saga/effects";
import { ForgatePasswordApi, GoogleloginApi, loginApi, LogOutApi, signupApi } from "../../Common/Auth_api";
import { history } from "../../History";
import { setAlert } from "../Action/Alert.Action";
import { ForgatedPasswordAction, LoggedInAction, LoggedOutAction, signedinAction } from "../Action/Auth.Action";


function* signup (action) {
  console.log(action);
  try{
    const user = yield call(signupApi, action.payload);
    yield put (setAlert({text: user.payload , color: "success"}))
  } catch (e) {
    yield put (setAlert({text: e.payload , color: "error"}))
  }
}


function* login(action) {
  console.log(action);
  try{
        const user = yield call(loginApi, action.payload);
        console.log(user);  
        yield put (LoggedInAction(user.payload))
        history.push("/home")
        yield put (setAlert({text: "Login Successfully" , color: "success"}))
      } catch (e) {
        console.log(e);
        yield put (setAlert({text: e.payload , color: "error"}))
      }
}

function* googlelogin () {
  try{
    const user = yield call (GoogleloginApi)
    yield put (LoggedInAction(user.payload))
    history.push("/home")
    yield put (setAlert({text: "Login Successfully" , color: "success"}))
  } catch(e){
    yield put (setAlert({text: e.payload , color: "error"}))
  }
}

function* forgatePassword (action) {
  try{
    const user = yield call (ForgatePasswordApi , action.payload)
    console.log(user);
    yield put (ForgatedPasswordAction(user.payload))
    history.push("/home")
    yield put (setAlert({text: "Please check your email" , color: "success"}))
  } catch (e) {
    console.log(e);
    yield put (setAlert({text: e.payload , color : "error"}))
  }
}

function* logout () {
  try{
    const user = yield call (LogOutApi)
    yield put (LoggedOutAction(user.payload))
    history.push("/home")
    yield put (setAlert({text: "Logout Successfully" , color: "success"}))
  } catch (e) {
    yield put (setAlert({text: e.payload , color : "error"}))
  }
}

function* watchSignup() {
  yield takeEvery (ActionTypes.SIGNUP, signup)
}

function* watchlogin() {
  yield takeEvery(ActionTypes.LOGIN, login)
}

function* watchGoogleLogin () {
  yield takeEvery(ActionTypes.GOOGLELOGIN , googlelogin)
}

function* watchForgatePassword () {
  yield takeEvery(ActionTypes.FORGATEPASSWORD , forgatePassword)
}

function* watchLogOut () {
  yield takeEvery(ActionTypes.LOGOUT, logout)
}

export function* authsaga() {
  yield all ([
    watchlogin(),
    watchSignup(),
    watchGoogleLogin(),
    watchForgatePassword(),
    watchLogOut(),
  ])
}