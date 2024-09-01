import { applyMiddleware, combineReducers, compose } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import {thunk} from 'redux-thunk';

// Import other reducers
import movieReducer from './reducers/movieReducer';
import userReducer from './reducers/userReducer';

// Combine all reducers into the root reducer
const rootReducer = combineReducers({
  movies: movieReducer,
  user: userReducer,
});

// Setup Redux DevTools with a configuration option
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

// Create the store with middleware
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
