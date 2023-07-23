import { put, takeLatest, call } from "redux-saga/effects";
import {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFail,
} from "./action";
import { logOut, signIn, signUp } from "../../api/firebase";
import * as actionType from "../type";
function* handleSignUp(action) {
  try {
    const { email, password } = action.payload;
    yield call(signUp, email, password);
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

function* handleSignIn(action) {
  const { email, password } = action.payload;
  try {
    const user = yield call(signIn, email, password);
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFail(error.message));
  }
}
function* handleLogOut() {
  try {
    yield call(logOut);
  } catch (error) {
    console.debug("error", error);
  }
}

export function* authSaga() {
  yield takeLatest(actionType.SIGN_UP_REQ, handleSignUp);
  yield takeLatest(actionType.SIGN_IN_REQ, handleSignIn);
  yield takeLatest(actionType.LOG_OUT, handleLogOut);
}
