import './currency-select.css';

interface CurrencySelectProps {
  fromCurrency: string;
  toCurrency: string;
  onChangeFrom: (currency: string) => void;
  onChangeTo: (currency: string) => void;
  onSwap: () => void;
}

export function CurrencySelect({
  fromCurrency,
  toCurrency,
  onChangeFrom,
  onChangeTo,
  onSwap,
}: CurrencySelectProps) {
  
  const currencies = [
    "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", 
    "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "ISK", 
    "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", 
    "RON", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
  ];

  return (
    <div className="select-container">

      <div className="select-box-group">
        <label className="select-label">Kaynak</label>
        <select
          className="custom-select"
          value={fromCurrency}
          onChange={(e) => onChangeFrom(e.target.value)}
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <button className="swap-button" onClick={onSwap} title="Kurları Değiştir">
        🔄
      </button>

      <div className="select-box-group">
        <label className="select-label">Hedef</label>
        <select
          className="custom-select"
          value={toCurrency}
          onChange={(e) => onChangeTo(e.target.value)}
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
