import CurrencyFactory from '../currencies';

describe('CurrencyFactory and Currency classes', () => {
  test('creates USD currency correctly', () => {
    const currency = CurrencyFactory.createCurrency('USD');
    expect(currency).toBeInstanceOf(Object);
    expect(currency.name).toBe('United States Dollar');
    expect(currency.code).toBe('USD');
    expect(currency.flag).toBe('🇺🇸');
    expect(currency.getCurrencyInfo()).toBe('🇺🇸 United States Dollar (USD)');
  });

  test('creates EUR currency correctly', () => {
    const currency = CurrencyFactory.createCurrency('EUR');
    expect(currency).toBeInstanceOf(Object);
    expect(currency.name).toBe('Euro');
    expect(currency.code).toBe('EUR');
    expect(currency.flag).toBe('🇪🇺');
    expect(currency.getCurrencyInfo()).toBe('🇪🇺 Euro (EUR)');
  });

  test('creates RUB currency correctly', () => {
    const currency = CurrencyFactory.createCurrency('RUB');
    expect(currency).toBeInstanceOf(Object);
    expect(currency.name).toBe('Russian Ruble');
    expect(currency.code).toBe('RUB');
    expect(currency.flag).toBe('🇷🇺');
    expect(currency.getCurrencyInfo()).toBe('🇷🇺 Russian Ruble (RUB)');
  });

  test('creates unknown currency for unsupported code', () => {
    const currency = CurrencyFactory.createCurrency('JPY');
    expect(currency).toBeInstanceOf(Object);
    expect(currency.name).toBe('Unknown');
    expect(currency.code).toBe('JPY');
    expect(currency.flag).toBe('\uD83C\uDFF3\uFE0F');
    expect(currency.getCurrencyInfo()).toBe('🏳️ Unknown (JPY)');
  });

  test('CurrencyBase provides correct info', () => {
    const baseCurrency = CurrencyFactory.createCurrency('UNKNOWN');
    expect(baseCurrency.name).toBe('Unknown');
    expect(baseCurrency.getCurrencyInfo()).toBe('🏳️ Unknown (UNKNOWN)');
  });
});