import { applyMiddleware, combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import {thunk} from 'redux-thunk'; // Corrected import

// Import other reducers
import movieReducer from './reducers/movieReducer'; // Example reducer, adjust based on your setup
import userReducer from './reducers/userReducer';   // Import userReducer to manage user state

// Combine all reducers into the root reducer
const rootReducer = combineReducers({
  movies: movieReducer,
  user: userReducer, // Add the user reducer to handle authentication state
});

// Create the store with the middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
