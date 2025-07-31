import {
  randUuid,
  randFullName,
  randEmail,
  randPhoneNumber,
  randPastDate,
  randAvatar
} from "@ngneat/falso"
import {dateToISO} from "utils/helpers"
import type {Session, User, UUID} from "./sdk"

export interface MockDatastore {
  users: User[]
  userSession: Session<User, UUID>[]
}

export const generateMockDatastore = (): MockDatastore => {
  return {
    users: Array.from({length: 25}, () => ({
      _id: randUuid(),
      name: randFullName(),
      email: randEmail(),
      phone: randPhoneNumber(),
      birthday: dateToISO(randPastDate({years: 100})),
      profilePic: randAvatar(),
      createdAt: dateToISO(randPastDate()),
      modifiedAt: dateToISO(randPastDate())
    })),
    userSession: []
  }
}
