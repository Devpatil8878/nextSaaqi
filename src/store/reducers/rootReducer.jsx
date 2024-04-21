// reducers.js
import { LOGIN, LOGOUT, TOGGLE_DARK_MODE, SET_USER, SET_USERFULLINFO, SET_TEMPUSER, SET_STORYCLICKED, setSTORYCLICKEDTRUE, setSTORYCLICKEDFALSE } from '../actions/index';

const initialState = {
  isLoggedIn: false,
  isDarkMode: true,
  user: {},
  fullUserInfo: {},
  tempUser: {},
  isStoryClicked: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_USERFULLINFO:
      return {
        ...state,
        fullUserInfo: action.payload
      };
    case SET_TEMPUSER:
      return{
        ...state,
        tempUser: action.payload
      };
    case SET_STORYCLICKED:
      return{
        ...state,
        isStoryClicked: action.payload
      }

    default:
      return state;
  }
};

export default rootReducer;
