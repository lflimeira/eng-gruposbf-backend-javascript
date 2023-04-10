import client from "./client";
import _mock from "./mock";

export const mock = _mock;
export const opensearch = client;
export type { MongoDBConnector, MongoDBType } from "./types";
