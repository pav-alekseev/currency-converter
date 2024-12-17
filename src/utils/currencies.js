export class CurrencyBase {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  getCurrencyInfo() {
    return `${this.name} (${this.code})`;
  }
}

export class CurrencyUSD extends CurrencyBase {
  constructor() {
    super("United States Dollar", "USD");
  }
}

export class CurrencyEUR extends CurrencyBase {
  constructor() {
    super("Euro", "EUR");
  }
}

export class CurrencyRUB extends CurrencyBase {
  constructor() {
    super("Russian Ruble", "RUB");
  }
}

export class CurrencyFactory {
  static createCurrency(currencyCode) {
    switch (currencyCode) {
      case "USD":
        return new CurrencyUSD();
      case "EUR":
        return new CurrencyEUR();
      case "RUB":
        return new CurrencyRUB();
      default:
        return new CurrencyBase("Unknown", currencyCode);
    }
  }
}
