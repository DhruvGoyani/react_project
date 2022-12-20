import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { rootReducer } from '../Reducer/Root_Reducer'
import rootsaga from "../Saga/Root_saga"


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware()

const middleware = [thunk , sagaMiddleware]

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
)

export let persistor = persistStore(store);

sagaMiddleware.run(rootsaga)

