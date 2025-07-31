import type {MockDatastore} from "./mockDatastore"
import {generateMockDatastore} from "./mockDatastore"
import type {
  Api,
  IdAndAuthMethods,
  Proof,
  ProofsCheckResult,
  ServerHealth,
  UUID
} from "./sdk"
import {mockRestEndpointFunctions} from "@lightningkite/lightning-server-simplified"

// let myUser: User | null = null

export class MockApi implements Api {
  bulkRequest: Api["bulkRequest"] = () => {
    throw new Error("Method not implemented.")
  }
  getServerHealth(): Promise<ServerHealth> {
    throw new Error("Method not implemented.")
  }

  readonly emailProof: Api["emailProof"] = {
    beginEmailOwnershipProof: async (): Promise<string> => {
      return ""
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
    getSelf: () => {
      throw new Error("Function not implemented.")
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
