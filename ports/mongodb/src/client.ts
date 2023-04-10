import { MongoClient, Db } from "mongodb";

import {
  ClientParams,
  InsertParameters,
  FindOneParameters,
  FindAllParameters,
  MongoDBConnector,
} from "./types";

const defaultMapper = (record: any) => record;

let singleton: Db;

export const createClient = async ({
  host,
  database,
}: ClientParams): Promise<Db> => {
  if (singleton) return singleton;

  const client = new MongoClient(host);
  await client.connect();

  singleton = client.db(database);
  return singleton;
};

function insert(client: Db) {
  return async ({
    collection,
    item,
    mapper = defaultMapper,
  }: InsertParameters<any>) => {
    const databaseItem = await client.collection(collection).insertOne(item);

    return mapper(databaseItem);
  };
}

function findOne(client: Db) {
  return async ({
    collection,
    query,
    mapper = defaultMapper,
  }: FindOneParameters) => {
    const item = await client.collection(collection).findOne(query);

    if (!item) {
      return null;
    }

    return mapper(item);
  };
}

function findAll(client: Db) {
  return async ({ collection, mapper = defaultMapper }: FindAllParameters) => {
    const items = await client.collection(collection).find().toArray();

    if (!items) {
      return [];
    }

    return items.map((item) => mapper(item));
  };
}

export default async (params: ClientParams): Promise<MongoDBConnector> => {
  const client = await createClient(params);

  return {
    insert: insert(client),
    findOne: findOne(client),
    findAll: findAll(client),
  };
};
