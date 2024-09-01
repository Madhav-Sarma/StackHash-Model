// userReducer.js

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/userActions';

const initialState = {
  user: null,
  token: localStorage.getItem('token'), // Initialize token from local storage
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user, // Stores user data
        token: action.payload.token, // Stores the token
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
        token: null,
      };
    default:
      return state;
  }
};

export default userReducer;
