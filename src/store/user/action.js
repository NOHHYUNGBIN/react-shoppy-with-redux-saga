import * as actionType from "../type";
export const signUpReq = (email, password) => ({
  type: actionType.SIGN_UP_REQ,
  payload: { email, password },
});
export const signUpSuccess = () => ({
  type: actionType.SIGN_UP_SUCCESS,
});
export const signUpFailure = (error) => ({
  type: actionType.SIGN_UP_FAIL,
  payload: error,
});
export const signInReq = (email, password) => ({
  type: actionType.SIGN_IN_REQ,
  payload: { email, password },
});
export const signInSuccess = (user) => ({
  type: actionType.SIGN_IN_SUCCESS,
  payload: user,
});
export const signInFail = (error) => ({
  type: actionType.SIGN_IN_FAIL,
  payload: error,
});
export const LogOut = () => ({
  type: actionType.LOG_OUT,
});
