import { useState, useRef, useEffect } from 'react';
import { Flag } from '../ui/flag/Flag'; 
import './currency-input.css';

interface CurrencyInputProps {
  label: string; 
  amount: string;
  onChangeAmount?: (value: string) => void;
  readOnly?: boolean; 
  selectedCurrency: string;
  onChangeCurrency: (currency: string) => void;
  children?: React.ReactNode; 
} 

interface CurrencyItem {
  code: string;
  name: string;
  flag: string;
  isPopular?: boolean;
}

const ALL_CURRENCIES: CurrencyItem[] = [
  { code: "EUR", name: "Euro", flag: "eu", isPopular: true },
  { code: "GBP", name: "British Pound", flag: "gb", isPopular: true },
  { code: "USD", name: "United States Dollar", flag: "us", isPopular: true },
  { code: "TRY", name: "Turkish Lira", flag: "tr", isPopular: true },
  { code: "AED", name: "United Arab Emirates Dirham", flag: "ae" },
  { code: "ARS", name: "Argentine Peso", flag: "ar" },
  { code: "AUD", name: "Australian Dollar", flag: "au" },
  { code: "BDT", name: "Bangladeshi Taka", flag: "bd" },
  { code: "BGN", name: "Bulgarian Lev", flag: "bg" },
  { code: "BRL", name: "Brazilian Real", flag: "br" },
  { code: "CAD", name: "Canadian Dollar", flag: "ca" },
  { code: "CHF", name: "Swiss Franc", flag: "ch" },
  { code: "CNY", name: "Chinese Yuan", flag: "cn" },
  { code: "CZK", name: "Czech Koruna", flag: "cz" },
  { code: "DKK", name: "Danish Krone", flag: "dk" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "hk" },
  { code: "HUF", name: "Hungarian Forint", flag: "hu" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "id" },
  { code: "ILS", name: "Israeli New Shekel", flag: "il" },
  { code: "INR", name: "Indian Rupee", flag: "in" },
  { code: "ISK", name: "Icelandic Króna", flag: "is" },
  { code: "JPY", name: "Japanese Yen", flag: "jp" },
  { code: "KRW", name: "South Korean Won", flag: "kr" },
  { code: "MXN", name: "Mexican Peso", flag: "mx" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "my" },
  { code: "NOK", name: "Norwegian Krone", flag: "no" },
  { code: "NZD", name: "New Zealand Dollar", flag: "nz" },
  { code: "PHP", name: "Philippine Peso", flag: "ph" },
  { code: "PLN", name: "Polish Złoty", flag: "pl" },
  { code: "RON", name: "Romanian Leu", flag: "ro" },
  { code: "SEK", name: "Swedish Krona", flag: "se" },
  { code: "SGD", name: "Singapore Dollar", flag: "sg" },
  { code: "THB", name: "Thai Baht", flag: "th" },
  { code: "ZAR", name: "South African Rand", flag: "za" }
];

export function CurrencyInput({ 
  label, 
  amount, 
  onChangeAmount, 
  readOnly = false, 
  selectedCurrency,
  onChangeCurrency,
  children 
}: CurrencyInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCurrency = ALL_CURRENCIES.find(c => c.code === selectedCurrency) || ALL_CURRENCIES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCurrencies = ALL_CURRENCIES.filter(cur =>
    cur.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cur.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularCurrencies = filteredCurrencies.filter(cur => cur.isPopular);
  const otherCurrencies = filteredCurrencies.filter(cur => !cur.isPopular);

  return (
    <div className="currency-box">
      <span className="box-label">{label}</span>
      <div className="box-content-wrapper">
        <input
          type="number"
          className="box-amount-input"
          value={amount}
          onChange={(e) => onChangeAmount?.(e.target.value)}
          readOnly={readOnly}
          placeholder="0"
        />
        
        <div className="custom-dropdown-container" ref={dropdownRef}>
          <button 
            type="button" 
            className="dropdown-trigger-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Flag code={currentCurrency.flag} />
            <span className="selected-code">{currentCurrency.code}</span>
            <span className={`arrow-icon ${isOpen ? 'open' : ''}`}>▾</span>
          </button>

          {isOpen && (
            <div className="dropdown-menu-panel">
              <div className="search-box-wrapper">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search currencies..." 
                  className="dropdown-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <span className="shortcut-hint">Ctrl K</span>
              </div>

              <div className="options-list-scroll">
                {/* POPULAR KATEGORİSİ */}
                {popularCurrencies.length > 0 && (
                  <div className="category-group">
                    <div className="category-header">
                      <span>POPULAR</span>
                      <span>{popularCurrencies.length}</span>
                    </div>
                    {popularCurrencies.map((cur) => (
                      <div 
                        key={cur.code} 
                        className={`currency-option-row ${selectedCurrency === cur.code ? 'selected' : ''}`}
                        onClick={() => {
                          onChangeCurrency(cur.code);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        <Flag code={cur.flag} />
                        <div className="currency-info-text">
                          <span className="currency-code-text">{cur.code}</span>
                          <span className="currency-name-text">{cur.name}</span>
                        </div>
                        {selectedCurrency === cur.code && <span className="check-mark">✓</span>}
                      </div>
                    ))}
                  </div>
                )}

                {/* OTHER CURRENCIES KATEGORİSİ */}
                {otherCurrencies.length > 0 && (
                  <div className="category-group">
                    <div className="category-header">
                      <span>OTHER CURRENCIES</span>
                      <span>{otherCurrencies.length}</span>
                    </div>
                    {otherCurrencies.map((cur) => (
                      <div 
                        key={cur.code} 
                        className={`currency-option-row ${selectedCurrency === cur.code ? 'selected' : ''}`}
                        onClick={() => {
                          onChangeCurrency(cur.code);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        <Flag code={cur.flag} />
                        <div className="currency-info-text">
                          <span className="currency-code-text">{cur.code}</span>
                          <span className="currency-name-text">{cur.name}</span>
                        </div>
                        {selectedCurrency === cur.code && <span className="check-mark">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
