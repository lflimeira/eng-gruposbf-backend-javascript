import { DomainError } from "../../utils";

export enum Errors {
  INSERT_CURRENCY_FAILED = "INSERT_CURRENCY_FAILED",
  GET_CURRENCY_FAILED = "GET_CURRENCY_FAILED",
  LIST_CURRENCIES_FAILED = "LIST_CURRENCIES_FAILED",
}

export class InsertCurrencyFailedError extends DomainError {
  constructor(message = "Insert currency failed") {
    super(message, Errors.INSERT_CURRENCY_FAILED);
  }
}

export class GetCurrencyFailedError extends DomainError {
  constructor(message = "Get currency failed") {
    super(message, Errors.GET_CURRENCY_FAILED);
  }
}

export class ListCurrenciesFailedError extends DomainError {
  constructor(message = "List currencies failed") {
    super(message, Errors.LIST_CURRENCIES_FAILED);
  }
}
