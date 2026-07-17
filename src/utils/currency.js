const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.5 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53 },
]

export function convertPrice(priceUSD, currencyCode) {
  const currency = currencies.find(c => c.code === currencyCode) || currencies[0]
  const converted = priceUSD * currency.rate
  if (currency.code === 'JPY') return `${currency.symbol}${Math.round(converted).toLocaleString()}`
  return `${currency.symbol}${converted.toFixed(2)}`
}

export function getCurrencies() {
  return currencies
}

export function getCurrency(code) {
  return currencies.find(c => c.code === code) || currencies[0]
}
