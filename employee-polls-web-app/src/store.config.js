import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import middleware from "./middlewares";

import rootReducer from './reducers'
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

const storeAndPersistor = {store, persistor};
 
export default storeAndPersistor;