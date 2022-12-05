import {
  randAvatar,
  randEmail,
  randFullName,
  randPastDate,
  randPhoneNumber,
  randUuid
} from "@ngneat/falso"
import {User} from "api/sdk"

export function generateUsers(total: number): User[] {
  return Array.from({length: total}, () => ({
    _id: randUuid(),
    name: randFullName(),
    email: randEmail(),
    phone: randPhoneNumber(),
    birthday: randPastDate({years: 100}).toISOString(),
    profilePic: randAvatar(),
    createdAt: randPastDate().toISOString(),
    modifiedAt: randPastDate().toISOString()
  }))
}
