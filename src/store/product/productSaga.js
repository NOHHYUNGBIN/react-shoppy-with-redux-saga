import { all, takeLatest, call, put, takeEvery } from "redux-saga/effects";
import * as actionType from "../type";
import { getProducts } from "../../api/firebase";

const getProductAPI = async () => {
  try {
    const response = await getProducts();
    console.debug("response", response);
    return response;
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};
function* getProductItem() {
  try {
    const product = yield call(getProductAPI);
    yield put({
      type: actionType.GET_PRODUCT_ITEM_SUCCESS,
      product,
    });
  } catch (err) {
    yield put({
      type: actionType.GET_PRODUCT_ITEM_FAIL,
      error: err,
    });
  }
}
export default function* productSaga() {
  yield all([takeEvery(actionType.GET_PRODUCT_ITEM_REQ, getProductItem)]);
}
