import {mockRestEndpointFunctions} from "@lightningkite/lightning-server-simplified"
import {rand} from "@ngneat/falso"
import {LocalStorageKey} from "utils/constants"
import {generateMockDatastore, MockDatastore} from "./mockDatastore"
import {Api, EmailPinLogin, ServerHealth, User} from "./sdk"

let myUser: User | null = null

export class MockApi implements Api {
  mockDatastore: MockDatastore = generateMockDatastore()

  public constructor(
    public httpUrl: string = "mock",
    public socketUrl: string = httpUrl
  ) {
    myUser = rand(this.mockDatastore.users)
  }

  readonly user = mockRestEndpointFunctions<User>(
    this.mockDatastore.users,
    "user"
  )

  getServerHealth(): Promise<ServerHealth> {
    return Promise.reject()
  }

  readonly auth = {
    refreshToken: async (): Promise<string> => {
      console.log("refreshToken")
      return "mock-refresh-token"
    },
    getSelf: (userToken: string): Promise<User> => {
      if (!myUser) return Promise.reject()
      console.log("getSelf", myUser)
      return Promise.resolve(myUser)
    },
    anonymousToken: async (): Promise<string> => {
      console.log("anonymousToken")
      return "mock-anonymous-token"
    },
    emailLoginLink: async (email: string): Promise<void> => {
      localStorage.setItem(LocalStorageKey.USER_TOKEN, "mock-user-token")
      console.log("emailLoginLink")
      alert(
        "You are using the mock API and will not receive an email. Refresh the page to log in."
      )
    },
    emailPINLogin: async (input: EmailPinLogin): Promise<string> => {
      localStorage.setItem(LocalStorageKey.USER_TOKEN, "mock-user-token")
      console.log("emailPINLogin", {input})
      return "mock-sso-uuid"
    }
  }
}
