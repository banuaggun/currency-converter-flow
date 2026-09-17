function calculateResult(amount: number, rate: number): number {
  return amount * rate;
}

export function runManualTests() {
  console.log("%c🧪 [MİMARİ GÜNLÜK] Birim Testleri Başlatılıyor...", "color: #4f46e5; font-weight: bold;");

  const test1 = calculateResult(100, 34.25);
  if (test1 === 3425) {
    console.log("%c✅ Test 1 Başarılı: Matematik motoru doğru çarpıyor.", "color: #10b981;");
  } else {
    console.error("❌ Test 1 Başarısız!", test1);
  }

  const test2 = calculateResult(0, 34.25);
  if (test2 === 0) {
    console.log("%c✅ Test 2 Başarılı: Sıfır miktarı güvenli şekilde 0 döndürüyor.", "color: #10b981;");
  } else {
    console.error("❌ Test 2 Başarısız!", test2);
  }
}


export async function runLiveApiIntegrationTest() {
  console.log("%c🌐 [ENTEGRASYON] Canlı API Bağlantı Testi Başlatılıyor...", "color: #0284c7; font-weight: bold;");

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
      throw new Error(`API yanıt vermedi. Durum Kodu: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      console.log(`%c✅ Entegrasyon Başarılı: Frankfurter API ayakta ve veri akışı aktif! (Gelen kur sayısı: ${data.length})`, "color: #10b981; font-weight: bold;");
    } else {
      console.warn("⚠️ API bağlandı fakat gelen veri formatı dizi (array) değil!", data);
    }

  } catch (error: any) {
    console.error("%c❌ Entegrasyon Başarısız! Detay:", "color: #ef4444; font-weight: bold;", error.message);
  }
}
