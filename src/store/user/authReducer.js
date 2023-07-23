import * as actionType from "../type";

const initialState = {
  loading: false,
  error: null,
  signUpSuccess: false,
  signInSuccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SIGN_UP_REQ: //회원가입 요청
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionType.SIGN_UP_SUCCESS: //회원가입 성공
      return {
        ...state,
        signUpSuccess: true,
        loading: false,
      };
    case actionType.SIGN_UP_FAIL: //회원가입 실패
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionType.SIGN_IN_REQ: //로그인 요청
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionType.SIGN_IN_SUCCESS: //로그인 성공
      return {
        ...state,
        loading: false,
        signInSuccess: true,
      };
    case actionType.SIGN_IN_FAIL: //로그인 실패
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionType.LOG_OUT: //로그아웃
      return {
        ...state,
        signInSuccess: false,
      };
    default:
      return state;
  }
};
export default authReducer;
