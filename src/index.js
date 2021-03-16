import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import axios from 'axios'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import postListReducer from './store/reducers/postListReducer'
import postCreateReducer from './store/reducers/postCreateReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  postCreate: postCreateReducer,
  postList: postListReducer
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))


axios.defaults.baseURL= 'http://localhost:4200'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

