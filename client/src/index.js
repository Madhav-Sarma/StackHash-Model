import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './components/redux/store';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {disableReactDevTools} from '@fvilers/disable-react-devtools';
if (process.env.NODE_ENV==='production') disableReactDevTools()
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
