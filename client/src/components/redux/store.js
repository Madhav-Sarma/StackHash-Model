import { applyMiddleware, combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';  // Corrected import to use named import

import movieReducer from './reducers/movieReducer';

const rootReducer = combineReducers({
    movies: movieReducer
});

// Create the store with the middleware
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
