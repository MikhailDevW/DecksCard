import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App/App.jsx';
//import reportWebVitals from './reportWebVitals';
import { rootReducer } from './services/reducers/rootReducer.js';
import { compose, createStore, applyMiddleware } from 'redux';
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
