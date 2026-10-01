import { useState, useRef, useEffect } from "react";
import { Flag } from "../ui/flag/Flag"; 
import "./currency-input.css";

interface CurrencyInputProps {
  label: string; 
  amount: string;
  onChangeAmount?: (value: string) => void;
  selectedCurrency: string;
  onChangeCurrency: (currency: string) => void;
  readOnly?: boolean;
}

interface CurrencyItem {
  code: string;
  name: string;
  isPopular?: boolean;
}

const ALL_CURRENCIES: CurrencyItem[] = [
  { code: "EUR", name: "Euro", isPopular: true },
  { code: "GBP", name: "British Pound", isPopular: true },
  { code: "USD", name: "United States Dollar", isPopular: true },
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "TRY", name: "Turkish Lira" },
];

export function CurrencyInput({
  label,
  amount,
  onChangeAmount,
  selectedCurrency,
  onChangeCurrency,
  readOnly = false,
}: CurrencyInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCurrency =
    ALL_CURRENCIES.find((c) => c.code === selectedCurrency) || ALL_CURRENCIES[2];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCurrencies = ALL_CURRENCIES.filter(
    (cur) =>
      cur.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cur.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const popularCurrencies = filteredCurrencies.filter((cur) => cur.isPopular);
  const otherCurrencies = filteredCurrencies.filter((cur) => !cur.isPopular);

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
            onClick={() => setIsOpen(!isOpen)}>
            <Flag code={currentCurrency.code} width={24} height={24} />
            <span className="selected-code">{currentCurrency.code}</span>
            <span className={`arrow-icon ${isOpen ? "open" : ""}`}>▾</span>
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
              </div>

              <div className="options-list-scroll">
                {popularCurrencies.length > 0 && (
                  <div className="category-group">
                    <div className="category-header">
                      <span>POPULAR</span>
                      <span>{popularCurrencies.length}</span>
                    </div>
                    {popularCurrencies.map((cur) => (
                      <div
                        key={cur.code}
                        className={`currency-option-row ${selectedCurrency === cur.code ? "selected" : ""}`}
                        onClick={() => {
                          onChangeCurrency(cur.code);
                          setIsOpen(false);
                          setSearchQuery("");
                        }}>
                        <Flag code={cur.code} width={24} height={24} />
                        <div className="currency-info-text">
                          <span className="currency-code-text">{cur.code}</span>
                          <span className="currency-name-text">{cur.name}</span>
                        </div>
                        {selectedCurrency === cur.code && (
                          <span className="check-mark">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {otherCurrencies.length > 0 && (
                  <div className="category-group">
                    <div className="category-header">
                      <span>OTHER CURRENCIES</span>
                      <span>{otherCurrencies.length}</span>
                    </div>
                    {otherCurrencies.map((cur) => (
                      <div
                        key={cur.code}
                        className={`currency-option-row ${selectedCurrency === cur.code ? "selected" : ""}`}
                        onClick={() => {
                          onChangeCurrency(cur.code);
                          setIsOpen(false);
                          setSearchQuery("");
                        }}>
                        <Flag code={cur.code} width={24} height={24} />
                        <div className="currency-info-text">
                          <span className="currency-code-text">{cur.code}</span>
                          <span className="currency-name-text">{cur.name}</span>
                        </div>
                        {selectedCurrency === cur.code && (
                          <span className="check-mark">✓</span>
                        )}
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
