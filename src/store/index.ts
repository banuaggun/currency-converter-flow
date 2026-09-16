// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import currencyReducer from './currencySlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

// Temel TypeScript tiplerini çıkartıyoruz
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 🌟 İŞTE EKSİK OLAN VE HATAYI ÇÖZECEK ÖZEL HOOK'LAR:
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
