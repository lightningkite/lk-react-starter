import {ThemeProvider} from "@mui/material"
import {LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {Api, User, UserSession} from "api/sdk"
import {useSessionManager} from "api/useSessionManager"
import ErrorAlert from "components/ErrorAlert"
import Loading from "components/Loading"
import MainLayout from "layouts/MainLayout"
import UnauthLayout from "layouts/UnauthLayout"
import React, {createContext, FC, useEffect, useState} from "react"
import {BrowserRouter} from "react-router-dom"
import {AuthRoutes, UnauthRoutes} from "routers"
import {theme} from "./theme"

export interface AuthContextType {
  session: UserSession
  logout: () => void
  currentUser: User
  setCurrentUser: (newCurrentUser: User) => void
}

export interface UnauthContextType {
  api: Api
  authenticate: (userToken: string) => void
  changeBackendURL: (backendURL: string) => void
}

// AuthContext is available when the user is authenticated
export const AuthContext = createContext({} as AuthContextType)

// UnauthContext is available when the user is not authenticated (login screen)
export const UnauthContext = createContext({} as UnauthContextType)

const App: FC = () => {
  const {api, changeBackendURL, session, authenticate, logout} =
    useSessionManager()

  const [currentUser, setCurrentUser] = useState<User | null>()

  const isLoggedIn = !!session

  useEffect(() => {
    if (!session) {
      setCurrentUser(undefined)
    }

    session?.auth
      .getSelf()
      .then(setCurrentUser)
      .catch(() => setCurrentUser(null))
  }, [isLoggedIn])

  if (isLoggedIn && currentUser === undefined) {
    return <Loading />
  }

  if (currentUser === null) {
    return <ErrorAlert>Error loading current user</ErrorAlert>
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {session && currentUser ? (
            <AuthContext.Provider
              value={{session, logout, currentUser, setCurrentUser}}
            >
              <MainLayout>
                <AuthRoutes />
              </MainLayout>
            </AuthContext.Provider>
          ) : (
            <UnauthContext.Provider
              value={{api, changeBackendURL, authenticate}}
            >
              <UnauthLayout>
                <UnauthRoutes />
              </UnauthLayout>
            </UnauthContext.Provider>
          )}
        </ThemeProvider>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
