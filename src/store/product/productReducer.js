import * as actionType from "../type";
const initialState = {
  data: [],
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
        data: action.product,
      };
    case actionType.GET_PRODUCT_ITEM_FAIL:
      return {
        ...state,
        error: action.error.message,
      };
    default:
      return state;
  }
};
export default productReducer;
