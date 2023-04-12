import { DomainError } from "../../../../utils";

export enum Errors {
  GET_QUOTATION_FAILED = "GET_QUOTATION_FAILED",
}

export class GetQuotationFailedError extends DomainError {
  constructor(message = "Get quotation failed") {
    super(message, Errors.GET_QUOTATION_FAILED);
  }
}
