import {ThemeProvider} from "@mui/material"
import {Api, RequesterSession, User} from "api/sdk"
import {useSessionManager} from "api/useSessionManager"
import Loading from "components/Loading"
import MainLayout from "Layouts/MainLayout"
import UnauthLayout from "Layouts/UnauthLayout"
import React, {createContext, FC, useEffect, useState} from "react"
import {BrowserRouter} from "react-router-dom"
import {AuthRoutes, UnauthRoutes} from "routers"
import {theme} from "./theme"

export const AuthContext = createContext({
  session: {} as RequesterSession,
  logout: (): void => {
    throw new Error("Used logout outside of AuthContext")
  },
  currentUser: {} as User
})

export const UnauthContext = createContext({
  api: {} as Api,
  authenticate: (userToken: string): void => {
    throw new Error("Used authenticate outside of UnauthenticatedContext")
  },
  changeBackendURL: (backendURL: string): void => {
    throw new Error("Used changeBackendURL outside of UnauthenticatedContext")
  }
})

const App: FC = () => {
  const {api, changeBackendURL, session, authenticate, logout} =
    useSessionManager()

  const [currentUser, setCurrentUser] = useState<User>()

  const isLoggedIn = !!session

  useEffect(() => {
    session?.auth.getSelf().then(setCurrentUser)
  }, [isLoggedIn])

  if (isLoggedIn && currentUser === undefined) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {session && currentUser ? (
          <AuthContext.Provider value={{session, logout, currentUser}}>
            <MainLayout>
              <AuthRoutes />
            </MainLayout>
          </AuthContext.Provider>
        ) : (
          <UnauthContext.Provider value={{api, changeBackendURL, authenticate}}>
            <UnauthLayout>
              <UnauthRoutes />
            </UnauthLayout>
          </UnauthContext.Provider>
        )}
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
