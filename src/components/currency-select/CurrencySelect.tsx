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
  // Şimdilik sahte döviz listesi (İleride API'den dinamik gelecek)
  const currencies = ["USD", "TRY", "EUR", "GBP", "JPY", "CAD", "AUD"];

  return (
    <div className="select-container">
      {/* 1. NEREDEN KUTUSU */}
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

      {/* 🔄 TAKAS BUTONU */}
      <button className="swap-button" onClick={onSwap} title="Kurları Değiştir">
        🔄
      </button>

      {/* 2. NEREYE KUTUSU */}
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
