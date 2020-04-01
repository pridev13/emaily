import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';

//custom
import App from './components/App';
import reducers from './reducers';

//CSS
import 'materialize-css/dist/css/materialize.min.css';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose);

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware()));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
