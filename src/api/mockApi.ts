import {faker} from "@faker-js/faker"
import {LocalStorageKey} from "utils/constants"
import {generateFakeMockCrud} from "./mockCrud"
import {generateMockDatastore} from "./mockDatastore"
import {Api, SSOAuthSubmission, User} from "./sdk"

let myUser: User | null = null

export class MockApi implements Api {
  public constructor(
    public httpUrl: string = "mock",
    public socketUrl: string = httpUrl,
    public mockDatastore = generateMockDatastore()
  ) {
    if (localStorage.getItem(LocalStorageKey.USER_TOKEN)) {
      myUser = faker.helpers.arrayElement(this.mockDatastore.users)
    }
  }

  readonly users = generateFakeMockCrud<User>([], "user")

  readonly auth = {
    emailLoginLink: async (email: string): Promise<void> => {
      localStorage.setItem(LocalStorageKey.USER_TOKEN, "mock-user-token")
      alert(
        "You are using the mock API and will not receive an email. Refresh the page to log in."
      )
    },
    loginSSO: async (input: string): Promise<string> => {
      alert(
        "You are using the mock API and will not receive an email or text. Enter any code to log in."
      )
      return "mock-sso-uuid"
    },
    submitSSO: async (input: SSOAuthSubmission): Promise<string> => {
      return "mock-user-token"
    },
    getSelf: (requesterToken: string): Promise<User> => {
      if (!myUser) return Promise.reject()
      return Promise.resolve(myUser)
    }
  }
}