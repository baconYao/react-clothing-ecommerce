import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';

import rootReducer from './root-reducer';

const sagaMiddleare = createSagaMiddleware();

var middlewares = [sagaMiddleare];

// 上傳到 heroku 就會自動變成 production，因此 logger 的訊息不會顯示在 browser's console
if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleare.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };