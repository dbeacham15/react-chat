import React from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.css';
import './index.css';
import Chat from './containers/Chat';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/rootReducer';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={ store }><Chat /></Provider>, document.getElementById('root'));
registerServiceWorker();
