import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import rootReducer, { rootSaga } from './modules';
import rootReducer, {rootSaga} from './module/rootReducer';
import { configureStore } from '@reduxjs/toolkit';


const sagaMiddleware = createSagaMiddleware();

// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const store = configureStore({ reducer: rootReducer, middleware: [sagaMiddleware]})

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);