import { QuotationConnector } from "./types/quotation";

export default (): QuotationConnector => {
  return {
    getQuotation: jest.fn(),
  };
};
