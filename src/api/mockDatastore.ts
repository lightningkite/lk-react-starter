import {generateUsers} from "./mocks/users"
import {User} from "./sdk"

export interface MockDatastore {
  users: User[]
}

export const generateMockDatastore = (): MockDatastore => {
  const users = generateUsers(10)

  return {users}
}
