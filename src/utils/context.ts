import type {User, Api} from "api/sdk"
import {createContext} from "react"

export interface AuthContextType {
  api: Api
  currentUser: User
  setCurrentUser: (newCurrentUser: User) => void
}

export interface UnauthContextType {
  api: Api
  backendUrl: string
  changeBackendURL: (backendURL: string) => void
  authenticate: (userToken: string) => void
}

// AuthContext is available when the user is authenticated
export const AuthContext = createContext({} as AuthContextType)

// UnauthContext is available when the user is not authenticated (login screen)
export const UnauthContext = createContext({} as UnauthContextType)
