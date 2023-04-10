import client from "./client";
import _mock from "./mock";

export const mock = _mock;
export const mongodb = client;
export type { MongoDBConnector, MongoDBType } from "./types";
