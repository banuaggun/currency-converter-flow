import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  rates: { [key: string]: number };
  isLoading: boolean;
  error: string | null;
}

// Uygulama ilk açıldığındaki başlangıç değerleri (Initial State)
const initialState: CurrencyState = {
  amount: '100',
  fromCurrency: 'USD',
  toCurrency: 'TRY',
  rates: {},
  isLoading: false,
  error: null,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  // Beynin içindeki fonksiyonlar (State'i değiştirecek reducer'lar)
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

// Fonksiyonları bileşenlerde kullanabilmek için export ediyoruz
export const { setAmount, setFromCurrency, setToCurrency, swapCurrencies } = currencySlice.actions;

// Store'a tanıtmak için reducer'ı export ediyoruz
export default currencySlice.reducer;
