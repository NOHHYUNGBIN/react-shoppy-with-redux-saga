import { all, takeLatest, call, put } from "redux-saga/effects";
import * as actionType from "../type";
import axios from "axios";

const getProductAPI = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products1111");
    return response.data;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};
function* getProductItem() {
  try {
    const product = yield call(getProductAPI);
    yield put({
      type: actionType.GET_PRODUCT_ITEM_SUCCESS,
      data: product,
    });
  } catch (err) {
    yield put({
      type: actionType.GET_PRODUCT_ITEM_FAIL,
      error: err,
    });
  }
}
export default function* productSaga() {
  yield all([takeLatest(actionType.GET_PRODUCT_ITEM_REQ, getProductItem)]);
}
