import { useState, useRef, useEffect } from "react";
import { Flag } from "../ui/flag/Flag"; 
import "./currency-input.css";
import { CheckIcon, PlayIcon, SearchIcon } from "../ui/icons/icons";

interface CurrencyItem {
  code: string;
  name: string;
  isPopular?: boolean;
}

interface CurrencyInputProps {
  label: string; 
  amount: string;
  onChangeAmount?: (value: string) => void;
  selectedCurrency: string;
  onChangeCurrency: (currency: string) => void;
  currencies: CurrencyItem[]; 
  readOnly?: boolean;
}

export function CurrencyInput({
  label,
  amount,
  onChangeAmount,
  selectedCurrency,
  onChangeCurrency,
  currencies = [], 
  readOnly = false,
}: CurrencyInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCurrency =
    currencies.find((c) => c.code.toUpperCase() === selectedCurrency.toUpperCase()) || 
    { code: selectedCurrency, name: "Currency" };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCurrencies = currencies.filter(
    (cur) =>
      cur.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cur.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <span className={`arrow-icon ${isOpen ? "open" : ""}`}>
              <PlayIcon />
            </span>
          </button>

          {isOpen && (
            <div className="dropdown-menu-panel">
              <div className="search-box-wrapper">
                <span className="search-icon">
                  <SearchIcon />
                </span>
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
                        className={`currency-option-row ${selectedCurrency.toUpperCase() === cur.code.toUpperCase() ? "selected" : ""}`}
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
                        {selectedCurrency.toUpperCase() === cur.code.toUpperCase() && (
                          <span className="check-mark">
                            <CheckIcon />
                          </span>
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
                        className={`currency-option-row ${selectedCurrency.toUpperCase() === cur.code.toUpperCase() ? "selected" : ""}`}
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
                        {selectedCurrency.toUpperCase() === cur.code.toUpperCase() && (
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
