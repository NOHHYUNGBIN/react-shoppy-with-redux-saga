import * as actionType from "../type";
const initialState = {
  productList: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCT_ITEM_REQ:
      return {
        ...state,
        error: null,
      };
    case actionType.GET_PRODUCT_ITEM_SUCCESS:
      return {
        ...state,
        productList: action.data,
      };
    case actionType.GET_PRODUCT_ITEM_FAIL:
      console.debug("action", action);
      return {
        ...state,
        error: action.error.message,
      };
    default:
      return state;
  }
};
export default productReducer;
