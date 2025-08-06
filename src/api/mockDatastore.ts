import {
  randUuid,
  randFullName,
  randEmail,
  randPhoneNumber,
  randPastDate,
  randAvatar,
  rand
} from "@ngneat/falso"
import {dateToISO} from "utils/helpers"
import {Animal, type Session, type User, type UUID} from "./sdk"

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
      favoriteAnimal: rand(Object.values(Animal)),
      gender: rand(["m", "f"]),
      modifiedAt: dateToISO(randPastDate())
    })),
    userSession: []
  }
}
