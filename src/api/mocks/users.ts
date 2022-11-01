import {faker} from "@faker-js/faker"
import {User} from "api/sdk"

export function generateUsers(total: number): User[] {
  return Array.from({length: total}, () => ({
    _id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    createdAt: faker.date.past().toISOString(),
    modifiedAt: faker.date.past().toISOString()
  }))
}
