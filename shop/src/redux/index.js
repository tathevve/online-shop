import {combineReducers, configureStore} from '@reduxjs/toolkit';
import appReducer from './slicers/app';


const combinedReducers = combineReducers({
  app: appReducer,
});

const rootReducer = (state, action) =>
  combinedReducers(state, action);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false
  }),
});

export default store;