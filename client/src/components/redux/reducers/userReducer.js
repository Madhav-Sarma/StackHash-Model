// userReducer.js

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/userActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload, // Updates the user in the state with the payload from action
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload, // Stores the error message
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
