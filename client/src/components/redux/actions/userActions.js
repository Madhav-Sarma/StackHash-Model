// userActions.js

// Define action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// Action creator for login success
export const loginUser = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user, // This payload will be the user data from the API response
  };
};

// Action creator for login fail
export const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

// Action creator for logout
export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};
