import { useAppDispatch, useAppSelector } from '../../store'; 
import { CurrencyInput } from '../currency-input/CurrencyInput';
import { CurrencySelect } from '../currency-select/CurrencySelect';
import { ResultDisplay } from '../result-display/ResultDisplay';
import { setAmount, setFromCurrency, setToCurrency, swapCurrencies } from '../../store/currencySlice'; // Redux aksiyonları
import './converter-card.css';

export function ConverterCard() { 
  const dispatch = useAppDispatch();

  // Redux beynindeki verileri (state) uygulamaya çekiyoruz
  const amount = useAppSelector((state) => state.currency.amount);
const fromCurrency = useAppSelector((state) => state.currency.fromCurrency);
const toCurrency = useAppSelector((state) => state.currency.toCurrency);

  // Aksiyonları tetiklemek (dispatch) için fonksiyonlar
  const handleAmountChange = (value: string) => {
    dispatch(setAmount(value));
  };

  const handleFromChange = (currency: string) => {
    dispatch(setFromCurrency(currency));
  };

  const handleToChange = (currency: string) => {
    dispatch(setToCurrency(currency));
  };

  const handleSwap = () => {
    dispatch(swapCurrencies());
  };

  return (
    <div className="converter-card">
      <h1 className="converter-title">Currency Flow</h1> 

      {/* Miktar Giriş Alanı */}
      <CurrencyInput amount={amount} onChangeAmount={handleAmountChange} />
      
      {/* Döviz Seçim Alanı */}
      <CurrencySelect 
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        onChangeFrom={handleFromChange}
        onChangeTo={handleToChange}
        onSwap={handleSwap}
      />

      {/* Sonuç Ekranı */}
      <ResultDisplay 
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    </div>
  );
}
