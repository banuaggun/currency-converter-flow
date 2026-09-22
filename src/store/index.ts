import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import currencyReducer from './currencySlice';
import { currencyApi } from './currencyApi';
import { pairsApi } from './pairsApi'; 

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
    [pairsApi.reducerPath]: pairsApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(currencyApi.middleware)
      .concat(pairsApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
