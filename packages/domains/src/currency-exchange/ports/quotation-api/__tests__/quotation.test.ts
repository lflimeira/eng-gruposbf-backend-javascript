import { QuotationPort } from "../";

const mockStatus = 200;
const mockRedirected = false;

jest.mock("node-fetch", () =>
  jest.fn().mockImplementation((url) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        const json =
          url === `https://economia.awesomeapi.com.br/last/EUR-BRL`
            ? () => Promise.reject()
            : () => Promise.resolve({ USDBRL: { high: "5.70" } });
        return resolve({
          ok: true,
          json,
          status: mockStatus,
          redirected: mockRedirected,
          headers: {
            raw: () => ({}),
            get: () => "application/json",
          },
        });
      })
    );
  })
);

describe("Quotation", () => {
  beforeEach(jest.clearAllMocks);

  const Logger = {
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    metrify: jest.fn(),
  };

  const Quotation = QuotationPort(Logger);

  const currencyCode = "EUR";

  it("should throw an error because fetch returns an invalid response", async () => {
    await expect(Quotation.getQuotation(currencyCode)).rejects.toThrowError(
      "Get quotation failed:--:GET_QUOTATION_FAILED"
    );
  });

  it("should return the currency quotation", async () => {
    const info = jest.fn();
    const LoggerMocked = {
      ...Logger,
      info,
    };

    const newQuotation = QuotationPort(LoggerMocked);
    const result = await newQuotation.getQuotation("USD");

    expect(info).toBeCalledWith({
      message: "Quotation got successfully",
      details: {
        quotation: {
          amount: 5.7,
          currencyCode: "USD",
        },
      },
    });
    expect(result).toEqual(5.7);
  });
});
