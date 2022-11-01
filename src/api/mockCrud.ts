import {
  Aggregate,
  AggregateQuery,
  Condition,
  EntryChange,
  evaluateCondition,
  evaluateModification,
  GroupAggregateQuery,
  GroupCountQuery,
  MassModification,
  Modification,
  Query
} from "@lightningkite/lightning-server-simplified"
import {ApiCrudFunctions, HasId} from "./crud"

export function generateFakeMockCrud<T extends HasId>(
  items: T[],
  label: string
): ApiCrudFunctions<T> {
  return {
    query(requesterToken: string, input: Query<T>): Promise<T[]> {
      const {limit, skip = 0, orderBy, condition} = input

      const filteredItems = condition
        ? items.filter((item) => evaluateCondition(condition, item))
        : items

      let sortedItems = filteredItems

      if (orderBy?.length) {
        let firstKey = orderBy[0] as keyof T
        const reverse = firstKey.toString().startsWith("-")

        if (reverse) {
          firstKey = firstKey.toString().substring(1) as keyof T
        }

        sortedItems = filteredItems.sort((a, b) => {
          if (a[firstKey] < b[firstKey]) return reverse ? 1 : -1
          if (a[firstKey] > b[firstKey]) return reverse ? -1 : 1
          return 0
        })
      }

      const paginatedItems = limit
        ? sortedItems.slice(skip, skip + limit)
        : sortedItems.slice(skip)

      const result = paginatedItems
      console.info(label, "query", {query: input, result})
      return Promise.resolve(result)
    },

    detail(requesterToken: string, id: string): Promise<T> {
      const result = items.find((item) => item._id === id)
      console.info(label, "detail", {id, result})
      return new Promise((resolve, reject) => {
        if (result) resolve(result)
        else reject()
      })
    },

    insertBulk(requesterToken: string, input: T[]): Promise<T[]> {
      input.forEach((item) => items.push(item))
      return Promise.resolve(input)
    },

    insert(requesterToken: string, input: T): Promise<T> {
      items.push(input)
      return Promise.resolve(input)
    },

    upsert(requesterToken: string, id: string, input: T): Promise<T> {
      console.info(label, "upsert", {id, input})

      const existingItemIndex = items.findIndex((item) => item._id === id)
      if (existingItemIndex >= 0) {
        items[existingItemIndex] = input
      } else {
        items.push(input)
      }
      return Promise.resolve(input)
    },

    bulkReplace(requesterToken: string, input: T[]): Promise<T[]> {
      console.info(label, "bulkReplace", {input})

      input.forEach((item) => {
        void this.replace(requesterToken, item._id, item)
      })
      return Promise.resolve(input)
    },

    replace(requesterToken: string, id: string, input: T): Promise<T> {
      console.info(label, "replace", {id, input})

      const existingItemIndex = items.findIndex((item) => item._id === id)
      if (existingItemIndex >= 0) {
        items[existingItemIndex] = input
        return Promise.resolve(input)
      }
      return Promise.reject()
    },

    async bulkModify(
      requesterToken: string,
      input: MassModification<T>
    ): Promise<number> {
      console.info(label, "bulkModify", {input})

      const filteredItems = items.filter((item) =>
        evaluateCondition(input.condition, item)
      )

      // filteredItems.forEach((item) => {
      //   const existingItemIndex = items.findIndex((it) => it._id === item._id)
      //   const newItem = evaluateModification(
      //     input.modification,
      //     items[existingItemIndex]
      //   )
      //   items[existingItemIndex] = newItem
      // })

      return filteredItems.length
    },

    modifyWithDiff(
      requesterToken: string,
      id: string,
      input: Modification<T>
    ): Promise<EntryChange<T>> {
      return Promise.resolve({})
    },

    modify(
      requesterToken: string,
      id: string,
      input: Modification<T>
    ): Promise<T> {
      console.info(label, "modify", {id, input})

      const existingItemIndex = items.findIndex((item) => item._id === id)
      if (existingItemIndex < 0) return Promise.reject()

      const newItem = evaluateModification(input, items[existingItemIndex])
      items[existingItemIndex] = newItem
      return Promise.resolve(newItem)
    },

    bulkDelete(requesterToken: string, input: Condition<T>): Promise<number> {
      console.info(label, "bulkDelete", {input})

      if (!items) return Promise.reject()
      const previousLength = items.length
      items = items.filter((item) => !evaluateCondition(input, item))
      return Promise.resolve(previousLength - items.length)
    },

    delete(requesterToken: string, id: string): Promise<void> {
      console.info(label, "delete", {id})

      const existingItemIndex = items.findIndex((item) => item._id === id)
      if (existingItemIndex >= 0) {
        items.splice(existingItemIndex, 1)
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    },

    count(requesterToken: string, input: Condition<T>): Promise<number> {
      console.info(label, "count", {input})

      return this.query(requesterToken, {condition: input}).then(
        (it) => it.length
      )
    },

    groupCount(
      requesterToken: string,
      input: GroupCountQuery<T>
    ): Promise<Record<string, number>> {
      const {condition, groupBy} = input

      const filteredItems = condition
        ? items.filter((item) => evaluateCondition(condition, item))
        : items

      const result = filteredItems.reduce<Record<string, number>>(
        (result, item) => {
          const key =
            typeof item[groupBy] === "string"
              ? (item[groupBy] as unknown as string)
              : JSON.stringify(item[groupBy])
          result[key] = (result[key] || 0) + 1
          return result
        },
        {}
      )

      console.info(label, "groupCount", {input, result})

      return Promise.resolve(result)
    },

    aggregate(
      requesterToken: string,
      input: AggregateQuery<T>
    ): Promise<number> {
      const {condition, aggregate, property} = input

      const filteredItems = condition
        ? items.filter((item) => evaluateCondition(condition, item))
        : items

      const result = performAggregate(
        filteredItems.map((item) => item[property] as number),
        aggregate
      )

      console.info(label, "aggregate", {input, result})

      return Promise.resolve(result)
    },

    groupAggregate(
      requesterToken: string,
      input: GroupAggregateQuery<T>
    ): Promise<Record<string, number>> {
      const {aggregate, condition, property, groupBy} = input

      const filteredItems = condition
        ? items.filter((item) => evaluateCondition(condition, item))
        : items

      const numberArrays = filteredItems.reduce<Record<string, number[]>>(
        (result, item) => {
          const key =
            typeof item[groupBy] === "string"
              ? (item[groupBy] as unknown as string)
              : JSON.stringify(item[groupBy])
          result[key] = [...(result[key] || []), item[property] as number]
          return result
        },
        {}
      )

      const result = Object.keys(numberArrays).reduce<Record<string, number>>(
        (result, key) => {
          const array = numberArrays[key]
          result[key] = performAggregate(array, aggregate)
          return result
        },
        {}
      )

      console.info(label, "groupAggregate", {input, result})

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
