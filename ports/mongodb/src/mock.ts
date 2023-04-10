import { MongoDBConnector } from "./types";

export default (): MongoDBConnector => {
  return {
    findOne: jest.fn(),
    findAll: jest.fn(),
    insert: jest.fn(),
  };
};
