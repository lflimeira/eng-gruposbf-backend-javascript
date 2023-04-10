import mongodb from "../client";

const insertOne = jest.fn();
const mockConnect = jest.fn();
const findOne = jest.fn();
const find = jest.fn();
const mockCollection = jest.fn().mockImplementation(() => ({
  insertOne: insertOne,
  findOne: findOne,
  find: find,
}));
const mockDB = jest.fn().mockImplementation(() => ({
  collection: mockCollection,
}));

jest.mock("mongodb", () => {
  return {
    ...jest.requireActual("mongodb"),
    MongoClient: jest.fn().mockImplementation(() => ({
      connect: mockConnect,
      db: mockDB,
    })),
  };
});

describe("mongo-db", () => {
  beforeEach(jest.clearAllMocks);

  const _client = mongodb({
    host: "host",
    database: "gruposbf",
  });

  it("should call insertOne on insert method", async () => {
    insertOne.mockImplementation(() => ({
      currencyCode: "USD",
      country: "Estados Unidos)",
    }));

    const client = await _client;

    await client.insert({
      collection: "currencies",
      item: {
        currencyCode: "USD",
        country: "Estados Unidos)",
      },
    });

    expect(mockCollection).toBeCalledWith("currencies");
    expect(insertOne).toBeCalledWith({
      currencyCode: "USD",
      country: "Estados Unidos)",
    });
  });

  it("should call findOne on findOne method", async () => {
    findOne.mockImplementation(() => ({
      currencyCode: "USD",
      country: "Estados Unidos)",
    }));

    const client = await _client;

    await client.findOne({
      collection: "currencies",
      query: {
        currencyCode: "USD",
      },
    });

    expect(mockCollection).toBeCalledWith("currencies");
    expect(findOne).toBeCalledWith({
      currencyCode: "USD",
    });
  });
});
