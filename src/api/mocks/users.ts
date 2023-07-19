import { dateToISO } from "@lightningkite/react-lightning-helpers"
import {
  randAvatar,
  randEmail,
  randFullName,
  randPastDate,
  randPhoneNumber,
  randUuid
} from "@ngneat/falso"
import type {User} from "api/sdk"


export function generateUsers(total: number): User[] {
  return Array.from({length: total}, () => ({
    _id: randUuid(),
    name: randFullName(),
    email: randEmail(),
    phone: randPhoneNumber(),
    birthday: dateToISO(randPastDate({years: 100})),
    profilePic: randAvatar(),
    createdAt: dateToISO(randPastDate()),
    modifiedAt: dateToISO(randPastDate())
  }))
}
