import './currency-input.css';

interface CurrencyInputProps {
  amount: string;
  onChangeAmount: (value: string) => void;
}

// React.FC kullanmadan, doğrudan fonksiyonun kendisini export ediyoruz:
export function CurrencyInput({ amount, onChangeAmount }: CurrencyInputProps) {
  return (
    <div className="input-field-group">
      <label className="input-label" htmlFor="amount-input">Miktar</label>
      <input
        id="amount-input"
        type="number"
        className="custom-input"
        value={amount}
        onChange={(e) => onChangeAmount(e.target.value)}
      />
    </div>
  );
}
