import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/styles/bootstrap.scss'
import { Provider } from 'react-redux'
import configStore from "./store";
import 'react-notifications/lib/notifications.css';
import { setupInterceptors } from "./plugins/axios";

// const store = (async () => configStore())();
const store = configStore();
setupInterceptors(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
