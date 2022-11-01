import {
  AggregateQuery,
  Condition,
  EntryChange,
  GroupCountQuery,
  MassModification,
  Modification,
  Query
} from "@lightningkite/lightning-server-simplified"

export interface HasId {
  _id: string
}

export interface ApiCrudFunctions<T extends HasId> {
  query(requesterToken: string, input: Query<T>): Promise<T[]>
  detail(requesterToken: string, id: string): Promise<T>
  insertBulk(requesterToken: string, input: T[]): Promise<T[]>
  insert(requesterToken: string, input: T): Promise<T>
  upsert(requesterToken: string, id: string, input: T): Promise<T>
  bulkReplace(requesterToken: string, input: T[]): Promise<T[]>
  replace(requesterToken: string, id: string, input: T): Promise<T>
  bulkModify(
    requesterToken: string,
    input: MassModification<T>
  ): Promise<number>
  modifyWithDiff(
    requesterToken: string,
    id: string,
    input: Modification<T>
  ): Promise<EntryChange<T>>
  modify(requesterToken: string, id: string, input: Modification<T>): Promise<T>
  bulkDelete(requesterToken: string, input: Condition<T>): Promise<number>
  delete(requesterToken: string, id: string): Promise<void>
  count(requesterToken: string, input: Condition<T>): Promise<number>
  groupCount(
    requesterToken: string,
    input: GroupCountQuery<T>
  ): Promise<Record<string, number>>
  aggregate(
    requesterToken: string,
    input: AggregateQuery<T>
  ): Promise<number | null | undefined>
  groupAggregate(
    requesterToken: string,
    input: AggregateQuery<T>
  ): Promise<Record<string, number>>
}

export interface SessionEndpoint<T extends HasId> {
  query(input: Query<T>): Promise<T[]>
  detail(id: string): Promise<T>
  insertBulk(input: T[]): Promise<T[]>
  insert(input: T): Promise<T>
  upsert(id: string, input: T): Promise<T>
  bulkReplace(input: T[]): Promise<T[]>
  replace(id: string, input: T): Promise<T>
  bulkModify(input: MassModification<T>): Promise<number>
  modifyWithDiff(id: string, input: Modification<T>): Promise<EntryChange<T>>
  modify(id: string, input: Modification<T>): Promise<T>
  bulkDelete(input: Condition<T>): Promise<number>
  delete(id: string): Promise<void>
  count(input: Condition<T>): Promise<number>
  groupCount(input: GroupCountQuery<T>): Promise<Record<string, number>>
  aggregate(input: AggregateQuery<T>): Promise<number | null | undefined>
  groupAggregate(
    input: AggregateQuery<T>
  ): Promise<Record<string, number | null | undefined>>
}
