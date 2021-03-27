import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/authReducer';
import postListReducer from './store/reducers/postListReducer';
import postCreateReducer from './store/reducers/postCreateReducer'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null;

const rootReducer = combineReducers({
	auth: authReducer,
	postList: postListReducer,
	postCreate: postCreateReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

axios.defaults.baseURL = 'http://nodereactyipyap-env-1.eba-mwcvsmid.us-east-2.elasticbeanstalk.com/'

axios.interceptors.request.use(function (config) {
	const token = store.getState().auth.token;
	config.headers.authorization = token
	return config;
  }, null, { synchronous: true });

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