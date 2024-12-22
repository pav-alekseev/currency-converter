class CurrencyBase {
  constructor(name, code, flag) {
    this.name = name;
    this.code = code;
    this.flag = flag;
  }

  getCurrencyInfo() {
    return `${this.flag} ${this.name} (${this.code})`;
  }
}

class CurrencyUSD extends CurrencyBase {
  constructor() {
    super("United States Dollar", "USD", "\uD83C\uDDFA\uD83C\uDDF8");
  }
}

class CurrencyEUR extends CurrencyBase {
  constructor() {
    super("Euro", "EUR", "\uD83C\uDDEA\uD83C\uDDFA");
  }
}

class CurrencyRUB extends CurrencyBase {
  constructor() {
    super("Russian Ruble", "RUB", "\uD83C\uDDF7\uD83C\uDDFA");
  }
}

class CurrencyFactory {
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

export const currencies = ["USD", "EUR", "RUB"];

export default CurrencyFactory;
