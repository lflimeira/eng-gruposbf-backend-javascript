import { mock as mongodbMock, MongoDBConnector } from "@lflimeira/mongodb";

import listCurrenciesExchange from "../list-currencies-exchange";

const buildMock = (mocks?: { mongodb?: Partial<MongoDBConnector> }) => {
  return {
    MongoDB: {
      ...mongodbMock(),
      ...mocks?.mongodb,
    },
  };
};

describe("listCurrenciesExchange", () => {
  beforeEach(jest.clearAllMocks);

  const Logger = {
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    metrify: jest.fn(),
  };

  const input = {
    amount: 5000,
  };

  it("should throw an error because input is not valid", async () => {
    const { MongoDB } = buildMock();

    await expect(
      listCurrenciesExchange(
        MongoDB,
        Logger
      )({
        amount: -50,
      } as any)
    ).rejects.toThrowError(
      '[{"code":"too_small","minimum":0,"type":"number","inclusive":false,"message":"Number must be greater than 0","path":["amount"]}]:--:BAD_USER_INPUT'
    );
  });

  it("should throw an error when mongodb's findAll throws an error", async () => {
    const findAll = jest.fn().mockRejectedValue(new Error());
    const { MongoDB } = buildMock({
      mongodb: {
        findAll,
      },
    });

    await expect(
      listCurrenciesExchange(MongoDB, Logger)(input)
    ).rejects.toThrowError("List currencies failed:--:LIST_CURRENCIES_FAILED");
  });

  it("should return all currencies registered in the database", async () => {
    const currencies = [
      {
        currencyCode: "EUR",
        country: "Países da União Europeia",
      },
    ];
    const findAll = jest.fn().mockResolvedValue(currencies);
    const { MongoDB } = buildMock({
      mongodb: {
        findAll,
      },
    });

    const result = await listCurrenciesExchange(MongoDB, Logger)(input);

    expect(result).toEqual([
      {
        currencyCode: "EUR",
        country: "Países da União Europeia",
        amount: 0,
      },
    ]);
  });
});
