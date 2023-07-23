import { combineReducers } from "redux";
import productReducer from "./product/productReducer";
import { all, fork } from "redux-saga/effects";
import productSaga from "./product/productSaga";
import authReducer from "./user/authReducer";
import { authSaga } from "./user/authSaga";

export const rootReducers = combineReducers({
  product: productReducer,
  auth: authReducer,
});

export default function* rootSagas() {
  yield all([fork(productSaga), fork(authSaga)]);
}
