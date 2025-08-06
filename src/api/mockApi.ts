import {
  HasId,
  Query,
  evaluateCondition,
  QueryPartial,
  DeepPartial,
  MassModification,
  Modification,
  EntryChange,
  evaluateModification,
  Condition,
  GroupCountQuery,
  AggregateQuery,
  GroupAggregateQuery,
  Aggregate
} from "@lightningkite/lightning-server-simplified"
import type {MockDatastore} from "./mockDatastore"
import {generateMockDatastore} from "./mockDatastore"
import type {
  Api,
  IdAndAuthMethods,
  Proof,
  ProofsCheckResult,
  ServerHealth,
  User,
  UUID
} from "./sdk"
// import {mockRestEndpointFunctions} from "@lightningkite/lightning-server-simplified"

export class MockApi implements Api {
  myUser: User | null

  constructor(private authenticated: boolean) {
    if (authenticated) {
      this.myUser = mockDatastore.users[0]
    } else {
      this.myUser = null
    }
  }

  bulkRequest: Api["bulkRequest"] = () => {
    throw new Error("Method not implemented.")
  }
  getServerHealth(): Promise<ServerHealth> {
    throw new Error("Method not implemented.")
  }

  readonly emailProof: Api["emailProof"] = {
    beginEmailOwnershipProof: async (): Promise<string> => {
      return "temp-id"
    },
    proveEmailOwnership: async (): Promise<Proof> => {
      return {
        via: "email",
        strength: 10,
        property: "",
        value: "",
        at: new Date().toISOString(),
        signature: ""
      }
    }
  }

  userFunctions = mockRestEndpointFunctions(mockDatastore.users, "users")

  readonly user: Api["user"] = {
    default: this.userFunctions.default,
    query: this.userFunctions.query,
    queryPartial: this.userFunctions.queryPartial,
    detail: this.userFunctions.detail,
    insertBulk: this.userFunctions.insertBulk,
    insert: this.userFunctions.insert,
    upsert: this.userFunctions.upsert,
    bulkReplace: this.userFunctions.bulkReplace,
    replace: this.userFunctions.replace,
    bulkModify: this.userFunctions.bulkModify,
    modifyWithDiff: this.userFunctions.modifyWithDiff,
    bulkDelete: this.userFunctions.bulkDelete,
    delete: this.userFunctions.delete,
    count: this.userFunctions.count,
    groupCount: this.userFunctions.groupCount,
    aggregate: this.userFunctions.aggregate,
    groupAggregate: this.userFunctions.groupAggregate,
    modify: this.userFunctions.modify,
    simplifiedModify: () => {
      throw new Error("Function not implemented.")
    },
    permissions: () => {
      throw new Error("Function not implemented.")
    },
    groupCount2: () => {
      throw new Error("Function not implemented.")
    },
    groupAggregate2: () => {
      throw new Error("Function not implemented.")
    }
  }

  readonly userAuth: Api["userAuth"] = {
    logIn: function (input: Array<Proof>): Promise<IdAndAuthMethods<UUID>> {
      throw new Error("Function not implemented.")
    },
    logInV2: async (input) => {
      return {
        id: "",
        options: [],
        strengthRequired: 10,
        session: "mock-token"
      }
    },
    checkProofs: function (
      input: Array<Proof>
    ): Promise<ProofsCheckResult<UUID>> {
      throw new Error("Function not implemented.")
    },
    authenticationRequirements: async () => {
      return {
        options: [],
        strengthRequired: 10
      }
    },
    openSession: () => {
      throw new Error("Function not implemented.")
    },
    createSubSession: () => {
      throw new Error("Function not implemented.")
    },
    getToken: () => {
      throw new Error("Function not implemented.")
    },
    getTokenSimple: async () => {
      return "mock-token"
    },
    getSelf: async () => {
      if (this.myUser) return this.myUser
      throw new Error("No User")
    },
    terminateSession: () => {
      throw new Error("Function not implemented.")
    },
    terminateOtherSession: () => {
      throw new Error("Function not implemented.")
    }
  }

  userAuthFunctions = mockRestEndpointFunctions(
    mockDatastore.userSession,
    "user-auth"
  )
  readonly userSession: Api["userSession"] = {
    default: this.userAuthFunctions.default,
    query: this.userAuthFunctions.query,
    queryPartial: this.userAuthFunctions.queryPartial,
    detail: this.userAuthFunctions.detail,
    insertBulk: this.userAuthFunctions.insertBulk,
    insert: this.userAuthFunctions.insert,
    upsert: this.userAuthFunctions.upsert,
    bulkReplace: this.userAuthFunctions.bulkReplace,
    replace: this.userAuthFunctions.replace,
    bulkModify: this.userAuthFunctions.bulkModify,
    modifyWithDiff: this.userAuthFunctions.modifyWithDiff,
    bulkDelete: this.userAuthFunctions.bulkDelete,
    delete: this.userAuthFunctions.delete,
    count: this.userAuthFunctions.count,
    groupCount: this.userAuthFunctions.groupCount,
    aggregate: this.userAuthFunctions.aggregate,
    groupAggregate: this.userAuthFunctions.groupAggregate,
    modify: this.userAuthFunctions.modify,
    simplifiedModify: () => {
      throw new Error("Function not implemented.")
    },
    permissions: () => {
      throw new Error("Function not implemented.")
    },
    groupCount2: () => {
      throw new Error("Function not implemented.")
    },
    groupAggregate2: () => {
      throw new Error("Function not implemented.")
    }
  }
}

const mockDatastore: MockDatastore = generateMockDatastore()

export function mockRestEndpointFunctions<T extends HasId>(
  items: T[],
  label: string,
  logger?: (...args: unknown[]) => void
) {
  return {
    default(): Promise<T> {
      return Promise.reject(new Error("Not implemented"))
    },
    query(input: Query<T>): Promise<Array<T>> {
      const {limit, skip = 0, orderBy, condition} = input

      const filteredItems = condition
        ? items.filter((item) => evaluateCondition(condition, item))
        : items

      let sortedItems = filteredItems

      if (orderBy?.length) {
        const sortModel: {key: keyof T; ascending: boolean}[] = orderBy.map(
          (orderItem) => {
            const ascending = !orderItem.toString().startsWith("-")
            const key = (
              ascending ? orderItem : orderItem.toString().substring(1)
            ) as keyof T
            return {key, ascending}
          }
        )

        sortedItems = filteredItems.sort((a, b) => {
          for (const {key, ascending} of sortModel) {
            const aValue = a[key]
            const bValue = b[key]
            if (aValue < bValue) {
              return ascending ? -1 : 1
            } else if (aValue > bValue) {
              return ascending ? 1 : -1
            }
          }
          return 0
        })
      }

      const paginatedItems = limit
        ? sortedItems.slice(skip, skip + limit)
        : sortedItems.slice(skip)

      const result = paginatedItems
      logger?.(label, "query", {query: input, result})
      return Promise.resolve(result)
    },

    queryPartial(input: QueryPartial<T>): Promise<Array<DeepPartial<T>>> {
      return this.query(input)
    },

    detail(id: string): Promise<T> {
      const result = items.find((item) => item._id === id)
      logger?.(label, "detail", {id, result})
      return new Promise((resolve, reject) => {
        if (result) resolve(result)
        else reject()
      })
    },

    insertBulk(input: Array<T>): Promise<Array<T>> {
      input.forEach((item) => items.push(item))
      logger?.(label, "insertBulk", {input})
      return Promise.resolve(input)
    },

    insert(input: T): Promise<T> {
      items.push(input)
      logger?.(label, "insert", {input})
      return Promise.resolve(input)
    },

    upsert(id: string, input: T): Promise<T> {
      logger?.(label, "upsert", {id, input})

      const existingItemIndex = items.findIndex((item) => item._id === id)
      if (existingItemIndex >= 0) {
        items[existingItemIndex] = input
      } else {
        items.push(input)
      }
      return Promise.resolve(input)
    },

    bulkReplace(input: Array<T>): Promise<Array<T>> {
      logger?.(label, "bulkReplace", {input})

      input.forEach((item) => this.replace(item._id, item))
      return Promise.resolve(input)
    },

    replace(id: string, input: T): Promise<T> {
      logger?.(label, "replace", {id, input})

      const existingItemIndex = items.findIndex((item) => item._id === id)
      if (existingItemIndex >= 0) {
        items[existingItemIndex] = input
        return Promise.resolve(input)
      }
      return Promise.reject()
    },

    async bulkModify(input: MassModification<T>): Promise<number> {
      logger?.(label, "bulkModify", {input})

      const filteredItems = items.filter((item) =>
        evaluateCondition(input.condition, item)
      )

      return filteredItems.length
    },

    modifyWithDiff(
      id: string,
      input: Modification<T>
    ): Promise<EntryChange<T>> {
      return Promise.resolve({})
    },

    modify(id: string, input: Modification<T>): Promise<T> {
      logger?.(label, "modify", {id, input})

      const existingItemIndex = items.findIndex((item) => item._id === id)
      if (existingItemIndex < 0) return Promise.reject()

      const newItem = evaluateModification(input, items[existingItemIndex])
      items[existingItemIndex] = newItem
      return Promise.resolve(newItem)
    },

    bulkDelete(input: Condition<T>): Promise<number> {
      logger?.(label, "bulkDelete", {input})

      if (!items) return Promise.reject()
      const previousLength = items.length
      items = items.filter((item) => !evaluateCondition(input, item))
      return Promise.resolve(previousLength - items.length)
    },

    delete(id: string): Promise<void> {
      logger?.(label, "delete", {id})

      const existingItemIndex = items.findIndex((item) => item._id === id)
      if (existingItemIndex >= 0) {
        items.splice(existingItemIndex, 1)
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    },

    count(input: Condition<T>): Promise<number> {
      logger?.(label, "count", {input})

      return this.query({condition: input}).then((it) => it.length)
    },

    groupCount(input: GroupCountQuery<T>): Promise<Record<string, number>> {
      const {condition, groupBy} = input

      const filteredItems = condition
        ? items.filter((item) => evaluateCondition(condition, item))
        : items

      const result = filteredItems.reduce(
        (result, item) => {
          const key =
            typeof item[groupBy] === "string"
              ? (item[groupBy] as unknown as string)
              : JSON.stringify(item[groupBy])
          result[key] = (result[key] || 0) + 1
          return result
        },
        {} as Record<string, number>
      )

      logger?.(label, "groupCount", {input, result})

      return Promise.resolve(result)
    },

    aggregate(input: AggregateQuery<T>): Promise<number> {
      const {condition, aggregate, property} = input

      const filteredItems = condition
        ? items.filter((item) => evaluateCondition(condition, item))
        : items

      const result = performAggregate(
        filteredItems.map((item) => Number(item[property])),
        aggregate
      )

      logger?.(label, "aggregate", {input, result})

      return Promise.resolve(result)
    },

    groupAggregate(
      input: GroupAggregateQuery<T>
    ): Promise<Record<string, number>> {
      const {aggregate, condition, property, groupBy} = input

      const filteredItems = condition
        ? items.filter((item) => evaluateCondition(condition, item))
        : items

      const numberArrays = filteredItems.reduce(
        (result, item) => {
          const key =
            typeof item[groupBy] === "string"
              ? (item[groupBy] as unknown as string)
              : JSON.stringify(item[groupBy])
          result[key] = [...(result[key] || []), Number(item[property])]
          return result
        },
        {} as Record<string, number[]>
      )

      const result = Object.keys(numberArrays).reduce(
        (result, key) => {
          const array = numberArrays[key]
          result[key] = performAggregate(array, aggregate)
          return result
        },
        {} as Record<string, number>
      )

      logger?.(label, "groupAggregate", {input, result})

      return Promise.resolve(result)
    }
  }
}

function performAggregate(array: number[], aggregate: Aggregate): number {
  switch (aggregate) {
    case Aggregate.Sum:
      return array.reduce((sum, value) => sum + value, 0)
    case Aggregate.Average:
      return array.reduce((sum, value) => sum + value, 0) / array.length
    default:
      throw new Error(`Not implemented aggregate: ${aggregate}`)
  }
}
