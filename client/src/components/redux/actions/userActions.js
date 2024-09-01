// userActions.js

// Define action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// Action creator for login success
export const loginUser = (userData) => {
  // Save token to local storage
  localStorage.setItem('token', userData.token);

  return {
    type: LOGIN_SUCCESS,
    payload: userData, // Payload contains user data and token
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
  // Remove token from local storage on logout
  localStorage.removeItem('token');

  return {
    type: LOGOUT,
  };
};
