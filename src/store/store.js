import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'isAuthenticated', 'accessToken' , 'userType'],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Configure the store with only the user reducer
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

// Create a persistor object
const persistor = persistStore(store);

export { store, persistor };
