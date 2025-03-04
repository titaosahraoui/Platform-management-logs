import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer, { IAuthState } from './authSlice';

const isDev = process.env.REACT_APP_TARGET_DEPLOY === 'dev' || process.env.REACT_APP_TARGET_DEPLOY === 'edge';
// persist Config
const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer<IAuthState>(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: isDev,
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export const persistor = persistStore(store);
