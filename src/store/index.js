import { combineReducers } from "redux";
import productReducer from "./product/productReducer";
import { all, fork } from "redux-saga/effects";
import productSaga from "./product/productSaga";
export const rootReducers = combineReducers({
  product: productReducer,
});

export default function* rootSagas() {
  yield all([fork(productSaga)]);
}
