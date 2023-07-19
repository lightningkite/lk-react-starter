import {generateUsers} from "./mocks/users"
import type {User} from "./sdk"

export interface MockDatastore {
  users: User[]
}

export const generateMockDatastore = (): MockDatastore => {
  const users = generateUsers(25)

  return {users}
}
