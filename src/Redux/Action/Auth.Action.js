import * as ActionTypes from "../ActionTypes"

export const LoginAction = (values) => (dispatch) => {
    dispatch ({type : ActionTypes.LOGIN , payload : values})
}

export const SignupAction = (values) => (dispatch) => {
    dispatch({type: ActionTypes.SIGNUP , payload : values})
}

export const GoogleLoginAction = (values) => (dispatch) => {
    dispatch({type: ActionTypes.GOOGLELOGIN})
}

export const signedinAction = (values) => (dispatch) => {
    dispatch ({type: ActionTypes.SIGNEDIN , payload : values})
}

export const forgatePasswordAction = (values) => (dispatch) => {
    dispatch({type : ActionTypes.FORGATEPASSWORD  , payload : values})
}

export const LogOutAction = () => (dispatch) => {
    dispatch({type : ActionTypes.LOGOUT})
}

export const LoggedInAction = (values) => (dispatch) => { 
    dispatch({type : ActionTypes.LOGGEDIN , payload : values})
}

export const ForgatedPasswordAction = (values) => (dispatch) => {
    dispatch({type : ActionTypes.FORGATEDPASSWORD, payload : values})
}

export const LoggedOutAction = () => (dispatch) => {
    dispatch ({type : ActionTypes.LOGGEDOUT})
}