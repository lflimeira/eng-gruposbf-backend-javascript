import { mock as mongodbMock, MongoDBConnector } from "@lflimeira/mongodb";

import addCurrency from "../add-currency";

const buildMock = (mocks?: { mongodb?: Partial<MongoDBConnector> }) => {
  return {
    MongoDB: {
      ...mongodbMock(),
      ...mocks?.mongodb,
    },
  };
};

describe("addCurrency", () => {
  beforeEach(jest.clearAllMocks);

  const Logger = {
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    metrify: jest.fn(),
  };

  const input = {
    currencyCode: "EUR",
    country: "Países da União Europeia",
  };

  it("should throw an error because input is not valid", async () => {
    const { MongoDB } = buildMock();

    await expect(
      addCurrency(
        MongoDB,
        Logger
      )({
        currencyCode: "ABCD",
        country: "Países da União Europeia",
      } as any)
    ).rejects.toThrowError(
      '[{"code":"too_big","maximum":3,"type":"string","inclusive":true,"message":"String must contain at most 3 character(s)","path":["currencyCode"]}]:--:BAD_USER_INPUT'
    );
  });

  it("should throw an error when mongodb's findOne throws an error", async () => {
    const findOne = jest.fn().mockRejectedValue(new Error());
    const { MongoDB } = buildMock({
      mongodb: {
        findOne,
      },
    });

    await expect(addCurrency(MongoDB, Logger)(input)).rejects.toThrowError(
      "Get currency failed:--:GET_CURRENCY_FAILED"
    );
  });

  it("should return an existing currency if there's one already registered", async () => {
    const findOne = jest.fn().mockResolvedValue(input);
    const { MongoDB } = buildMock({
      mongodb: {
        findOne,
      },
    });

    const info = jest.fn();
    const LoggerMocked = {
      ...Logger,
      info,
    };

    const result = await addCurrency(MongoDB, LoggerMocked)(input);

    expect(info).toBeCalledWith({
      message: "Currency already registered",
      details: { currency: input },
    });
    expect(result).toEqual({
      currencyCode: "EUR",
      country: "Países da União Europeia",
    });
  });

  it("should throw an error when mongodb's insert throws an error", async () => {
    const findOne = jest.fn().mockResolvedValue(undefined);
    const insert = jest.fn().mockRejectedValue(new Error());
    const { MongoDB } = buildMock({
      mongodb: {
        findOne,
        insert,
      },
    });

    await expect(addCurrency(MongoDB, Logger)(input)).rejects.toThrowError(
      "Insert currency failed:--:INSERT_CURRENCY_FAILED"
    );
  });

  it("should return the created currency after call mongodb's insert", async () => {
    const findOne = jest.fn().mockResolvedValue(undefined);
    const insert = jest.fn().mockResolvedValue({
      acknowledged: true,
      insertedId: "6435e0d16bcc1124320afbb9",
    });
    const { MongoDB } = buildMock({
      mongodb: {
        findOne,
        insert,
      },
    });

    const info = jest.fn();
    const LoggerMocked = {
      ...Logger,
      info,
    };

    const result = await addCurrency(MongoDB, LoggerMocked)(input);

    expect(info).toBeCalledWith({
      message: "Currency inserted successfully",
      details: {
        currency: input,
        insertResult: {
          acknowledged: true,
          insertedId: "6435e0d16bcc1124320afbb9",
        },
      },
    });
    expect(insert).toHaveBeenCalledWith({
      collection: "currencies",
      item: input,
    });
    expect(result).toEqual({
      currencyCode: "EUR",
      country: "Países da União Europeia",
    });
  });
});
