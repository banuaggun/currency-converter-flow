import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
}

const initialState: CurrencyState = {
  amount: '1',
  fromCurrency: 'USD',
  toCurrency: 'TRY',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    setFromCurrency: (state, action: PayloadAction<string>) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<string>) => {
      state.toCurrency = action.payload;
    },
    swapCurrencies: (state) => {
      const temp = state.fromCurrency;
      state.fromCurrency = state.toCurrency;
      state.toCurrency = temp;
    },
  },
});

export const { setAmount, setFromCurrency, setToCurrency, swapCurrencies } = currencySlice.actions;
export default currencySlice.reducer;
