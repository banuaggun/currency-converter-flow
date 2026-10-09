function calculateResult(amount: number, rate: number): number {
  return amount * rate;
}

export function runManualTests() {
  console.log("%c [ARCHITECTURE LOG] Starting Unit Tests...", "color: #4f46e5; font-weight: bold;");

  const test1 = calculateResult(100, 34.25);
 if (test1 === 3425) {
    console.log("%c Test 1 Successful: The math engine multiplies correctly.", "color: #10b981;");
  } else {
    console.error("Test 1 Failed!", test1);
  }

  const test2 = calculateResult(0, 34.25);
  if (test2 === 0) {
    console.log("%c Test 2 Successful: Zero amount safely returns 0.", "color: #10b981;");
  } else {
    console.error("Test 2 Failed!", test2);
  }

}


export async function runLiveApiIntegrationTest() {
  console.log("%c [INTEGRATION] Live API Connection Test Starting...", "color: #0284c7; font-weight: bold;");

  const baseUrl = "https://api.frankfurter.dev/v2/"; 
  const endpoint = "rates?base=";
  const familyOfCurrencies = [
  "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", 
  "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "ISK", 
  "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", 
  "RON", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
];
const randomIndex = Math.floor(Math.random() * familyOfCurrencies.length);
const targetCurrency = familyOfCurrencies[randomIndex];

  const apiUrl = baseUrl + endpoint + targetCurrency; 

  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API did not respond. Status Code: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      console.log(`%c Integration Successful: Frankfurter API is up and data flow is active! (Number of rates received: ${data.length})`, "color: #10b981; font-weight: bold;");
    } else {
      console.warn(" API connected but the incoming data format is not an array!", data);
    }

  } catch (error: any) {
    console.error("%c Integration Failed! Detail:", "color: #ef4444; font-weight: bold;", error.message);
  }

}
