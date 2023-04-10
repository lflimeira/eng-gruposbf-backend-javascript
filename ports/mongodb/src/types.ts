import { Filter, Document, ObjectId } from "mongodb";

export interface ClientParams {
  host: string;
  database: string;
}

interface BaseParameters {
  collection: string;
  mapper?: (record: any) => any;
}

export interface InsertParameters<Item> extends BaseParameters {
  item: Item;
}

export interface FindOneParameters extends BaseParameters {
  collection: string;
  query: Filter<Document>;
  mapper?: (record: any) => any;
}

export interface FindAllParameters extends BaseParameters {
  collection: string;
  mapper?: (record: any) => any;
}

export interface MongoDBType {
  ObjectId: ObjectId;
}

export interface MongoDBConnector {
  findOne: <Item = never>(params: FindOneParameters) => Promise<Item>;
  insert: <Item = never>(params: InsertParameters<Item>) => Promise<Item>;
  findAll: <Item = never>(params: FindAllParameters) => Promise<Item[]>;
}
